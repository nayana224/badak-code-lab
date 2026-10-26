// Each request gets fresh Python globals; the worker keeps the downloaded runtime.
import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs';
let pyodide;
const tracePrelude = fetch('/trace-prelude.py').then(r => {if(!r.ok) throw Error('시각화 도우미를 불러오지 못했습니다.');return r.text();});
self.onmessage = async ({data}) => {
  const {code, check, numpy} = data;
  let globals;
  let size = 0;
  const send = (text, stream) => {
    size += text.length;
    if (size > 64000) throw new Error('출력이 64KB를 초과했습니다. 반복문을 확인하세요.');
    self.postMessage({type:'output', text, stream});
  };
  try {
    if (!pyodide) {
      self.postMessage({type:'status', text:'Python 다운로드 중…'});
      pyodide = await loadPyodide();
    }
    pyodide.setStdout({batched:text => send(text, 'stdout')});
    pyodide.setStderr({batched:text => send(text, 'stderr')});
    pyodide.setStdin({stdin:() => {throw new Error('이 실습실은 input()을 지원하지 않습니다. 값을 코드에 직접 입력하세요.');}});
    if (numpy) {
      self.postMessage({type:'status', text:'NumPy 준비 중…'});
      await pyodide.loadPackage('numpy');
    }
    self.postMessage({type:'executing'});
    globals = pyodide.runPython('dict(__name__="__main__")');
    await pyodide.runPythonAsync(await tracePrelude, {globals});
    await pyodide.runPythonAsync(code, {globals});
    if (check) {
      globals.set("_lab_record_enabled", false);
      await pyodide.runPythonAsync(check, {globals});
    }
    self.postMessage({type:'done', passed:!!check});
  } catch (error) {
    self.postMessage({type:'error', text:error.message});
  } finally {globals?.destroy();}
};
