# 최초 GitHub push 준비

- 공개 저장소: https://github.com/nayana224/badak-code-lab
- 원격 이름: origin
- 로컬 기본 브랜치: main (기존 MVP)
- 로컬 작업 브랜치: codex/expand-curriculum (22개 수업 확장)
- 커밋 작성자 메일: GitHub noreply 주소 사용

이 문서는 업로드 준비 안내입니다. 원격에 코드가 올라가는 시점은 실제 push 실행 후입니다.

프로젝트 폴더에서 상태와 검사를 확인합니다.

```bash
git status
BADAK_DOCKER_TEST=1 python3 -m unittest discover -s tests -v
node tests/trace.test.js
```

GitHub Git 전송 인증이 준비된 환경에서 처음 업로드할 명령입니다.

```bash
git push -u origin main
git push -u origin codex/expand-curriculum
```

GitHub 웹/연결 도구 로그인과 터미널 Git 인증은 별개일 수 있습니다. 인증 오류가 나면 터미널의 GitHub 인증을 먼저 설정해야 합니다. 토큰·비밀번호를 소스나 이 저장소에 저장하지 마세요. 이 단계에서는 코드 공개용 라이선스를 임의로 추가하지 않았습니다.
