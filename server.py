#!/usr/bin/env python3
"""Loopback-only development server. Learner code runs ONLY in Docker."""
import argparse
import hmac
import json
import os
from pathlib import Path
import secrets
import shutil
import signal
import subprocess
import sys
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
BUILD_LOG_LIMIT = 16000


def docker_status():
    if not shutil.which('docker'):
        return {'state': 'not-installed', 'message': 'Docker 명령을 찾을 수 없습니다. Docker Desktop 또는 Docker Engine을 설치하세요.'}
    try:
        result = subprocess.run(['docker', 'info', '--format', '{{.ServerVersion}}'], capture_output=True, timeout=6)
        if result.returncode == 0:
            return {'state': 'ready', 'message': 'Docker 실행 준비 완료'}
    except (OSError, subprocess.TimeoutExpired):
        pass
    return {'state': 'unavailable', 'message': 'Docker 엔진에 연결할 수 없습니다. Docker Desktop을 열거나 Docker Engine을 시작하고 사용자 권한을 확인하세요.'}


def start_docker():
    """Only launch a known local Desktop installation; never elevate privileges."""
    status = docker_status()
    if status['state'] == 'ready':
        return True, 'Docker가 이미 실행 중입니다.'
    if status['state'] == 'not-installed':
        return False, status['message']
    try:
        if sys.platform.startswith('linux'):
            if not shutil.which('systemctl'):
                return False, 'Docker Desktop을 직접 실행하거나 Docker Engine을 시작하세요. 관리자 권한이 필요하면 시스템 안내를 따르세요.'
            result = subprocess.run(['systemctl', '--user', 'show', '--property=LoadState', '--value', 'docker-desktop.service'], capture_output=True, text=True, timeout=6)
            if result.returncode != 0 or result.stdout.strip() != 'loaded':
                return False, '사용자 Docker Desktop 서비스를 찾지 못했습니다. Docker Desktop을 직접 열거나 Docker Engine을 시작하세요.'
            result = subprocess.run(['systemctl', '--user', 'start', 'docker-desktop.service'], capture_output=True, timeout=10)
            if result.returncode:
                return False, 'Docker Desktop 시작 요청에 실패했습니다. Docker Desktop을 직접 열고 권한을 확인하세요.'
        elif sys.platform == 'darwin':
            app = Path('/Applications/Docker.app')
            if not app.is_dir():
                return False, '응용 프로그램의 Docker Desktop을 찾지 못했습니다. Docker Desktop을 직접 실행하세요.'
            subprocess.Popen(['open', '-a', str(app)], stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        elif sys.platform == 'win32':
            program_files = os.environ.get('ProgramFiles', r'C:\Program Files')
            executable = Path(program_files) / 'Docker' / 'Docker' / 'Docker Desktop.exe'
            if not executable.is_file():
                return False, 'Docker Desktop을 찾지 못했습니다. 시작 메뉴에서 Docker Desktop을 직접 실행하세요.'
            subprocess.Popen([str(executable)], stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            return False, '이 운영체제에서는 자동 시작을 지원하지 않습니다. Docker Desktop 또는 Docker Engine을 직접 실행하세요.'
    except (OSError, subprocess.TimeoutExpired):
        return False, 'Docker Desktop 시작 요청에 실패했습니다. 직접 실행한 뒤 상태를 다시 확인하세요.'
    return True, 'Docker Desktop에 시작을 요청했습니다. 준비가 끝날 때까지 잠시 기다린 후 상태를 확인하세요.'


class ImageBuild:
    """One owned Docker CLI build at a time; no user-supplied commands."""
    def __init__(self):
        self.lock = threading.Lock()
        self.status = 'idle'
        self.runtime = None
        self.log = bytearray()
        self.proc = None
        self.cancel_requested = False
        self.worker = None

    def snapshot(self):
        with self.lock:
            return {'status': self.status, 'runtime': self.runtime,
                    'log': bytes(self.log).decode('utf-8', errors='replace')}

    def start(self, runtime):
        if runtime not in ('cpp', 'torch'):
            return False, '지원하는 실행 환경은 cpp 또는 torch입니다.'
        with self.lock:
            if self.status == 'running':
                return False, '이미 이미지 준비가 진행 중입니다.'
            command = (['docker', 'build', '-f', 'Dockerfile.cpp', '-t', CPP_IMAGE, '.'] if runtime == 'cpp'
                       else ['docker', 'build', '-t', IMAGE, '.'])
            try:
                proc = subprocess.Popen(command, cwd=str(WEB.parent), stdin=subprocess.DEVNULL,
                                        stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                        start_new_session=(os.name != 'nt'))
            except OSError:
                return False, 'Docker 빌드를 시작할 수 없습니다. Docker 실행 상태와 권한을 확인하세요.'
            self.status = 'running'
            self.runtime = runtime
            self.log = bytearray()
            self.proc = proc
            self.cancel_requested = False
            self.worker = threading.Thread(target=self._collect, args=(proc,), daemon=True)
            self.worker.start()
        return True, ''

    def _collect(self, proc):
        try:
            while True:
                chunk = proc.stdout.read1(4096)
                if not chunk:
                    break
                with self.lock:
                    self.log.extend(chunk)
                    if len(self.log) > BUILD_LOG_LIMIT:
                        del self.log[:-BUILD_LOG_LIMIT]
            code = proc.wait()
        except (OSError, ValueError):
            code = proc.wait()
        finally:
            proc.stdout.close()
        with self.lock:
            # No other build can start until this process is fully reaped.
            if self.proc is proc:
                self.status = 'cancelled' if self.cancel_requested else ('success' if code == 0 else 'failed')
                self.proc = None

    def cancel(self):
        with self.lock:
            proc = self.proc
            if self.status != 'running' or proc is None or proc.poll() is not None:
                return False, '현재 중지할 이미지 준비 작업이 없습니다.'
            self.cancel_requested = True
            try:
                if os.name != 'nt':
                    os.killpg(proc.pid, signal.SIGTERM)
                else:
                    proc.terminate()
            except ProcessLookupError:
                # It exited before cancellation reached it; preserve real result.
                self.cancel_requested = False
                return False, '이미지 준비가 이미 종료되었습니다.'
            except OSError:
                self.cancel_requested = False
                return False, '이미지 준비 작업을 중지하지 못했습니다.'
            threading.Thread(target=self._kill_if_needed, args=(proc,), daemon=True).start()
        return True, ''

    def _kill_if_needed(self, proc):
        # The Docker CLI may launch a build plugin that still holds the pipe.
        # Only signal the private process group while this build remains active.
        threading.Event().wait(3)
        with self.lock:
            if self.proc is not proc or self.status != 'running':
                return
            try:
                if os.name != 'nt':
                    os.killpg(proc.pid, signal.SIGKILL)
                elif proc.poll() is None:
                    proc.kill()
            except OSError:
                pass

    def shutdown(self):
        self.cancel()
        with self.lock:
            worker = self.worker
        if worker and worker is not threading.current_thread():
            # Allow the cancellation escalation to run before the server exits.
            worker.join(timeout=4)


IMAGE_BUILD = ImageBuild()


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
        command += ['sh', '-c', 'cat > /tmp/main.cpp && g++ -std=c++20 -O0 -Wall -Wextra -fmax-errors=5 /tmp/main.cpp -o /tmp/program && /tmp/program']
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
        if self.path == '/api/setup':
            status = docker_status()
            images = {key: docker_ready(key)['ready'] for key in ('cpp', 'torch')} if status['state'] == 'ready' else {'cpp': False, 'torch': False}
            return self.reply(200, {'docker': status, 'images': images, 'build': IMAGE_BUILD.snapshot()})
        if self.path.startswith('/api/'):
            return self.reply(404, {'error': '존재하지 않는 API입니다.'})
        return super().do_GET()

    def do_POST(self):
        if not self.allowed() or not hmac.compare_digest(self.headers.get('X-Lab-Token', ''), TOKEN):
            return self.reply(403, {'error': '동일 출처 세션 인증이 필요합니다.'})
        if self.path in ('/api/setup/build', '/api/setup/cancel', '/api/setup/start-docker'):
            try:
                length = int(self.headers.get('Content-Length', '0'))
                if not 0 < length <= 1024:
                    return self.reply(413, {'error': '요청은 1KB 이하여야 합니다.'})
                if self.headers.get('Content-Type') != 'application/json':
                    return self.reply(415, {'error': 'JSON 요청이 필요합니다.'})
                data = json.loads(self.rfile.read(length))
                if not isinstance(data, dict):
                    raise ValueError()
            except (ValueError, UnicodeDecodeError):
                return self.reply(400, {'error': '유효한 JSON 객체가 필요합니다.'})
            if self.path == '/api/setup/build':
                if set(data) != {'runtime'} or data['runtime'] not in ('cpp', 'torch'):
                    return self.reply(400, {'error': 'cpp 또는 torch 실행 환경만 준비할 수 있습니다.'})
                status = docker_status()
                if status['state'] != 'ready':
                    return self.reply(503, {'error': status['message']})
                ok, message = IMAGE_BUILD.start(data['runtime'])
                return self.reply(202 if ok else 409, {'ok': True} if ok else {'error': message})
            if data:
                return self.reply(400, {'error': '이 요청에는 추가 설정이 필요하지 않습니다.'})
            if self.path == '/api/setup/cancel':
                ok, message = IMAGE_BUILD.cancel()
                return self.reply(200 if ok else 409, {'ok': True} if ok else {'error': message})
            ok, message = start_docker()
            return self.reply(200 if ok else 503, {'ok': True, 'message': message} if ok else {'error': message})
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
    previous_term = signal.getsignal(signal.SIGTERM)
    def stop_server(_signum, _frame):
        raise KeyboardInterrupt
    signal.signal(signal.SIGTERM, stop_server)
    print(f'바닥부터 실습실: http://127.0.0.1:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        IMAGE_BUILD.shutdown()
        server.server_close()
        signal.signal(signal.SIGTERM, previous_term)


if __name__ == '__main__':
    main()
