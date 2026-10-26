#!/usr/bin/env python3
"""Loopback-only development server. Learner code runs ONLY in Docker."""
import argparse
import hmac
import json
from pathlib import Path
import secrets
import subprocess
import threading
import uuid
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

WEB = Path(__file__).resolve().parent / 'web'
IMAGE = 'badak-torch:2.8.0'
CPP_IMAGE = 'badak-cpp:13.5.0'
TRACE_PRELUDE = (WEB / 'trace-prelude.py').read_text()
CPP_PRELUDE = (WEB.parent / 'cpp-prelude.hpp').read_text()
TOKEN = secrets.token_urlsafe(32)
SLOTS = threading.BoundedSemaphore(2)
MAX_OUTPUT = 64000


def docker_ready(runtime='torch'):
    image = CPP_IMAGE if runtime == 'cpp' else IMAGE
    try:
        result = subprocess.run(['docker', 'image', 'inspect', image], capture_output=True, timeout=5)
        if result.returncode == 0:
            return {'ready': True, 'message': ('C++ CPU 컴파일러 준비 완료' if runtime == 'cpp' else 'PyTorch CPU 이미지 준비 완료')}
    except (OSError, subprocess.TimeoutExpired):
        pass
    build = 'docker build -f Dockerfile.cpp -t badak-cpp:13.5.0 .' if runtime == 'cpp' else 'docker build -t badak-torch:2.8.0 .'
    return {'ready': False, 'message': 'Docker 실행 권한과 이미지가 필요합니다. 프로젝트 폴더에서 ' + build + ' 를 실행하세요.'}


def execute(code, check='', runtime='torch'):
    name = 'badak-' + uuid.uuid4().hex
    command = ['docker', 'run', '--rm', '-i', '--name', name,
               '--network=none', '--read-only', '--cap-drop=ALL',
               '--security-opt=no-new-privileges', '--pids-limit=64',
               '--memory=768m', '--memory-swap=768m', '--cpus=1',
               '--user=65534:65534', ('--tmpfs=/tmp:rw,exec,nosuid,nodev,size=64m' if runtime == 'cpp' else '--tmpfs=/tmp:rw,noexec,nosuid,nodev,size=32m'),
               '--ulimit=nofile=64:64', '--env=OMP_NUM_THREADS=1',
               '--env=MKL_NUM_THREADS=1', '--env=OPENBLAS_NUM_THREADS=1',
               CPP_IMAGE if runtime == 'cpp' else IMAGE]
    if runtime == 'cpp':
        # The shell command is a constant. Learner source is only passed on stdin.
        command += ['sh', '-c', 'cat > /tmp/main.cpp && g++ -std=c++17 -O0 -Wall -Wextra -fmax-errors=5 /tmp/main.cpp -o /tmp/program && /tmp/program']
    else:
        command += ['python', '-I', '-u', '-']
    # No shell interpolation, host mounts, host environment, or Docker socket in container.
    proc = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    chunks = {'stdout': bytearray(), 'stderr': bytearray()}
    over_limit = threading.Event()

    def collect(pipe, key):
        while True:
            chunk = pipe.read(4096)
            if not chunk:
                break
            remaining = MAX_OUTPUT - len(chunks[key])
            chunks[key].extend(chunk[:max(0, remaining)])
            if len(chunk) > remaining:
                over_limit.set()
                proc.kill()
                break

    readers = [threading.Thread(target=collect, args=(proc.stdout, 'stdout'), daemon=True),
               threading.Thread(target=collect, args=(proc.stderr, 'stderr'), daemon=True)]
    for thread in readers:
        thread.start()
    error = None
    try:
        # Single namespace preserves imports and learner variables for the exercise checks.
        if runtime == 'cpp':
            payload = CPP_PRELUDE + '\n#line 1 \"lesson.cpp\"\n' + code
        else:
            payload = (f'_scope = {{"__name__": "__main__"}}\n'
                       f'exec({TRACE_PRELUDE!r}, _scope)\n'
                       f'exec(compile({code!r}, "lesson.py", "exec"), _scope)\n'
                       f'_scope["_lab_record_enabled"] = False\n'
                       f'exec(compile({check!r}, "exercise.py", "exec"), _scope)\n')
        try:
            proc.stdin.write(payload.encode())
            proc.stdin.close()
        except BrokenPipeError:
            pass
        proc.wait(timeout=15)
    except subprocess.TimeoutExpired:
        error = '실행 시간이 15초를 초과했습니다.'
        proc.kill()
        proc.wait()
    finally:
        # Killing the Docker CLI alone does not stop the container.
        try:
            subprocess.run(['docker', 'rm', '-f', name], capture_output=True, timeout=5)
        except (OSError, subprocess.TimeoutExpired):
            pass
        for thread in readers:
            thread.join(timeout=2)
        proc.stdout.close()
        proc.stderr.close()
    if over_limit.is_set():
        error = '출력이 64KB 제한을 초과했습니다.'
    return {**{k: bytes(v).decode('utf-8', errors='replace') for k, v in chunks.items()},
            'returncode': proc.returncode, 'error': error}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEB), **kwargs)

    def end_headers(self):
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def allowed(self):
        # Reject DNS rebinding, cross-site browser requests, and remote-origin POSTs.
        port = self.server.server_port
        hosts = {f'localhost:{port}', f'127.0.0.1:{port}'}
        host = self.headers.get('Host', '')
        origin = self.headers.get('Origin')
        return (host in hosts and
                (origin is None or origin == 'http://' + host) and
                self.headers.get('Sec-Fetch-Site', 'none') in ('none', 'same-origin'))

    def reply(self, status, data):
        raw = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        if not self.allowed():
            return self.reply(403, {'error': '로컬 동일 출처 요청만 허용합니다.'})
        if self.path == '/api/session':
            return self.reply(200, {'token': TOKEN})
        if self.path == '/api/health':
            return self.reply(200, {'torch': docker_ready('torch'), 'cpp': docker_ready('cpp'), 'mode': 'local', 'gpu_required': False})
        if self.path.startswith('/api/'):
            return self.reply(404, {'error': '존재하지 않는 API입니다.'})
        return super().do_GET()

    def do_POST(self):
        if not self.allowed() or not hmac.compare_digest(self.headers.get('X-Lab-Token', ''), TOKEN):
            return self.reply(403, {'error': '동일 출처 세션 인증이 필요합니다.'})
        if self.path != '/api/run':
            return self.reply(404, {'error': '존재하지 않는 API입니다.'})
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length <= 32000:
                return self.reply(413, {'error': '요청은 32KB 이하여야 합니다.'})
            if self.headers.get('Content-Type') != 'application/json':
                return self.reply(415, {'error': 'JSON 요청이 필요합니다.'})
            data = json.loads(self.rfile.read(length))
            if not isinstance(data, dict) or not isinstance(data.get('code'), str) or not isinstance(data.get('check', ''), str):
                raise ValueError()
        except (ValueError, UnicodeDecodeError):
            return self.reply(400, {'error': '유효한 code 문자열이 필요합니다.'})
        runtime = data.get('runtime', 'torch')
        if runtime not in ('torch', 'cpp'):
            return self.reply(400, {'error': '지원하지 않는 실행 환경입니다.'})
        if not SLOTS.acquire(blocking=False):
            return self.reply(429, {'error': '다른 실행이 진행 중입니다. 잠시 후 다시 시도하세요.'})
        try:
            ready = docker_ready(runtime)
            if not ready['ready']:
                return self.reply(503, {'error': ready['message']})
            return self.reply(200, execute(data['code'], data.get('check', ''), runtime))
        except OSError:
            return self.reply(503, {'error': 'Docker를 시작할 수 없습니다. 설치와 권한을 확인하세요.'})
        finally:
            SLOTS.release()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    server.daemon_threads = True
    print(f'바닥부터 실습실: http://127.0.0.1:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
