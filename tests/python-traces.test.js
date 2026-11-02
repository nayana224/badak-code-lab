import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { validateFrame } from '../web/trace-player.js';

test('연결 리스트 방문 기록은 숫자와 다음 노드 또는 None만 받는다', () => {
 assert.equal(validateFrame({line: 1,kind:'linked',values:[10,20],current:20,next_value:null}),true);
 assert.equal(validateFrame({line: 1,kind:'linked',values:[10],current:20,next_value:null}),false);
 assert.equal(validateFrame({line: 1,kind:'linked',values:[10],current:10,next_value:'<script>'}),false);
});
test('선택 정렬 기록은 실제 배열 안의 인덱스만 받는다', () => {
 const frame={line:1,kind:'selection',values:[3,1,2],candidate:1,smallest:0,position:0,action:'compare'};
 assert.equal(validateFrame(frame),true);
 assert.equal(validateFrame({...frame,candidate:3}),false);
 assert.equal(validateFrame({...frame,action:'other'}),false);
});
test('기울기 경로 기록은 유한한 수치만 받는다', () => {
 const frame={line:2,kind:'gradient_paths',x:3,y:12,left:3,right:3,direct:1,total:7};
 assert.equal(validateFrame(frame),true);
 assert.equal(validateFrame({...frame,left:Infinity}),false);
});

test('연결 리스트와 선택 정렬의 실제 실행 기록이 허용 형식이며 값의 변화를 담는다', async () => {
 const {bridgeLessons} = await import('../web/bridge-lessons.js');
 const {spawnSync} = await import('node:child_process');
 const {readFileSync} = await import('node:fs');
 const prelude=readFileSync(new URL('../web/trace-prelude.py',import.meta.url),'utf8');
 const run=id=>{
  const lesson=bridgeLessons.find(item=>item.id===id);
  const result=spawnSync('python3',['-c',prelude+'\n'+lesson.solution],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  return result.stdout.split('\n').filter(line=>line.startsWith('__BADAK_TRACE__')).map(line=>JSON.parse(line.slice('__BADAK_TRACE__'.length)));
 };
 const linked=run('py-linked-list');
 assert.deepEqual(linked.map(frame=>[frame.current,frame.next_value]),[[10,20],[20,30],[30,null]]);
 assert.ok(linked.every(validateFrame));
 const sorted=run('py-selection-sort');
 assert.ok(sorted.some(frame=>frame.action==='compare'));
 assert.deepEqual(sorted.at(-1).values,[0,1,2,3]);
 assert.ok(sorted.every(validateFrame));
});
