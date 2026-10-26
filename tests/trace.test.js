import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFrame } from '../web/trace-player.js';
const frame={kind:'matrix',line:10,left:[[2,2,3],[4,5,6]],right:[[1,0],[0,1],[1,1]],result:[[2,0],[0,0]],row:0,col:0,inner:0,product:2,total:2};

test('accepts actual matrix, stack, array and search records',()=>{
 assert.equal(validateFrame(frame),true);
 assert.equal(validateFrame({kind:'stack',line:7,values:[],action:'pop',value:20}),true);
 assert.equal(validateFrame({kind:'array',line:7,values:[10,20,30,40],active:3,total:100}),true);
 assert.equal(validateFrame({kind:'search',line:7,values:[2,4,6,8,10,12,14],left:4,right:4,mid:4,target:10}),true);
});
test('rejects malformed dimensions and out-of-range coordinates',()=>{
 for(const bad of [{right:[[1,0]]},{result:[[2,0]]},{col:2},{row:-1},{inner:3},{row:.5}]) assert.equal(validateFrame({...frame,...bad}),false);
});
test('rejects untrusted text, nonfinite values, unknown kinds and excessive arrays',()=>{
 assert.equal(validateFrame({...frame,total:Infinity}),false);
 assert.equal(validateFrame({kind:'stack',line:1,values:['<img src=x onerror=alert(1)>'],action:'push',value:2}),false);
 assert.equal(validateFrame({kind:'stack',line:1,values:Array(33).fill(1),action:'push',value:1}),false);
 assert.equal(validateFrame({...frame,kind:'html'}),false);
 for(const line of [0,-1,10001,'1',NaN])assert.equal(validateFrame({...frame,line}),false);
});
test('rejects invalid search bounds and array active positions',()=>{
 assert.equal(validateFrame({kind:'search',line:1,values:[1,2],left:1,right:0,mid:1,target:1}),false);
 assert.equal(validateFrame({kind:'array',line:1,values:[1],active:1,total:1}),false);
});
test('accepts queue, sort, and real training snapshots',()=>{
 assert.equal(validateFrame({kind:'queue',line:5,values:[30],action:'dequeue',value:20}),true);
 assert.equal(validateFrame({kind:'sort',line:14,values:[1,5,4],first:0,second:1,swapped:true}),true);
 assert.equal(validateFrame({kind:'training',line:14,epoch:80,loss:1.5e-12,weights:[2,1]}),true);
 assert.equal(validateFrame({kind:'training',line:14,epoch:300,loss:.001,weights:[],accuracy:1}),true);
});
test('rejects invalid queue, sort and training snapshots',()=>{
 assert.equal(validateFrame({kind:'queue',line:5,values:[1],action:'push',value:1}),false);
 assert.equal(validateFrame({kind:'sort',line:14,values:[1,2],first:0,second:2,swapped:true}),false);
 for(const changes of [{loss:-1},{epoch:-1},{accuracy:1.1},{loss:NaN},{weights:['bad']}])assert.equal(validateFrame({kind:'training',line:1,epoch:0,loss:1,weights:[],...changes}),false);
});
