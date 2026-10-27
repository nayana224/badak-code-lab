"""Execute the actual browser lesson catalog, not duplicated example fixtures."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import unittest
import server


@unittest.skipUnless(os.environ.get('BADAK_DOCKER_TEST') == '1' and shutil.which('node'), 'Requires both Docker images and Node.js')
class Curriculum(unittest.TestCase):
    def test_attention_matches_torch_reference(self):
        code = '''import math
import torch
import torch.nn.functional as F
Q = torch.tensor([[1., 0.], [0., 1.]])
K = torch.tensor([[1., 0.], [0., 1.]])
V = torch.tensor([[2., 2.], [3., 4.]])
scores = Q @ K.T / math.sqrt(Q.shape[-1])
weights = torch.softmax(scores, dim=-1)
assert torch.allclose(weights @ V, F.scaled_dot_product_attention(Q, K, V), atol=1e-6)
mask = torch.triu(torch.ones_like(scores, dtype=torch.bool), diagonal=1)
masked = torch.softmax(scores.masked_fill(mask, float('-inf')), dim=-1) @ V
assert torch.allclose(masked, F.scaled_dot_product_attention(Q, K, V, is_causal=True), atol=1e-6)
print('attention verified')
'''
        result = server.execute(code, runtime='torch')
        self.assertEqual(result['returncode'], 0, result)
        self.assertEqual(result['stdout'].strip(), 'attention verified')

    def test_complete_lesson_solutions(self):
        root = Path(__file__).resolve().parents[1]
        result = subprocess.run(['node', '--input-type=module', '-e', 'import {lessons} from "./web/lessons.js";process.stdout.write(JSON.stringify(lessons));'], cwd=root, check=True, capture_output=True, text=True, timeout=10)
        lessons = json.loads(result.stdout)
        self.assertEqual(len(lessons), 77)
        self.assertEqual(len({lesson['id'] for lesson in lessons}), 77)
        for lesson in lessons:
            with self.subTest(lesson=lesson['id']):
                for field in ('title','concept','predict','task','hint','takeaway','code'):
                    self.assertTrue(lesson[field])
                code = lesson.get('solution')
                if not code:
                    code = lesson['code']
                    if lesson['id'] == 'matrix-steps':
                        code = code.replace('[[1., 2., 3.]', '[[2., 2., 3.]')
                    elif lesson['id'] == 'cpp-vector':
                        code = code.replace('{10, 20, 30}', '{10, 20, 30, 40}')
                    elif lesson['id'] == 'cpp-search':
                        code = code.replace('binary_search(values, 12)', 'binary_search(values, 10)')
                    else:
                        code += '\n' + lesson['hint']
                answer = server.execute(code, lesson.get('check',''), runtime='cpp' if lesson['runtime']=='cpp' else 'torch')
                self.assertEqual(answer['returncode'], 0, answer)
                self.assertIsNone(answer['error'])
                frames = [json.loads(line.removeprefix('__BADAK_TRACE__')) for line in answer['stdout'].splitlines() if line.startswith('__BADAK_TRACE__')]
                output = '\n'.join(line for line in answer['stdout'].splitlines() if not line.startswith('__BADAK_TRACE__')).strip()
                if lesson.get('expectedOutput'):
                    self.assertEqual(output, lesson['expectedOutput'])
                if lesson.get('trace'):
                    self.assertGreater(len(frames),0)
                if frames and frames[-1]['kind']=='training':
                    self.assertLess(frames[-1]['loss'], frames[0]['loss'])
                    self.assertTrue(all(frame['loss']>=0 for frame in frames))
