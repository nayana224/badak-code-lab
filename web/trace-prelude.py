"""Small, explicit trace API shared by the browser and Python container."""
import json as _lab_json
import sys as _lab_sys
_lab_trace_count = 0

def record(kind, **state):
    """Record the actual values passed by learner code (at most 128 frames)."""
    global _lab_trace_count
    if _lab_trace_count >= 128:
        raise ValueError('시각화는 실행당 128단계까지 기록합니다. 입력 크기를 줄이세요.')
    frame = dict(state, kind=kind, line=_lab_sys._getframe(1).f_lineno)
    encoded = _lab_json.dumps(frame, ensure_ascii=False, allow_nan=False)
    if len(encoded.encode('utf-8')) > 4096:
        raise ValueError('시각화 한 단계는 4KB 이하여야 합니다.')
    _lab_trace_count += 1
    print('__BADAK_TRACE__' + encoded)
