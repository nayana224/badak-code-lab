import test from 'node:test';
import assert from 'node:assert/strict';
import {validateFrame} from '../web/trace-player.js';
test('broadcast records require finite compatible arrays and valid highlighted positions',()=>{
 const frame={kind:'broadcast',line:3,input:[[1,2,3],[4,5,6]],bias:[10,20,30],result:[[11,22,33],[14,25,36]],row:0,col:2};
 assert.equal(validateFrame(frame),true);
 for(const change of [{bias:[1]},{row:2},{col:-1},{result:[[1,2]]},{input:[[1,2,Infinity]]},{bias:['x',2,3]}]) assert.equal(validateFrame({...frame,...change}),false);
});
