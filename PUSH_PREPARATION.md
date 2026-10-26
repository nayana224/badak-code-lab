# GitHub 브랜치와 전송

- 공개 저장소: https://github.com/nayana224/badak-code-lab
- 원격 이름: origin
- main: 기존 MVP의 기준 버전
- codex/expand-curriculum: 22개 수업과 문법 강조 편집기를 포함한 개발 버전
- 커밋 작성자 메일: GitHub noreply 주소 사용

개발 버전을 새 컴퓨터에서 가져오는 명령입니다.

```bash
git clone --branch codex/expand-curriculum https://github.com/nayana224/badak-code-lab.git
cd badak-code-lab
python3 server.py
```

프로젝트 폴더에서 변경 내용과 검사를 확인합니다. 서버 실행에는 npm 설치가 필요 없고, 편집기를 재빌드·검사하는 개발자만 npm ci를 실행하면 됩니다.

```bash
git status
npm ci
npm run build:editor
npm run test:editor
BADAK_DOCKER_TEST=1 python3 -m unittest discover -s tests -v
node tests/trace.test.js
```

최초 전송 명령은 다음과 같습니다.

```bash
git push -u origin main codex/expand-curriculum
```

이후 개발 브랜치에서 커밋한 변경은 git push로 전송합니다. main에 합치는 것은 별도의 병합 단계입니다. GitHub에 코드를 올리는 것만으로 웹사이트가 인터넷에 배포되지는 않습니다.

GitHub 웹/연결 도구 로그인과 터미널 Git 인증은 별개일 수 있습니다. 토큰·비밀번호를 소스나 이 저장소에 저장하지 마세요. 의존성의 라이선스는 THIRD_PARTY_NOTICES.md에 포함하며, 프로젝트 자체의 공개용 라이선스를 임의로 추가하지 않았습니다.
