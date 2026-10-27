# 개발 및 검증

## 파일

- `web/lessons.js`, `extra-lessons.js`, `continuation-lessons.js`, `foundation-lessons.js`, `bridge-lessons.js`, `modern-cpp-lessons.js`, `courses.js`: 수업·강좌·설명
- `web/app.js`, `style.css`, `index.html`: UI와 저장·실행 연결
- `web/editor-adapter.js`, `editor-src/`, `scripts/build-editor.mjs`: 편집기 연결과 재현 가능한 로컬 빌드
- `web/vendor/editor.js`, `THIRD_PARTY_NOTICES.md`: 포함된 편집기 번들과 의존성 라이선스
- `web/python-worker.js`, `trace-prelude.py`: 브라우저 Python과 실행 기록 도우미
- `web/trace-player.js`: 검증된 실제 기록의 단계 재생
- `server.py`, `cpp-prelude.hpp`: Docker 실행 API와 C++ 기록 도우미
- `Dockerfile`, `Dockerfile.cpp`: 실행 이미지
- `tests/`: 실제 컴파일·실행과 API 방어 통합 검사

```bash
# API 검사 (Docker 통합 검사는 생략)
python3 -m unittest discover -s tests -v
# 두 이미지와 Node.js가 준비된 환경에서 전체 수업을 포함한 통합 검사
BADAK_DOCKER_TEST=1 python3 -m unittest discover -s tests -v
```

선택적으로 Node.js가 있으면 `node tests/trace.test.js`로 시각화 기록의 형식·크기·좌표 검증 테스트를 실행할 수 있습니다.

확인된 동작과 한계는 `VERIFICATION.md`를 참고하세요.

참고: [Pyodide worker](https://pyodide.org/en/stable/usage/webworker.html), [PyTorch 설치](https://pytorch.org/get-started/previous-versions/), [Docker 공식 GCC 이미지](https://hub.docker.com/_/gcc).

