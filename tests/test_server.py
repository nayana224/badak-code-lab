import http.client
import json
import os
import subprocess
import sys
import threading
import time
from types import SimpleNamespace
import unittest
from unittest.mock import patch
import server


class API(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.httpd = server.ThreadingHTTPServer(('127.0.0.1', 0), server.Handler)
        cls.port = cls.httpd.server_port
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()

    def request(self, method, path, data=None, headers=None):
        conn = http.client.HTTPConnection('127.0.0.1', self.port, timeout=10)
        conn.request(method, path, body=data, headers=headers or {})
        response = conn.getresponse()
        result = (response.status, response.read())
        conn.close()
        return result

    def test_static_and_session(self):
        status, body = self.request('GET', '/')
        self.assertEqual(status, 200)
        self.assertIn('PyTorch'.encode(), body)
        status, body = self.request('GET', '/api/session')
        self.assertEqual(json.loads(body)['token'], server.TOKEN)

    def test_cross_origin_and_dns_rebinding(self):
        for headers in ({'Origin':'https://evil.example'}, {'Host':'evil.example'}, {'Sec-Fetch-Site':'cross-site'}):
            self.assertEqual(self.request('GET', '/api/session', headers=headers)[0], 403)

    def test_post_auth_and_validation(self):
        self.assertEqual(self.request('POST', '/api/run', '{}')[0], 403)
        headers = {'X-Lab-Token':server.TOKEN, 'Content-Type':'application/json'}
        self.assertEqual(self.request('POST', '/api/run', '{', headers)[0], 400)
        self.assertEqual(self.request('POST', '/api/run', '{"code":42}', headers)[0], 400)
        self.assertEqual(self.request('POST', '/api/run', 'a'*32001, headers)[0], 413)

    def test_unavailable_runtime_is_explicit(self):
        with patch.object(server, 'docker_ready', return_value={'ready':False,'message':'Docker 준비 필요'}):
            status, body = self.request('POST', '/api/run', '{"code":"print(1)"}', {'X-Lab-Token':server.TOKEN,'Content-Type':'application/json'})
        self.assertEqual(status, 503)
        self.assertIn('Docker', json.loads(body)['error'])

    def test_runtime_validation_and_health(self):
        headers = {'X-Lab-Token':server.TOKEN, 'Content-Type':'application/json'}
        self.assertEqual(self.request('POST', '/api/run', '{"code":"x","runtime":"shell"}', headers)[0], 400)
        with patch.object(server, 'docker_ready', return_value={'ready':True, 'message':'ready'}):
            status, body = self.request('GET', '/api/health')
        data = json.loads(body)
        self.assertEqual(status, 200)
        self.assertTrue(data['cpp']['ready'] and data['torch']['ready'])
        self.assertFalse(data['gpu_required'])
        self.assertEqual(data['mode'], 'local')

    def test_host_files_not_served(self):
        self.assertEqual(self.request('GET', '/server.py')[0], 404)

    def test_setup_status_and_authorization(self):
        with patch.object(server, 'docker_status', return_value={'state':'ready','message':'ready'}), \
             patch.object(server, 'docker_ready', return_value={'ready':True,'message':'ready'}):
            status, body = self.request('GET', '/api/setup')
        data = json.loads(body)
        self.assertEqual(status, 200)
        self.assertEqual(data['docker']['state'], 'ready')
        self.assertTrue(data['images']['cpp'] and data['images']['torch'])
        for path in ('/api/setup/build', '/api/setup/cancel', '/api/setup/start-docker'):
            self.assertEqual(self.request('POST', path, '{}')[0], 403)
            self.assertEqual(self.request('POST', path, '{}', {'X-Lab-Token':server.TOKEN,'Content-Type':'application/json','Origin':'https://evil.example'})[0], 403)

    def test_setup_build_only_accepts_fixed_runtime(self):
        headers = {'X-Lab-Token':server.TOKEN, 'Content-Type':'application/json'}
        for body in ('{"runtime":"shell"}', '{"runtime":"cpp","command":"echo unsafe"}', '[]', '{'):
            self.assertEqual(self.request('POST', '/api/setup/build', body, headers)[0], 400)
        with patch.object(server, 'docker_status', return_value={'state':'unavailable','message':'Docker 실행 필요'}):
            status, body = self.request('POST', '/api/setup/build', '{"runtime":"cpp"}', headers)
        self.assertEqual(status, 503)
        self.assertIn('Docker', json.loads(body)['error'])
        self.assertEqual(self.request('POST', '/api/setup/cancel', '{"pid":1}', headers)[0], 400)

    def test_start_docker_only_requests_predefined_action(self):
        headers = {'X-Lab-Token':server.TOKEN, 'Content-Type':'application/json'}
        with patch.object(server, 'start_docker', return_value=(True, '시작 요청')) as launch:
            status, body = self.request('POST', '/api/setup/start-docker', '{}', headers)
        self.assertEqual(status, 200)
        self.assertTrue(json.loads(body)['ok'])
        launch.assert_called_once_with()
        self.assertEqual(self.request('POST', '/api/setup/start-docker', '{"command":"x"}', headers)[0], 400)


class SetupBuild(unittest.TestCase):
    def test_build_is_fixed_bounded_and_cancellable(self):
        build = server.ImageBuild()
        original_popen = subprocess.Popen
        seen = []
        def fake_popen(command, **kwargs):
            seen.append((command, kwargs['cwd']))
            return original_popen([sys.executable, '-u', '-c', 'import sys,time; print("x"*20000, flush=True); time.sleep(30)'],
                                  stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                  start_new_session=(os.name != 'nt'))
        with patch.object(server.subprocess, 'Popen', side_effect=fake_popen):
            self.assertTrue(build.start('cpp')[0])
            self.assertFalse(build.start('torch')[0])
            deadline = time.monotonic() + 5
            while len(build.snapshot()['log']) < server.BUILD_LOG_LIMIT and time.monotonic() < deadline:
                time.sleep(.01)
            self.assertLessEqual(len(build.snapshot()['log'].encode()), server.BUILD_LOG_LIMIT)
            self.assertTrue(build.cancel()[0])
            deadline = time.monotonic() + 5
            while build.snapshot()['status'] == 'running' and time.monotonic() < deadline:
                time.sleep(.01)
        self.assertEqual(build.snapshot()['status'], 'cancelled')
        self.assertFalse(build.cancel()[0])
        self.assertEqual(seen[0][0], ['docker','build','-f','Dockerfile.cpp','-t',server.CPP_IMAGE,'.'])
        self.assertEqual(seen[0][1], str(server.WEB.parent))

    def test_missing_docker_and_start_request(self):
        with patch.object(server.shutil, 'which', return_value=None):
            self.assertEqual(server.docker_status()['state'], 'not-installed')
            self.assertFalse(server.start_docker()[0])

    def test_linux_start_only_for_existing_user_desktop_service(self):
        status = {'state':'unavailable', 'message':'stopped'}
        with patch.object(server, 'docker_status', return_value=status), \
             patch.object(server.sys, 'platform', 'linux'), \
             patch.object(server.shutil, 'which', return_value='/usr/bin/systemctl'), \
             patch.object(server.subprocess, 'run', return_value=SimpleNamespace(returncode=0, stdout='not-found\n')) as run:
            ok, message = server.start_docker()
        self.assertFalse(ok)
        self.assertIn('직접', message)
        self.assertEqual(run.call_count, 1)
        with patch.object(server, 'docker_status', return_value=status), \
             patch.object(server.sys, 'platform', 'linux'), \
             patch.object(server.shutil, 'which', return_value='/usr/bin/systemctl'), \
             patch.object(server.subprocess, 'run', side_effect=[SimpleNamespace(returncode=0, stdout='loaded\n'), SimpleNamespace(returncode=0)]) as run:
            ok, _ = server.start_docker()
        self.assertTrue(ok)
        self.assertEqual(run.call_args_list[1].args[0], ['systemctl','--user','start','docker-desktop.service'])


@unittest.skipUnless(os.environ.get('BADAK_DOCKER_TEST') == '1', 'Docker integration opt-in')
class Docker(unittest.TestCase):
    def test_autograd(self):
        result = server.execute('import torch\nw=torch.tensor(3.,requires_grad=True)\nb=torch.tensor(1.,requires_grad=True)\nloss=(w*2+b-5)**2\nloss.backward()\nprint(w.grad.item(),b.grad.item())')
        self.assertEqual(result['returncode'], 0, result)
        self.assertIn('8.0 4.0', result['stdout'])

    def test_python_error(self):
        result = server.execute('raise ValueError("real error")')
        self.assertNotEqual(result['returncode'], 0)
        self.assertIn('ValueError: real error', result['stderr'])

    def test_timeout(self):
        result = server.execute('while True: pass')
        self.assertIn('15초', result['error'])

    def test_output_limit(self):
        result = server.execute('while True: print("x" * 4096)')
        self.assertIn('64KB', result['error'])
        self.assertLessEqual(len(result['stdout']), 64000)

    def test_isolation(self):
        result = server.execute('import os, socket\nassert os.getuid()==65534\nassert not os.path.exists("/var/run/docker.sock")\ntry:\n open("/probe", "w")\nexcept OSError:\n print("read-only")\nelse:\n raise AssertionError("writable root")\ns=socket.socket()\ns.settimeout(1)\ntry:\n s.connect(("1.1.1.1",443))\nexcept OSError:\n print("network blocked")\nelse:\n raise AssertionError("network open")')
        self.assertEqual(result['returncode'], 0, result)
        self.assertIn('read-only', result['stdout'])
        self.assertIn('network blocked', result['stdout'])


@unittest.skipUnless(os.environ.get('BADAK_DOCKER_TEST') == '1', 'Docker integration opt-in')
class CppAndTrace(unittest.TestCase):
    def test_cpp20_ranges(self):
        code = '#include <ranges>\n#include <vector>\n#include <iostream>\nint main(){std::vector<int> v{1,2,3,4}; for(int n: v | std::views::filter([](int x){return x >= 3;})) std::cout << n << " ";}'
        result = server.execute(code, runtime='cpp')
        self.assertEqual(result['returncode'], 0, result)
        self.assertEqual(result['stdout'].strip(), '3 4')

    def test_cpp_compilation_and_trace(self):
        code = '#include <iostream>\n#include <vector>\nint main(){std::vector<int> v={10,20,30,40}; int sum=0; for(int i=0;i<4;++i){sum+=v[i];record_array(v,i,sum);}std::cout<<sum<<"\\n";}'
        result = server.execute(code, runtime='cpp')
        self.assertEqual(result['returncode'], 0, result)
        self.assertEqual(result['stderr'], '')
        lines = result['stdout'].splitlines()
        frames = [json.loads(line.removeprefix('__BADAK_TRACE__')) for line in lines if line.startswith('__BADAK_TRACE__')]
        self.assertEqual([f['total'] for f in frames], [10,30,60,100])
        self.assertEqual(lines[-1], '100')
        self.assertEqual(frames[-1]['line'], 3)

    def test_grader_does_not_add_trace_frames(self):
        result = server.execute('def value(n):\n record("stack", values=[n], action="push", value=n)\n return n\nvalue(1)', 'for i in range(200): assert value(i) == i')
        self.assertEqual(result['returncode'], 0, result)
        self.assertEqual(result['stdout'].count('__BADAK_TRACE__'), 1)

    def test_cpp_sort_snapshots(self):
        result = server.execute('int main(){std::vector<int> v={3,1,2};std::swap(v[0],v[1]);record_sort(v,0,1,true);std::swap(v[1],v[2]);record_sort(v,1,2,true);}', runtime='cpp')
        self.assertEqual(result['returncode'], 0, result)
        frames = [json.loads(line.removeprefix('__BADAK_TRACE__')) for line in result['stdout'].splitlines()]
        self.assertEqual(frames[-1]['values'], [1,2,3])
        self.assertTrue(frames[-1]['swapped'])

    def test_cpp_real_compiler_error(self):
        result = server.execute('int main() { missing_name; }', runtime='cpp')
        self.assertNotEqual(result['returncode'], 0)
        self.assertIn('lesson.cpp:1:', result['stderr'])
        self.assertIn('missing_name', result['stderr'])

    def test_cpp_runtime_timeout(self):
        result = server.execute('int main() { while(true){} }', runtime='cpp')
        self.assertIn('15초', result['error'])

    def test_cpp_isolation(self):
        code = '#include <fstream>\n#include <unistd.h>\n#include <sys/socket.h>\n#include <arpa/inet.h>\nint main(){ if(getuid()!=65534)return 1; std::ofstream out("/probe"); if(out.good())return 2; int fd=socket(AF_INET,SOCK_STREAM,0); sockaddr_in a{};a.sin_family=AF_INET;a.sin_port=htons(443);inet_pton(AF_INET,"1.1.1.1",&a.sin_addr);if(connect(fd,(sockaddr*)&a,sizeof(a))==0)return 3;std::cout<<"isolated";}'
        result = server.execute(code, runtime='cpp')
        self.assertEqual(result['returncode'], 0, result)
        self.assertEqual(result['stdout'], 'isolated')

    def test_python_trace_records_actual_values_and_limits(self):
        result = server.execute('values=[]\nvalues.append(42)\nrecord("stack", values=values.copy(), action="push", value=42)')
        self.assertEqual(result['returncode'], 0, result)
        frame = json.loads(result['stdout'].strip().removeprefix('__BADAK_TRACE__'))
        self.assertEqual(frame['values'], [42])
        self.assertEqual(frame['line'], 3)
        limited = server.execute('for i in range(129): record("stack", values=[i], action="push", value=i)')
        self.assertNotEqual(limited['returncode'], 0)
        self.assertIn('128', limited['stderr'])


if __name__ == '__main__':
    unittest.main()
