import test from 'node:test';
import assert from 'node:assert/strict';
import {validateFrame} from '../web/trace-player.js';
test('batch frames require matched bounded finite inputs and targets',()=>{
 const frame={kind:'batch',line:5,epoch:0,batch:0,inputs:[1,2],targets:[3,5]};
 assert.equal(validateFrame(frame),true);
 for(const x of [{inputs:[]},{targets:[3]},{inputs:[Infinity,2]},{epoch:-1},{batch:1.2},{targets:['<script>',5]}]) assert.equal(validateFrame({...frame,...x}),false);
});
