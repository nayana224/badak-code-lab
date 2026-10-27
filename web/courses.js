export const courses = [
 {id:'python',name:'Python',description:'기초·함수·클래스·자료구조·탐색',location:'내 브라우저 · 노트북 CPU',detail:'설치 없이 Python·NumPy를 브라우저에서 실행합니다. 작은 행렬·자료구조 실습에 GPU는 필요하지 않습니다.'},
 {id:'cpp',name:'C++',description:'기초·참조·클래스·정렬·탐색',location:'이 컴퓨터의 실행 서버 · Docker CPU',detail:'코드를 로컬 Docker의 C++17 컴파일러로 컴파일·실행합니다. 현재는 클라우드 서버가 연결되어 있지 않습니다. GPU는 필요하지 않습니다.'},
 {id:'torch',name:'PyTorch',description:'텐서·자동 미분·학습 루프·신경망',location:'이 컴퓨터의 실행 서버 · Docker CPU',detail:'실제 PyTorch CPU에서 실행합니다. GPU를 사용하지 않습니다. 클라우드·GPU 실행은 아직 연결되어 있지 않습니다.'}
];
export const courseId = lesson => ['cpp','torch'].includes(lesson.runtime)?lesson.runtime:'python';
// Keep the original lesson IDs and sequence so existing drafts and progress remain valid.
export function lessonTopic(lesson) {
 if (['stack','py-queue','py-linked-list'].includes(lesson.id)) return '자료구조';
 if (['py-linear-search','py-search','py-selection-sort','cpp-search','cpp-sort'].includes(lesson.id)) return '알고리즘';
 if (['math-matrix-basics','math-dot','math-derivative','math-chain','math-manual-backward','math-tiny-autograd','shape','broadcast','matrix-steps'].includes(lesson.id)) return '수학 · 행렬과 NumPy';
 if (lesson.runtime === 'torch') return 'PyTorch · '+(lesson.id === 'tensor' ? '텐서' : ['autograd','torch-gradients'].includes(lesson.id) ? '미분과 기울기' : '모델 학습');
 return lesson.runtime === 'cpp' ? 'C++ 문법' : 'Python 문법';
}
export function explanations(lesson) {
 if(lesson.explain) return lesson.explain;
 if(lesson.runtime==='torch') return [['torch.tensor(data)','Python 데이터를 텐서로 만듭니다. shape는 축의 크기이고 dtype은 원소 자료형입니다.'],['requires_grad=True','이 텐서에 대한 연산을 자동 미분으로 추적합니다. 부동소수점 등 미분 가능한 자료형이 필요합니다.'],['loss.backward()','.grad에 손실의 기울기를 누적합니다. 가중치를 갱신하는 동작은 별도로 작성합니다.'],['torch.no_grad()','이 블록의 연산을 자동 미분 그래프에 기록하지 않습니다. 가중치 갱신에 사용합니다.']];
 if(lesson.runtime==='numpy') return [['np.array(data)','중첩 리스트 등으로 NumPy 배열을 만듭니다. 배열의 각 축 크기는 .shape로 확인합니다.'],['@ 와 *','@는 행렬 곱, *는 원소별 곱입니다. 연산 전에 두 배열의 shape를 확인하세요.'],['mean(axis=0)','행 방향으로 모아 각 열의 평균을 계산합니다. keepdims=True이면 줄어든 축을 크기 1로 유지합니다.'],['reshape(...)','원소 수를 유지하며 배열의 모양을 바꿉니다. 값의 순서와 전체 원소 수를 확인하세요.']];
 return [['list.append(value)','리스트 끝에 값을 하나 추가합니다. 원래 리스트가 바뀌고 반환값은 None입니다.'],['dict[key]','키의 이름으로 값을 읽거나 저장합니다. 없는 키를 읽으면 KeyError입니다.'],['sum(values) / len(values)','합계를 원소 개수로 나누어 평균을 만듭니다. 빈 리스트이면 0으로 나누지 않도록 처리해야 합니다.']];
}
