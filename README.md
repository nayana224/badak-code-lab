# 바닥부터 · 코드 실습실

Python, C++, PyTorch를 한국어로 배우는 실습 사이트입니다. 개념과 예제 코드를 읽고 직접 입력해 실행할 수 있습니다. 행렬, 자료구조, Attention 등 일부 수업에서는 실제 실행 결과를 시각화합니다. 작은 실습을 CPU로 실행하므로 GPU가 필요하지 않습니다.

## 처음 시작하기

### 1. 필요한 프로그램 준비

- **Python 3.10 이상:** [Python 다운로드](https://www.python.org/downloads/)
- **Git:** [Git 다운로드](https://git-scm.com/downloads)
- **웹 브라우저:** 최신 Chrome, Edge, Firefox 등
- **Docker Desktop 또는 Docker Engine:** C++과 PyTorch 수업을 실행할 때 필요합니다. Python·NumPy 수업부터 시작한다면 나중에 설치해도 됩니다. [Docker 설치 안내](https://docs.docker.com/get-docker/)

프로그램 설치 후 새 터미널을 열어 아래 명령으로 확인합니다. Windows는 **PowerShell**, macOS는 **터미널**, Linux는 사용하는 터미널을 열면 됩니다.

```bash
git --version
```

```bash
# macOS / Linux
python3 --version
```

```powershell
# Windows PowerShell
py -3 --version
```

Windows에서 Python 설치 시 PATH 추가 옵션이 나타나면 선택하세요. `py`를 찾지 못하면 Python 설치 상태를 확인하고 `python --version`도 시도해 보세요. Python·NumPy를 처음 실행하거나 Docker 이미지를 준비할 때는 인터넷이 필요합니다.

### 2. 프로젝트 내려받기

원하는 작업 폴더에서 터미널을 열고 다음 명령을 입력합니다.

```bash
git clone https://github.com/nayana224/badak-code-lab.git
cd badak-code-lab
```

`badak-code-lab` 폴더가 이미 있다면 다시 복제하지 말고 그 폴더로 이동하세요. 인터넷에서 ZIP으로 받은 경우에도 압축을 풀고 `server.py`가 있는 폴더에서 다음 단계를 진행하면 됩니다.

### 3. 사이트 실행하기

```bash
# macOS / Linux
python3 server.py
```

```powershell
# Windows PowerShell
py -3 server.py
```

터미널에 `바닥부터 실습실: http://127.0.0.1:8000`이 표시되면 **터미널을 켜 둔 채**, 같은 컴퓨터의 브라우저에서 [http://127.0.0.1:8000](http://127.0.0.1:8000)을 엽니다. 종료할 때는 서버가 실행 중인 터미널에서 `Ctrl+C`를 누릅니다. 일반적인 사이트 실행에는 npm 설치가 필요하지 않습니다.

### 4. C++과 PyTorch 준비하기

1. Docker Desktop 또는 Docker Engine을 설치합니다.
2. 사이트 상단의 **실행 환경**을 누릅니다.
3. **C++ · PyTorch 모두 준비**를 누르고 준비가 완료될 때까지 기다립니다. 두 환경이 이미 준비되어 있으면 버튼은 비활성화되고 상태에 **준비 완료**가 표시됩니다.
4. Docker가 꺼져 있다면 지원되는 환경에서 시작을 요청합니다. 자동 시작에 실패하면 Docker를 직접 실행하고 **상태 다시 확인**을 누르세요.

이미지를 처음 준비할 때는 다운로드 시간과 저장 공간이 필요합니다. **준비 작업 중지**는 이 사이트가 시작한 준비 작업을 중지하며, Docker 전체를 종료하지는 않습니다. C++은 GCC 13 기반 C++20, PyTorch는 CPU를 사용합니다.

### 5. 첫 수업 실행하기

1. 사이트에서 **Python**, **C++**, **PyTorch** 중 하나를 선택하고 원하는 수업을 엽니다.
2. 설명과 위쪽의 **참고용 완성 코드**를 읽습니다.
3. 아래쪽 입력창에 코드를 직접 입력하고 **코드 실행**을 누릅니다. 아래 입력창의 코드가 실제 실행됩니다.
4. 과제를 완성한 뒤 **실습 확인하기**를 누릅니다. 시각화가 있는 수업은 실행 후 **시각화 보기**에서 실제 기록을 확인할 수 있습니다.

작성 코드와 진도는 해당 브라우저에 저장됩니다. 다른 컴퓨터나 브라우저, 또는 다른 포트와는 자동으로 동기화되지 않습니다. 이 실습 확인 기능은 학습용이며 모든 가능한 정답을 완전하게 판정하는 채점기는 아닙니다.

## 다른 컴퓨터에서 이어서 개발하기

노트북에 프로젝트를 복제한 다음 Codex나 사용하는 편집기에서 `badak-code-lab` 폴더를 열면 됩니다. 저장소에는 코드와 문서가 포함되며, **Codex 대화와 브라우저에 저장된 학습 진도는 GitHub에 자동으로 올라가지 않습니다.**

이미 복제한 폴더에서 GitHub의 최신 변경을 가져오려면, 먼저 `git status`로 작업 중인 변경 사항을 확인한 뒤 다음을 실행합니다.

```bash
git pull origin main
```

작업 중인 파일이 있으면 먼저 보관하거나 커밋하세요. 두 컴퓨터에서 같은 파일을 수정하면 변경 사항을 합쳐야 할 수 있습니다.

## 연결이 안 될 때

- **사이트가 열리지 않음:** `server.py`가 있는 폴더에서 서버를 실행했는지, 서버 터미널이 켜져 있는지 확인하세요. 컴퓨터를 재시작했다면 서버를 다시 실행해야 합니다.
- **포트 8000이 이미 사용 중:** `python3 server.py --port 8001`(Windows: `py -3 server.py --port 8001`)로 실행하고 `http://127.0.0.1:8001`을 엽니다. 포트가 달라지면 기존 브라우저 진도가 보이지 않을 수 있습니다.
- **Python·NumPy 준비 실패:** 처음 실행할 때 인터넷 연결과 다운로드가 필요합니다. 연결을 확인하고 다시 실행하세요.
- **C++·PyTorch 준비 실패:** Docker가 설치·실행 중인지 확인하고 **실행 환경 → 상태 다시 확인**을 누릅니다. 자세한 오류는 **준비 진행 내용 보기**에서 확인할 수 있습니다.

`127.0.0.1`은 서버를 실행한 **본인 컴퓨터에서만** 열리는 주소입니다. GitHub에 코드를 올렸다고 공개 웹사이트가 자동으로 만들어지는 것은 아닙니다. 현재 실행 환경은 개인 로컬 학습용이므로 그대로 인터넷에 공개하지 마세요.

## 더 알아보기

- [문제 해결과 직접 Docker 이미지 빌드](docs/TROUBLESHOOTING.md)
- [전체 학습 목차](CURRICULUM.md)
- [학습 확장 계획: Attention과 Transformer](docs/ROADMAP.md)
- [사용 방법, 편집기와 실행 제한](docs/USAGE.md)
- [개발 및 검사 방법](docs/DEVELOPMENT.md)
- [확인된 동작과 한계](VERIFICATION.md)
- [오픈소스 의존성 고지](THIRD_PARTY_NOTICES.md)
