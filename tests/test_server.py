import http.client
import json
import os
import threading
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
