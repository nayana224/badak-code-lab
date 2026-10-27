# GitHub 작업 안내

공개 저장소: https://github.com/nayana224/badak-code-lab

현재 기본 브랜치는 `main`입니다. 최신 버전을 내려받고 실행하려면 [시작하기](README.md#시작하기)를 참고하세요.

변경 사항을 커밋하기 전에 상태와 검사를 확인합니다.

```bash
git status
python3 -m unittest discover -s tests -v
node --test tests/setup-ui.test.js tests/prerequisites.test.js tests/cpp-reference.test.js
```

Docker 이미지가 준비되어 있다면 `BADAK_DOCKER_TEST=1 python3 -m unittest discover -s tests -v`로 실제 컴파일·실행을 포함한 검사를 수행합니다.

GitHub에 코드를 올리는 것과 공개 웹사이트를 배포하는 것은 별개입니다. 토큰·비밀번호를 저장소에 넣지 마세요.
