import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFrame } from '../web/trace-player.js';

test('causal mask trace accepts finite actual matrices and validates mask shape and type', () => {
 const frame = {kind:'causal_attention',line:12,scores:[[1,0],[0,1]],mask:[[false,true],[false,false]],weights:[[1,0],[0.27,0.73]],result:[[2,2],[2.73,3.46]]};
 assert.equal(validateFrame(frame),true);
 for (const changes of [{mask:[[false],[false]]},{mask:[[false,'true'],[false,false]]},{scores:[[Infinity,0],[0,1]]},{weights:[[1],[0]]},{result:[[1,2]]}]) assert.equal(validateFrame({...frame,...changes}),false);
});
