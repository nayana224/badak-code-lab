// Python next steps use only standard-library features available in browser Python.
export const pythonExpansion = [
 {
  id:'py-iterator',runtime:'python',group:'Python 문법',title:'반복자를 직접 만들고 소비하기',short:'iter · next · StopIteration',time:'18분',
  lead:'for가 원소를 하나씩 가져오는 과정을 직접 따라갑니다.',
  concept:'iter(반복 가능한 객체)는 반복자를 만듭니다. next(반복자)는 다음 값을 꺼내고 더 이상 없으면 StopIteration을 발생시킵니다. 원본 리스트는 그대로지만 같은 반복자는 소비한 위치에서 이어집니다.',
  visual:['[10, 20, 30] → iter','next → 10, 다음 next → 20','반복자는 현재 위치를 기억합니다'],
  predict:'같은 반복자에서 next를 두 번 호출하면 어떤 값이 나올까요?',
  code:'values = [10, 20, 30]\nitems = iter(values)\nfirst = next(items)\nsecond = next(items)\nremaining = list(items)\nprint(first, second, remaining)\n',
  solution:'values = [10, 20, 30, 40]\nitems = iter(values)\nfirst = next(items)\nsecond = next(items)\nremaining = list(items)\nprint(first, second, remaining)\n',referenceComplete:true,
  task:'values에 40을 추가해 first=10, second=20, remaining=[30, 40]이 되도록 하세요. values는 네 원소를 유지해야 합니다.',hint:'values = [10, 20, 30, 40]',
  check:'assert values == [10, 20, 30, 40], "원본 리스트의 원소를 확인하세요."\nassert first == 10 and second == 20 and remaining == [30, 40], "같은 반복자에서 차례로 소비하세요."\nassert list(items) == [], "이미 소비한 반복자는 끝에 도달해야 합니다."',
  explain:[['iter(values)','리스트처럼 반복 가능한 객체에서 원소를 순서대로 가져올 반복자를 만듭니다.'],['next(items)','반복자의 다음 원소를 하나 반환하고 위치를 진행합니다. 값이 없으면 StopIteration이 발생합니다.'],['list(items)','남은 원소를 끝까지 소비해 새 리스트로 모읍니다.']],
  takeaway:'반복자는 소비한 위치를 유지하며 원본 리스트를 자동으로 삭제하지 않습니다.'
 },
 {
  id:'py-context-manager',runtime:'python',group:'Python 문법',title:'with로 자원을 안전하게 정리하기',short:'with · StringIO · close',time:'18분',
  lead:'컴퓨터의 파일을 건드리지 않고 메모리의 텍스트를 열고 닫아 봅니다.',
  concept:'with는 블록을 벗어날 때 컨텍스트 관리자의 정리 동작을 호출합니다. StringIO는 파일처럼 읽고 쓸 수 있는 메모리 텍스트이며 이 예에서는 블록을 벗어나면 닫힙니다. 파일을 디스크에 저장하지 않습니다.',
  visual:['메모리 텍스트 열기','블록에서 읽기 → 블록 종료','블록을 나가면 닫힙니다'],
  predict:'StringIO의 with 블록을 벗어나면 stream.closed는 무엇일까요?',
  code:'from io import StringIO\n\nwith StringIO("apple\\npear\\n") as stream:\n    first = stream.readline().strip()\n    rest = stream.read().strip()\n\nclosed_after = stream.closed\nprint(first, rest, closed_after)\n',
  solution:'from io import StringIO\n\nwith StringIO("apple\\npear\\nmelon\\n") as stream:\n    first = stream.readline().strip()\n    rest = stream.read().strip()\n\nclosed_after = stream.closed\nprint(first, rest, closed_after)\n',referenceComplete:true,
  task:'메모리 텍스트의 마지막 줄에 melon을 더해 first가 apple, rest가 pear와 melon 두 줄이고 closed_after가 True가 되게 하세요.',hint:'StringIO("apple\\npear\\nmelon\\n")',
  check:'assert first == "apple" and rest == "pear\\nmelon", "줄바꿈과 읽은 내용을 확인하세요."\nassert closed_after is True and stream.closed, "with를 벗어난 뒤 스트림이 닫혀야 합니다."',
  explain:[['StringIO(text)','문자열을 파일처럼 읽고 쓸 수 있는 메모리 스트림을 만듭니다.'],['with ... as stream','블록이 끝나면 스트림을 정리합니다. 예외로 블록을 벗어나도 정리 동작이 호출됩니다.'],['readline()과 read()','readline은 다음 한 줄을, read는 현재 위치부터 남은 내용을 읽습니다.']],
  takeaway:'with의 정리 동작은 컨텍스트 관리자에 따라 정의되며 이 StringIO는 블록을 나갈 때 닫힙니다.'
 },
 {
  id:'py-type-hints',runtime:'python',group:'Python 문법',title:'타입 힌트로 입력과 반환값 설명하기',short:'type hint · list[int] · return',time:'18분',
  lead:'함수가 기대하는 데이터 모양을 코드에 표시하고 실제 검증과 구분합니다.',
  concept:'타입 힌트는 코드의 의도를 표현하고 타입 검사 도구에 정보를 제공합니다. 일반적인 Python 실행은 힌트와 다르다는 이유만으로 자동 오류를 발생시키지 않으므로 필요한 입력 검증은 직접 작성해야 합니다.',
  visual:['list[int] → int','숫자 목록 → 합계','힌트는 실행 중 자동 검사가 아닙니다'],
  predict:'타입 힌트가 있다는 이유만으로 Python이 모든 인자를 자동 검증할까요?',
  code:'def total(values: list[int]) -> int:\n    result = 0\n    for value in values:\n        result += value\n    return result\n\nanswer = total([2, 3])\nprint(answer)\n',
  solution:'def total(values: list[int]) -> int:\n    result = 0\n    for value in values:\n        result += value\n    return result\n\nanswer = total([2, 3, 4])\nprint(answer)\n',referenceComplete:true,
  task:'[2, 3, 4]를 넘겨 answer에 9를 저장하세요. total은 빈 목록과 음수도 계산해야 합니다.',hint:'answer = total([2, 3, 4])',
  check:'assert answer == 9 and total([]) == 0 and total([-2, 5]) == 3, "입력 목록의 합계를 반환하세요."',
  explain:[['values: list[int]','values가 정수 리스트일 것으로 기대한다는 힌트입니다.'],['-> int','호출자에게 반환 결과가 int일 것으로 기대한다는 힌트입니다.'],['타입 힌트와 검증','힌트 자체는 실행 중 입력을 자동 검사하지 않습니다. 필요한 조건은 코드로 검사합니다.']],
  takeaway:'타입 힌트는 소통과 정적 검사에 유용하지만 실행 중 입력 검증을 대신하지 않습니다.'
 },
 {
  id:'py-unit-tests',runtime:'python',group:'Python 문법',title:'여러 입력으로 함수 테스트하기',short:'assert · 경계값 · 테스트',time:'18분',
  lead:'하나의 출력에만 의존하지 않고 함수에 여러 입력을 넣어 동작을 점검합니다.',
  concept:'assert 조건은 조건이 거짓이면 AssertionError를 발생시킵니다. 일반 실행에서 빠른 학습 점검에 쓸 수 있지만 Python 최적화 옵션에서는 assert가 제거될 수 있으므로 중요한 입력 검증 수단으로 사용하지 않습니다.',
  visual:['일반 입력 → 결과 확인','빈 입력 · 경계 입력도 확인','테스트는 결함을 찾지만 완벽을 증명하지 않습니다'],
  predict:'함수의 한 입력만 테스트하면 모든 입력에서 정확하다고 확신할 수 있을까요?',
  code:'def count_positive(values):\n    count = 0\n    for value in values:\n        if value > 0:\n            count += 1\n    return count\n\nassert count_positive([1, -2, 3]) == 2\nassert count_positive([]) == 0\nprint("테스트 통과")\n',
  solution:'def count_positive(values):\n    count = 0\n    for value in values:\n        if value > 0:\n            count += 1\n    return count\n\nassert count_positive([1, -2, 3]) == 2\nassert count_positive([]) == 0\ntest_zero = count_positive([0, 2])\nassert test_zero == 1\nprint("테스트 통과")\n',referenceComplete:true,
  task:'0과 2가 든 목록의 양수 개수를 test_zero에 저장하고 1인지 assert로 확인하세요. 빈 목록과 음수도 처리해야 합니다.',hint:'test_zero = count_positive([0, 2])\nassert test_zero == 1',
  check:'assert test_zero == 1 and count_positive([]) == 0 and count_positive([-3, 0, 2, 7]) == 2 and count_positive([0]) == 0, "0과 음수, 빈 목록을 확인하세요."',
  explain:[['assert 조건','조건이 거짓이면 AssertionError가 발생해 테스트가 멈춥니다.'],['경계값 0','양수 조건이 > 0이면 0은 포함되지 않습니다.'],['빈 목록','원소가 없는 경우도 함수가 처리하는지 확인합니다.']],
  takeaway:'대표 입력뿐 아니라 빈 입력과 경계값을 확인하고 테스트의 범위를 명확히 합니다.'
 }
];

export const pythonExpansionQuizzes = {
 'py-iterator':{question:'items = iter([10, 20, 30]) 뒤 같은 items에 next를 두 번 호출하면?',options:['10 다음 20','10 다음 10','20 다음 30'],answer:0,explanation:'반복자는 값을 하나씩 소비하며 위치를 유지합니다.'},
 'py-context-manager':{question:'with StringIO(...) as stream 블록을 벗어난 뒤 stream.closed는?',options:['True','False'],answer:0,explanation:'이 StringIO는 with 블록을 나갈 때 닫힙니다.'},
 'py-type-hints':{question:'함수에 타입 힌트만 추가하면 일반적인 Python 실행이 모든 인자를 자동 검사하나요?',options:['아니요','예'],answer:0,explanation:'타입 힌트는 자동 실행 검증이 아닙니다. 필요한 검사는 직접 작성합니다.'},
 'py-unit-tests':{question:'한 가지 입력의 테스트가 통과하면 모든 입력이 정확하다고 할 수 있나요?',options:['아니요','예'],answer:0,explanation:'테스트하지 않은 입력에 결함이 있을 수 있습니다. 빈 입력과 경계값도 살펴봅니다.'}
};

export const pythonExpansionExamples = {
 'iter(values)':'values가 [10, 20]이면 iter(values)로 두 값을 차례로 제공하는 반복자를 만듭니다.',
 'next(items)':'같은 반복자에 next를 두 번 호출하면 첫 번째와 두 번째 값을 차례로 받습니다.',
 'list(items)':'반복자에 20과 30이 남았다면 list(items)는 [20, 30]을 만들며 두 값을 소비합니다.',
 'StringIO(text)':'StringIO("hi\\n")는 디스크 파일이 아닌 메모리에서 텍스트를 읽는 스트림입니다.',
 'with ... as stream':'with StringIO("hi") as stream: 블록을 벗어나면 이 스트림의 closed가 True가 됩니다.',
 'readline()과 read()':'"a\\nb\\n"에서 readline()은 첫 줄을, 이어지는 read()는 남은 "b\\n"을 반환합니다.',
 'values: list[int]':'def total(values: list[int])는 정수 리스트를 기대한다는 힌트입니다.',
 '-> int':'def total(...) -> int는 정수 반환을 기대한다는 힌트입니다.',
 '타입 힌트와 검증':'힌트를 붙여도 잘못된 입력을 막아야 한다면 조건문과 예외 처리를 직접 작성합니다.',
 'assert 조건':'assert 2 + 2 == 4는 통과하고 assert 2 + 2 == 5는 AssertionError를 발생시킵니다.',
 '경계값 0':'0 > 0은 False이므로 count_positive([0, 2])는 1입니다.',
 '빈 목록':'count_positive([])는 반복할 원소가 없어 0을 반환합니다.'
};
