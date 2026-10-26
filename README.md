# 바닥부터 · 코드 실습실

한국어로 배우는 Python·C++·PyTorch 튜토리얼 MVP입니다. 개념 설명과 함수·클래스 해설, 위쪽 참고 코드, 아래쪽 빈 편집창, 실제 출력·오류, 명시적인 실행 기록을 이용한 단계 시각화를 제공합니다. 개인 로컬 개발용이며 특정 강사의 공식 콘텐츠가 아닙니다.

## 시작하기

필수: Python 3.10 이상, 최신 브라우저. Python·NumPy 최초 실행에는 인터넷 연결이 필요합니다.

```bash
cd tensor-lab
python3 server.py
```

**http://127.0.0.1:8000** 을 엽니다. 다른 포트는 `python3 server.py --port 8001`을 사용합니다. 실행만 할 때는 npm 설치나 프런트엔드 빌드가 필요 없습니다. 문법 강조 편집기의 미리 빌드한 파일도 프로젝트에 포함되어 있습니다.

### C++과 PyTorch 준비

Docker Engine 또는 Docker Desktop을 실행하고 현재 사용자에게 Docker 접근 권한이 있어야 합니다. 프로젝트 폴더에서 필요한 이미지를 준비하세요.

```bash
# C++17 · GCC 13.5.0
docker build -f Dockerfile.cpp -t badak-cpp:13.5.0 .
# PyTorch 2.8.0 CPU + NumPy 2.2.6
docker build -t badak-torch:2.8.0 .
```

서버를 먼저 켰다면 이미지 빌드 후 **실행 환경 → 환경 다시 확인**만 누르면 됩니다. 도우미 파일과 서버 코드를 변경한 경우 서버도 재시작하세요. GPU는 사용하지 않습니다. 이미지가 없으면 정확한 준비 명령을 표시하며 결과를 만들어 내지 않습니다.

## 어디에서 실행하나요?

| 작업 | 현재 실행 위치 | 필요한 것 |
|---|---|---|
| 화면·시각화 재생 | 내 노트북 브라우저 | 브라우저 |
| Python·NumPy | 브라우저의 Pyodide 0.27.7, CPU | 최초 CDN 다운로드 |
| C++ 컴파일·실행 | 이 컴퓨터의 로컬 서버 → 격리 Docker, CPU | C++ 이미지 |
| PyTorch | 이 컴퓨터의 로컬 서버 → 격리 Docker, CPU | PyTorch 이미지 |

현재 클라우드 실행 서버와 GPU는 연결되어 있지 않습니다. 다른 컴퓨터에서 이 컴퓨터의 localhost 주소에 접속할 수 없습니다. 공개 사이트로 운영하려면 별도 서버, 인증·사용량 제한과 다중 사용자 코드 실행 격리 설계가 필요합니다. 프런트엔드만 정적으로 호스팅하면 C++·PyTorch API는 작동하지 않습니다.

## 강좌 · 22개 수업

- **Python (10):** 조건·반복 / 컨테이너 / 함수 / 클래스 / NumPy shape / broadcasting / 행렬 곱 / 스택 / 큐 / 이진 탐색
- **C++ (6):** 변수·출력 / vector·함수 / 복사·참조 / 클래스 / 이진 탐색 / 버블 정렬
- **PyTorch (6):** 텐서 / 자동 미분 / 기울기 누적·초기화 / 직접 구현한 학습 루프 / Linear·SGD / XOR 신경망

순서와 핵심 내용은 [전체 목차](CURRICULUM.md)를 참고하세요. 각 강좌의 기존 수업 ID와 저장된 코드·진도는 유지됩니다. 새 수업은 빈 연습 입력창으로 시작합니다.

## 학습 흐름

1. 상단에서 강좌를 선택하고 왼쪽 목차에서 수업을 고릅니다.
2. 설명을 읽고 함수·클래스 설명을 펼쳐 봅니다.
3. **참고용 완성 코드**를 보며 아래 **직접 입력하기** 빈 편집창에 타이핑합니다.
4. **코드 실행** 또는 Ctrl/⌘+Enter로 아래 입력 코드만 실행합니다. 이전 실행의 변수는 유지되지 않습니다.
5. 시각화 수업에서는 그림의 **이전 / 다음 / 재생 / 속도 / 단계 슬라이더**로 실제 실행 기록을 탐색합니다.
6. 응용 과제를 완성하고 **실습 확인하기**로 검사합니다. Python은 assertion, C++은 실제 일반 출력과 수업의 기대 출력 비교를 사용합니다. 학습용 검사이며 부정행위 방지 채점이 아닙니다.

코드·진도·글자 크기는 localStorage에 자동 저장됩니다. 기기 간 동기화는 없습니다. 같은 브라우저와 같은 주소·포트에서 복원됩니다. 이전 버전의 편집 코드는 **이전 작성 코드 불러오기**로 가져올 수 있습니다. **입력 비우기**는 현재 연습 입력과 그림을 초기화하며 참고 코드는 유지합니다.

상단 **− / 비율 / ＋**로 글자 크기를 90~130% 범위에서 조절합니다. 비율을 누르면 기본값으로 돌아갑니다. 화면 폭·글자 크기에 따라 세로 배치로 전환합니다. 입력창은 코드 줄 수와 화면 높이에 맞춰 높이를 조정하고 아래 경계 드래그로도 조절할 수 있습니다.

## 코드 편집기

위쪽 참고 코드와 아래쪽 연습 입력창에 Python·C++ 문법 강조를 제공합니다. 키워드·문자열·숫자·주석·함수·타입을 색으로 구분하며 VS Code의 어두운 편집 화면에 가까운 색을 사용합니다.

- Enter 자동 들여쓰기, Tab/Shift+Tab 선택 줄 들여쓰기·내어쓰기
- 괄호·따옴표 자동 닫기, 대응 괄호 표시, 코드 접기, 현재 줄·줄 번호 표시
- 기본 단어·지역 이름·실습 코드 조각 자동 완성 (Ctrl+Space, 제안은 Tab 또는 Enter로 적용)
- Ctrl/⌘+F 코드 찾기·바꾸기, Ctrl/⌘+Z 실행 취소·다시 실행
- Ctrl/⌘+Enter 실제 코드 실행, 줄·열 위치 표시
- Esc를 누른 다음 Tab을 누르면 편집창에서 빠져나갈 수 있습니다.

기존 작성 코드와 자동 저장은 그대로 유지됩니다. 언어를 바꾸면 해당 언어의 강조·들여쓰기로 전환하며 다른 수업의 내용을 실행 취소로 가져오지 않도록 편집 이력을 새로 시작합니다. 위쪽 예제는 읽기 전용입니다. 편집기 번들을 읽지 못하면 기본 입력창으로 계속 작성·실행할 수 있습니다.

편집기는 CodeMirror를 로컬 번들로 포함합니다. Python/PyTorch 전체 환경을 분석하는 언어 서버(LSP)나 VS Code 전체 기능을 제공하는 것은 아닙니다. Python 런타임 최초 로딩은 기존처럼 CDN 연결이 필요합니다.

편집기 소스를 변경하는 개발자만 다음 명령이 필요합니다(Node.js 22 이상).

```bash
npm ci
npm run build:editor
npm run test:editor
```

`editor-src/editor.js` 또는 패키지를 변경하면 `web/vendor/editor.js`와 `THIRD_PARTY_NOTICES.md`도 함께 재생성·커밋하세요. dependency 버전과 package-lock.json을 포함합니다. [CodeMirror 기본 구성](https://codemirror.net/examples/basic/)과 [Tab 접근성 안내](https://codemirror.net/examples/tab/)를 참고했습니다.

## 시각화의 동작과 지원 범위

시각화는 코드를 실행한 후 기록된 스냅샷을 재생하는 방식입니다. 임의의 코드를 자동 분석하거나 실행을 중간에서 재개하는 디버거가 아닙니다. 코드가 바뀌면 이전 실행 기록이라는 안내를 표시하므로 다시 실행해야 그림이 갱신됩니다. 실행 오류가 나기 전까지 생성된 기록도 확인할 수 있습니다.

Python에는 실습실 전용 `record(kind, **state)`가 제공됩니다. 예:

```python
record("stack", values=[10, 20], action="push", value=20)
```

실제로는 수업 예제처럼 현재 변수 값을 전달하세요. Python 지원 종류는 `matrix`, `stack`, `queue`, `search`, `training`입니다. 행렬 예제는 `A`, `B`, `C`와 현재 인덱스·곱·누적 합을 전달합니다. 행렬은 최대 8×8, 스택/배열은 최대 32개 수치 원소를 화면에 표시합니다. 실행당 최대 128단계, 한 기록은 4KB로 제한합니다. 잘못된 형식은 경고 후 표시에서 제외합니다.

C++에는 `record_array(values, active, total)`, `record_search(values, left, right, mid, target)`, `record_sort(values, first, second, swapped)` 도우미를 제공합니다. 서버가 `cpp-prelude.hpp`를 소스 앞에 붙여 컴파일하며 `#line`으로 학습 코드의 행 번호를 보존합니다. 이 도우미는 표준 C++ 라이브러리 함수가 아닙니다. 별도 개발 환경에서 사용하려면 이 헤더도 포함해야 합니다.

그림은 JSON으로 출력된 실제 변수 값만 사용합니다. NumPy 행렬 곱, 스택, 큐, Python·C++ 이진 탐색, C++ 버블 정렬, PyTorch의 실제 학습 손실 곡선을 지원합니다. 손실 곡선은 기록된 epoch·loss·파라미터·선택적 정확도를 표시하고 수치 표를 제공합니다. PyTorch의 연산 그래프, 트리·그래프 탐색, 범용 자동 코드 추적은 아직 구현하지 않았습니다. 실습 검사에서 호출한 함수의 기록은 그림에 추가하지 않습니다.

## 실행 제한

- **브라우저:** 별도 Web Worker. 최초 준비 90초, 실행 15초 제한, 출력 약 64KB 제한. 중지는 worker를 종료하고 다음 실행에서 새로 준비합니다. Pyodide는 jsDelivr에서 내려받습니다. CDN 차단·오프라인이면 실패할 수 있습니다. `input()`, 그래프 출력, 자유로운 패키지 설치는 지원 범위가 아닙니다.
- **Docker 공통:** 실행당 새 컨테이너, 15초 제한(컴파일 포함), 네트워크 차단, 읽기 전용 루트, 호스트 마운트·Docker 소켓 없음, 비 root, capabilities 제거, 권한 상승 금지, PID 64개, CPU 1개, 메모리·스왑 합계 768MiB, 파일 핸들 64개, 출력 스트림별 64KB 제한. 동시 실행 2개. 완료·오류·제한 초과 시 컨테이너 정리.
- **임시 공간:** Python은 32MiB + noexec, C++은 컴파일된 프로그램 실행을 위해 64MiB의 실행 가능한 임시 공간을 사용합니다. 모두 nosuid/nodev입니다.
- **중지:** 브라우저 Python은 즉시 worker 종료. C++·PyTorch는 브라우저 대기를 취소하며 서버 작업은 서버의 15초 제한 안에 종료됩니다.
- **서버:** 127.0.0.1에만 바인딩. Host/Origin/Fetch-Metadata 검사, 세션 토큰 사용. CORS 미허용. web/만 정적으로 제공합니다.

Docker는 호스트 커널을 공유합니다. 이 구성은 본인이 신뢰하는 학습 코드를 실행하는 개인용 MVP입니다. 공개 다중 사용자 서비스나 보안 경계가 강한 샌드박스로 간주하지 마세요. 포트 포워딩으로 외부 공개하지 마세요.

## 파일

- `web/lessons.js`, `extra-lessons.js`, `continuation-lessons.js`, `courses.js`: 수업·강좌·설명
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

## GitHub와 브랜치

공개 저장소: https://github.com/nayana224/badak-code-lab

로컬 `main`에는 기존 MVP를, `codex/expand-curriculum`에는 22개 수업 확장을 정리합니다. 최초 업로드는 [push 준비 안내](PUSH_PREPARATION.md)를 참고하세요. 로컬 실행과 GitHub 업로드, 공개 웹사이트 배포는 각각 별도 단계입니다. 이 저장소를 만든 것만으로 사이트가 인터넷에 호스팅되지는 않습니다.
