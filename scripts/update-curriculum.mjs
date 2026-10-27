// Regenerate the public lesson table from the catalog, preserving one source of truth.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { lessons } from '../web/lessons.js';
import { lessonTopic } from '../web/courses.js';

let text = '# 전체 학습 목차\n\n위쪽 참고 코드를 읽고, 아래 빈 입력창에 직접 작성해 실행하고 실습을 확인합니다. 모든 수업은 CPU에서 실행합니다. 코드와 진도는 브라우저에 저장됩니다.\n\n';
for (const [name, filter] of [
  ['Python', lesson => !['cpp', 'torch'].includes(lesson.runtime)],
  ['C++', lesson => lesson.runtime === 'cpp'],
  ['PyTorch', lesson => lesson.runtime === 'torch']
]) {
  const items = lessons.filter(filter);
  text += `## ${name} · ${items.length}개 수업\n\n| 순서 | 주제 | 수업 | 핵심 내용 |\n|---|---|---|---|\n`;
  items.forEach((lesson, index) => {
    text += `| ${String(index + 1).padStart(2, '0')} | ${lessonTopic(lesson)} | ${lesson.title} | ${lesson.short} |\n`;
  });
  text += '\n';
}
text += '## 수식과 실행 시각화\n\n내적, 수치 미분, 연쇄 법칙, 수동 역전파, 행렬 곱, 자동 미분과 Attention은 수식과 코드의 연결을 설명합니다. 수식의 계산 예시는 고정된 설명입니다.\n\n행렬·스택·큐·이진 탐색·버블 정렬·학습 손실·Attention의 시각화는 기록 도우미로 저장한 **실제 실행 값**을 보여 줍니다. 모든 수업에 시각화가 있는 것은 아닙니다. 기록 호출을 지우면 그림이 생성되지 않고 코드를 바꿨다면 다시 실행해야 합니다. 범용 자동 디버거는 아닙니다.\n\n앞으로 만들 주제는 [학습 확장 계획](docs/ROADMAP.md)을 참고하세요.\n';
writeFileSync(fileURLToPath(new URL('../CURRICULUM.md', import.meta.url)), text);
