// The server accepts only a fixed set of local preparation operations.
export function createSetupUI({document: doc, request = fetch}) {
 const $ = selector => doc.querySelector(selector);
 let timer = null, state = null, queue = [], awaitingBuild = false, launching = false, cancelPending = false, startDeadline = 0, refreshing = false;
 const message = text => { $('#setup-message').textContent = text; };
 async function post(path, body = {}) {
  const session = await request('/api/session');
  if (!session.ok) throw new Error('실행 서버에 연결할 수 없습니다.');
  const {token} = await session.json();
  const response = await request(path, {method:'POST', headers:{'Content-Type':'application/json','X-Lab-Token':token}, body:JSON.stringify(body)});
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '준비 작업을 시작하지 못했습니다.');
  return result;
 }
 function render(next) {
  const {docker, images, build} = next;
  const ready = docker.state === 'ready';
  const running = build.status === 'running';
  const starting = startDeadline > Date.now() && !ready;
  const imageStatus = value => ready ? (value ? '준비 완료' : '이미지 필요') : 'Docker 연결 후 확인';
  $('#backend-health').textContent = `${docker.message}\nC++: ${imageStatus(images.cpp)}\nPyTorch: ${imageStatus(images.torch)}`;
  $('#setup-log').textContent = build.log || '아직 준비 작업의 기록이 없습니다.';
  $('#setup-cancel').hidden = !running && !starting && queue.length === 0;
  $('#setup-cpp').disabled = running || starting || !ready || images.cpp || queue.length > 0;
  $('#setup-torch').disabled = running || starting || !ready || images.torch || queue.length > 0;
  $('#setup-all').disabled = running || starting || (images.cpp && images.torch) || queue.length > 0;
  $('#docker-start').disabled = ready || starting || running || docker.state === 'not-installed';
  if (running) message(`${build.runtime === 'cpp' ? 'C++' : 'PyTorch'} 환경을 준비하고 있습니다. 다운로드에는 시간이 걸릴 수 있습니다.`);
 }
 function schedule() { clearTimeout(timer); timer = setTimeout(refresh, 1500); }
 async function refresh() {
  if (refreshing) return;
  clearTimeout(timer); refreshing = true;
  try {
   const response = await request('/api/setup', {signal:AbortSignal.timeout(20000)});
   if (!response.ok) throw new Error('준비 상태를 확인할 수 없습니다. 서버를 다시 시작해 주세요.');
   state = await response.json();
   const running = state.build.status === 'running';
   if (awaitingBuild && !running) {
    awaitingBuild = false;
    if (state.build.status !== 'success') {
     queue = [];
     message(state.build.status === 'cancelled' ? '준비 작업을 중지했습니다.' : '준비에 실패했습니다. 아래 진행 내용과 Docker 상태를 확인해 주세요.');
    } else message('환경 준비가 끝났습니다.');
   }
   if (state.docker.state === 'ready') startDeadline = 0;
   else if (startDeadline && Date.now() >= startDeadline) {
    startDeadline = 0; queue = [];
    message('Docker가 아직 준비되지 않았습니다. Docker Desktop 또는 Docker Engine 상태를 확인한 뒤 다시 시도해 주세요.');
   }
   if (queue.length && state.docker.state === 'ready' && !running && !awaitingBuild) {
    while (queue.length && state.images[queue[0]]) queue.shift();
    if (queue.length) {
     const runtime = queue.shift();
     state.build = {status:'running', runtime, log:''};
     launching = true; render(state);
     try {
      await post('/api/setup/build', {runtime}); awaitingBuild = true;
      if (cancelPending) { await post('/api/setup/cancel'); message('이 사이트의 준비 작업 중지를 요청했습니다.'); }
     } finally { launching = false; cancelPending = false; }
    }
   }
   render(state);
   if (state.build.status === 'running' || awaitingBuild || startDeadline || queue.length) schedule();
  } catch (error) { queue = []; awaitingBuild = false; launching = false; cancelPending = false; startDeadline = 0; if (state) {state.build.status='failed';render(state);} message(error.message || '준비 상태를 확인할 수 없습니다.'); }
  finally { refreshing = false; }
 }
 async function startDocker() {
  startDeadline = Date.now() + 60000;
  if (state) render(state);
  try {
   const result = await post('/api/setup/start-docker');
   message(result.message || 'Docker 시작을 요청했습니다. 준비될 때까지 확인합니다.');
  } catch (error) { startDeadline = 0; if (state) render(state); throw error; }
 }
 async function prepare(runtimes) {
  if (queue.length || awaitingBuild || launching || state?.build.status === 'running') return;
  try {
   if (!state) { await refresh(); if (!state) return; }
   queue = runtimes.filter(runtime => !state.images[runtime]);
   if (!queue.length) { message('선택한 실행 환경이 이미 준비되어 있습니다.'); return; }
   if (state.docker.state !== 'ready') await startDocker();
   await refresh();
  } catch (error) { queue = []; startDeadline = 0; message(error.message || '준비 작업을 시작하지 못했습니다.'); }
 }
 $('#setup-all').onclick = () => prepare(['cpp','torch']);
 $('#setup-cpp').onclick = () => prepare(['cpp']);
 $('#setup-torch').onclick = () => prepare(['torch']);
 $('#docker-start').onclick = async () => {try {await startDocker(); await refresh();} catch(error) {message(error.message);}};
 $('#setup-cancel').onclick = async () => {
  queue = []; startDeadline = 0;
  if (launching) {cancelPending = true; message('준비 작업이 시작되는 즉시 중지합니다.'); return;}
  try { if (state?.build.status === 'running') await post('/api/setup/cancel'); message('이 사이트의 준비 작업 중지를 요청했습니다.'); await refresh(); }
  catch (error) { message(error.message); }
 };
 $('#health-refresh').onclick = refresh;
 return {refresh, dispose:()=>clearTimeout(timer)};
}
