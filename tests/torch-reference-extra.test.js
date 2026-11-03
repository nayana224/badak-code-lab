import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons} from '../web/lessons.js';
import {torchReferences, torchReferenceExamples} from '../web/torch-reference-extra.js';
const refs = id => torchReferences(lessons.find(x=>x.id===id)).map(([name])=>name);
test('operations are shown only in lessons containing their calls',()=>{
 assert.ok(refs('torch-network').includes('tensor.int()'));
 assert.ok(refs('torch-network').includes('tensor.bool()'));
 assert.ok(refs('torch-network').includes('tensor.flatten()'));
 assert.ok(!refs('tensor').includes('tensor.int()'));
 assert.ok(refs('torch-state-dict').includes('tensor.detach()'));
 assert.ok(refs('torch-state-dict').includes('tensor.clone()'));
 assert.ok(refs('torch-multi-head').includes('tensor.transpose(dim0, dim1)'));
 assert.deepEqual(torchReferences({runtime:'python', code:'x.int()'}),[]);
});
test('all produced references carry descriptions and examples',()=>{
 for(const l of lessons.filter(x=>x.runtime==='torch')) for(const [name,description] of torchReferences(l)) {
  assert.ok(description,`${l.id} ${name}`); assert.ok(torchReferenceExamples[name],`${l.id} ${name}`);
 }
});

test('PyTorch operation explanations are included in the lesson UI without duplicate names', async()=>{
 const {explanations}=await import('../web/courses.js');
 const network=lessons.find(x=>x.id==='torch-network');
 const names=explanations(network).map(([name])=>name);
 for(const name of ['tensor.int()','tensor.bool()','tensor.flatten()']) assert.ok(names.includes(name),name);
 assert.equal(names.filter(name=>name==='tensor.int()').length,1);
 assert.ok(!names.includes('int(...)'));
});
