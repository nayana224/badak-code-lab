# 바닥부터 · 코드 실습실

Python, C++, PyTorch를 한국어로 배우는 실습 사이트입니다. 설명과 예제 코드를 읽고 직접 입력해 실행하며, 일부 수업은 실제 실행 결과를 단계별로 시각화합니다. GPU는 필요하지 않습니다.

## 시작하기

**필요한 것:** Python 3.10 이상, 최신 웹 브라우저, Git. Python·NumPy의 첫 실행에는 인터넷이 필요합니다. C++과 PyTorch 수업에는 Docker도 필요합니다.

터미널에서 다음 명령을 실행합니다.

```bash
git clone --branch codex/expand-curriculum https://github.com/nayana224/badak-code-lab.git
cd badak-code-lab
python3 server.py
```

Windows에서 `python3`이 작동하지 않으면 `py -3 server.py`를 사용하세요. 터미널을 켜 둔 상태에서 브라우저로 **[http://127.0.0.1:8000](http://127.0.0.1:8000)** 을 엽니다. 서버를 중지하려면 터미널에서 `Ctrl+C`를 누릅니다. 실행할 때 npm 설치는 필요하지 않습니다.

Python·NumPy 수업은 브라우저에서 실행합니다. C++과 PyTorch를 실행하려면 Docker Desktop 또는 Docker Engine을 실행한 후 **프로젝트 폴더의 별도 터미널**에서 필요한 이미지를 만듭니다.

```bash
# C++ 수업
docker build -f Dockerfile.cpp -t badak-cpp:13.5.0 .

# PyTorch 수업 (CPU)
docker build -t badak-torch:2.8.0 .
```

이미지를 만든 뒤 사이트에서 **실행 환경 → 환경 다시 확인**을 누르세요. 처음 빌드할 때 인터넷 연결과 다운로드 시간이 필요합니다. 코드와 진도는 현재 브라우저에 저장됩니다.

> 이 주소는 서버를 실행한 **본인 컴퓨터**에서만 열립니다. GitHub 저장소를 만든 것만으로 공개 웹사이트가 배포되는 것은 아닙니다. 이 프로젝트는 개인 로컬 학습용이므로 인터넷에 그대로 공개하지 마세요.

## 자세히 보기

- [문제 해결: 사이트 연결, Docker, Python 실행](docs/TROUBLESHOOTING.md)
- [전체 학습 목차](CURRICULUM.md)
- [사용 방법, 편집기, 시각화와 실행 제한](docs/USAGE.md)
- [개발 및 검사 방법](docs/DEVELOPMENT.md)
- [확인된 동작과 한계](VERIFICATION.md)
- [오픈소스 의존성 고지](THIRD_PARTY_NOTICES.md)
