# 바닥부터 · 코드 실습실

Python, C++, PyTorch를 한국어로 배우는 실습 사이트입니다. 설명과 예제 코드를 읽고 직접 입력해 실행하며, 일부 수업은 실제 실행 결과를 단계별로 시각화합니다. GPU는 필요하지 않습니다.

## 시작하기

**필요한 것:** Python 3.10 이상, 최신 웹 브라우저, Git. Python·NumPy의 첫 실행에는 인터넷이 필요합니다. C++과 PyTorch 수업에는 Docker도 필요합니다.

터미널에서 다음 명령을 실행합니다.

```bash
git clone https://github.com/nayana224/badak-code-lab.git
cd badak-code-lab
python3 server.py
```

Windows에서 `python3`이 작동하지 않으면 `py -3 server.py`를 사용하세요. 터미널을 켜 둔 상태에서 브라우저로 **[http://127.0.0.1:8000](http://127.0.0.1:8000)** 을 엽니다. 서버를 중지하려면 터미널에서 `Ctrl+C`를 누릅니다. 실행할 때 npm 설치는 필요하지 않습니다.

Python·NumPy 수업은 브라우저에서 실행합니다. C++은 GCC 13 기반 C++20, PyTorch는 CPU로 실행합니다. C++과 PyTorch에는 Docker Desktop 또는 Docker Engine 설치가 필요합니다.

사이트에서 **실행 환경 → C++ · PyTorch 모두 준비**를 누르면 Docker 상태를 확인하고 필요한 이미지를 차례로 준비합니다. 지원하는 환경에서는 Docker Desktop 시작도 요청합니다. 처음에는 이미지 다운로드에 시간과 인터넷이 필요합니다. 자동 시작이 지원되지 않거나 권한이 부족하면 화면에 표시된 안내에 따라 Docker를 직접 시작하세요.

개별 이미지 준비와 이 사이트가 시작한 준비 작업의 중지도 가능합니다. 다른 프로그램의 작업에 영향을 줄 수 있어 Docker 전체 종료 버튼은 제공하지 않습니다. 이전 버전에서 업데이트한 경우 서버를 다시 시작해야 새 기능이 적용됩니다. 코드와 진도는 현재 브라우저에 저장됩니다.

> 이 주소는 서버를 실행한 **본인 컴퓨터**에서만 열립니다. GitHub 저장소를 만든 것만으로 공개 웹사이트가 배포되는 것은 아닙니다. 이 프로젝트는 개인 로컬 학습용이므로 인터넷에 그대로 공개하지 마세요.

## 자세히 보기

- [문제 해결: 사이트 연결, Docker, Python 실행](docs/TROUBLESHOOTING.md)
- [전체 학습 목차](CURRICULUM.md)
- [학습 확장 계획: Attention과 Transformer](docs/ROADMAP.md)
- [사용 방법, 편집기, 시각화와 실행 제한](docs/USAGE.md)
- [개발 및 검사 방법](docs/DEVELOPMENT.md)
- [확인된 동작과 한계](VERIFICATION.md)
- [오픈소스 의존성 고지](THIRD_PARTY_NOTICES.md)
