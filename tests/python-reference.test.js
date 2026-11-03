import test from 'node:test';
import assert from 'node:assert/strict';
import { pythonReferences } from '../web/python-reference.js';
import { lessons } from '../web/lessons.js';

test('정수 내장 함수와 텐서 변환 메서드를 구분한다',()=>{
 const names=(lesson)=>pythonReferences(lesson).map(([name])=>name);
 assert.ok(names({runtime:'python', code:'x = int("3")'}).includes('int(...)'));
 assert.ok(!names({runtime:'torch', code:'labels = tensor.int()'}).includes('int(...)'));
 assert.ok(names({runtime:'torch', code:'labels = tensor.int()'}).includes('tensor.int()'));
 assert.ok(!names({runtime:'python', code:'obj.int()'}).includes('int(...)'));
 assert.ok(!names({runtime:'python', code:'obj.int()'}).includes('tensor.int()'));
});

test('큐 append 설명은 호출한 deque에도 맞는다',()=>{
 const queue=lessons.find(item=>item.id==='py-queue');
 const description=pythonReferences(queue).find(([name])=>name==='append(value)')?.[1];
 assert.match(description,/deque/);
});

test('최솟값과 최댓값 수업은 한 번만 소비되는 반복자도 처리한다',async()=>{
 const {spawnSync}=await import('node:child_process');
 const lesson=lessons.find(item=>item.id==='py-min-max-default');
 const run=spawnSync('python3',['-c',lesson.solution+'\n'+lesson.check],{encoding:'utf8',timeout:5000});
 assert.equal(run.status,0,run.stderr);
});
