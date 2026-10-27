import test from 'node:test';
import assert from 'node:assert/strict';
import { createSetupUI } from '../web/setup-ui.js';

const response = data => ({ok:true, json:async()=>data});
function fakeDocument() {
 const elements = new Map();
 return {querySelector(key) {if(!elements.has(key)) elements.set(key,{textContent:'',hidden:false,disabled:false});return elements.get(key);}};
}
test('Docker에 연결되지 않으면 이미지 상태를 확인 불가로 표시한다', async()=>{
 const doc=fakeDocument();
 const ui=createSetupUI({document:doc,request:async()=>response({docker:{state:'unavailable',message:'Docker 엔진을 시작하세요'},images:{cpp:false,torch:false},build:{status:'idle',runtime:null,log:''}})});
 await ui.refresh();
 assert.match(doc.querySelector('#backend-health').textContent,/Docker 연결 후 확인/);
 assert.equal(doc.querySelector('#setup-cpp').disabled,true);
 assert.equal(doc.querySelector('#docker-start').disabled,false);
 ui.dispose();
});
test('이미지 시작 요청 중 중지를 누르면 시작 직후 해당 작업을 취소한다', async()=>{
 const doc=fakeDocument();const calls=[];let release;
 const buildResponse=new Promise(resolve=>{release=resolve;});
 const initial={docker:{state:'ready',message:'준비'},images:{cpp:false,torch:false},build:{status:'idle',runtime:null,log:''}};
 const request=async(path, options)=>{
  calls.push(path);
  if(path==='/api/setup') return response(structuredClone(initial));
  if(path==='/api/session') return response({token:'test'});
  if(path==='/api/setup/build') return buildResponse;
  if(path==='/api/setup/cancel') return response({ok:true});
  throw Error(path);
 };
 const ui=createSetupUI({document:doc,request});await ui.refresh();
 const preparing=doc.querySelector('#setup-cpp').onclick();
 while (!calls.includes('/api/setup/build')) await Promise.resolve();
 assert.equal(doc.querySelector('#setup-cpp').disabled,true);
 assert.equal(doc.querySelector('#setup-cancel').hidden,false);
 await doc.querySelector('#setup-cancel').onclick();
 release(response({ok:true}));await preparing;
 assert.equal(calls.filter(path=>path==='/api/setup/build').length,1);
 assert.equal(calls.filter(path=>path==='/api/setup/cancel').length,1);
 ui.dispose();
});
