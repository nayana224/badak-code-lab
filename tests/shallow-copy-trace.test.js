import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { validateFrame } from '../web/trace-player.js';
import { shallowCopyLessons } from '../web/shallow-copy-lesson.js';

const valid={kind:'shallow_copy',line:1,original:[[1,2],[3,4]],copied:[[1,2],[3,4]],same_outer:false,same_inner:[true,true]};
test('shallow copy frames validate bounded, finite nested lists and identity comparisons',()=>{
 assert.equal(validateFrame(valid),true);
 for(const changes of [{same_outer:'false'},{same_inner:[true]},{same_inner:[true,'x']},{original:[[Infinity]]},{original:Array(9).fill([1])},{copied:[['<script>'],[1,2]]},{line:0}]) assert.equal(validateFrame({...valid,...changes}),false);
 assert.equal(validateFrame({...valid,original:[],copied:[],same_inner:[]}),true);
 assert.equal(validateFrame({...valid,original:[[1,2]],copied:[[1,2],[3,4]],same_inner:[true]}),true);
});
test('solution records actual object identities before mutation and replacement',()=>{
 const lesson=shallowCopyLessons[0];
 const prelude=readFileSync(new URL('../web/trace-prelude.py',import.meta.url),'utf8');
 const run=spawnSync('python3',['-c',prelude+'\n'+lesson.solution+'\n'+lesson.check],{encoding:'utf8',timeout:5000});
 assert.equal(run.status,0,run.stderr);
 const frames=run.stdout.split('\n').filter(x=>x.startsWith('__BADAK_TRACE__')).map(x=>JSON.parse(x.slice('__BADAK_TRACE__'.length)));
 assert.equal(frames.length,3);
 assert.ok(frames.every(validateFrame));
 assert.deepEqual(frames.map(x=>x.same_outer),[false,false,false]);
 assert.deepEqual(frames.map(x=>x.same_inner),[[true,true],[true,true],[true,false]]);
 assert.deepEqual(frames.map(x=>x.original),[[[1,2],[3,4]],[[10,2],[3,4]],[[10,2],[3,4]]]);
 assert.deepEqual(frames.map(x=>x.copied),[[[1,2],[3,4]],[[10,2],[3,4]],[[10,2],[7,8]]]);
});
