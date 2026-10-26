export const continuationLessons = [
  {
    "id": "py-flow",
    "chapter": "00",
    "group": "Python 기초",
    "runtime": "python",
    "title": "조건과 반복으로 데이터를 고르기",
    "short": "변수 · for · if",
    "time": "20분",
    "lead": "값을 저장하고, 하나씩 살펴보고, 조건에 맞는 값만 모읍니다. 알고리즘을 쓰기 위한 가장 작은 도구입니다.",
    "concept": "변수는 값에 붙인 이름입니다. for는 원소를 하나씩 읽고, if는 조건이 참인 경우에만 안쪽 코드를 실행합니다. Python에서는 들여쓰기가 코드 블록을 결정합니다.",
    "visual": [
      "입력 → 조건 → 결과",
      "score >= threshold",
      "조건을 통과한 값만 새 리스트에 쌓습니다"
    ],
    "predict": "점수가 [35, 62, 78, 91]이고 기준이 60이면 어떤 값이 남을까요? >= 대신 >를 쓰면 경계 값은 어떻게 될까요?",
    "code": "scores = [35, 62, 78, 91]\nthreshold = 60\npassed = []\nfor score in scores:\n    if score >= threshold:\n        passed.append(score)\nprint(passed)\n",
    "task": "기준 threshold를 80으로 바꾸고 passed에 [91]만 남겨 보세요. 다음에는 점수 목록에 80도 넣어 경계를 확인하세요.",
    "hint": "threshold = 80",
    "referenceComplete": true,
    "solution": "scores = [35, 62, 78, 91]\nthreshold = 80\npassed = []\nfor score in scores:\n    if score >= threshold:\n        passed.append(score)\nprint(passed)\n",
    "explain": [
      [
        "for score in scores",
        "리스트에서 현재 원소를 score에 넣고 들여쓴 블록을 반복합니다."
      ],
      [
        "if score >= threshold",
        "비교 결과가 True일 때만 조건 안으로 들어갑니다."
      ],
      [
        "passed.append(score)",
        "조건을 만족한 값을 결과 리스트 끝에 추가합니다. 조건 블록 안의 들여쓰기를 확인하세요."
      ]
    ],
    "trace": false,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert threshold == 80 and passed == [91], \"예제 점수에서 기준을 80으로 바꾸세요.\""
  },
  {
    "id": "py-functions",
    "chapter": "00",
    "group": "함수와 클래스",
    "runtime": "python",
    "title": "입력과 반환값으로 함수 나누기",
    "short": "def · 인자 · return",
    "time": "20분",
    "lead": "같은 계산을 여러 데이터에 적용하려면 함수를 만듭니다. 출력하는 것과 값을 반환하는 것을 구분해 봅니다.",
    "concept": "함수는 입력을 받아 결과를 return으로 전달합니다. 함수 안의 지역 변수는 호출할 때마다 준비됩니다. print()로 화면에 표시하는 것만으로는 계산 결과를 반환하지 않습니다.",
    "visual": [
      "values → mean(values)",
      "return total / count",
      "함수의 반환값을 다음 계산에 사용할 수 있습니다"
    ],
    "predict": "return을 print로 바꾸면 result에는 무엇이 저장될까요? 빈 리스트의 평균은 어떻게 처리해야 할까요?",
    "code": "def mean(values):\n    if not values:\n        raise ValueError(\"빈 리스트의 평균은 계산할 수 없습니다.\")\n    total = sum(values)\n    count = len(values)\n    return total / count\n\nresult = mean([2, 4, 6])\nprint(result)\n",
    "task": "mean에 [10, 20, 30, 40]을 전달해 result=25를 만드세요. 함수는 다른 리스트에도 작동해야 합니다.",
    "hint": "result = mean([10, 20, 30, 40])",
    "referenceComplete": true,
    "solution": "def mean(values):\n    if not values:\n        raise ValueError(\"빈 리스트의 평균은 계산할 수 없습니다.\")\n    total = sum(values)\n    count = len(values)\n    return total / count\n\nresult = mean([10, 20, 30, 40])\nprint(result)\n",
    "explain": [
      [
        "def mean(values)",
        "values라는 인자 이름으로 호출 시 전달받은 데이터를 사용합니다."
      ],
      [
        "return과 print",
        "return은 호출한 곳에 값을 돌려주고 함수 실행을 끝냅니다. print는 표준 출력에 텍스트를 씁니다."
      ],
      [
        "raise ValueError(...)",
        "계산할 수 없는 입력을 조용히 잘못 처리하는 대신 이유가 담긴 오류를 발생시킵니다."
      ]
    ],
    "trace": false,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert result == 25, \"새 리스트의 평균을 result에 저장하세요.\"\nassert mean([1, 3]) == 2 and mean([-2, 2]) == 0, \"입력에 따라 평균을 계산해야 합니다.\"\ntry:\n    mean([])\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError(\"빈 리스트에는 ValueError를 발생시키세요.\")"
  },
  {
    "id": "py-classes",
    "chapter": "00",
    "group": "함수와 클래스",
    "runtime": "python",
    "title": "객체마다 상태를 따로 보관하기",
    "short": "class · self · __init__",
    "time": "20분",
    "lead": "같은 설계로 여러 객체를 만들어도 각자의 상태는 달라야 합니다. 간단한 카운터 두 개로 확인합니다.",
    "concept": "__init__는 객체의 초기 상태를 만듭니다. self.value는 그 객체에 속한 값입니다. 메서드를 호출하면 self에는 해당 객체가 전달됩니다.",
    "visual": [
      "Counter A · Counter B",
      "서로 다른 value",
      "설계는 공유하고, 객체의 상태는 따로 보관합니다"
    ],
    "predict": "a.add(4)를 호출하면 b.value도 바뀔까요? self.value 대신 클래스 바깥의 전역 변수를 쓰면 어떤 문제가 생길까요?",
    "code": "class Counter:\n    def __init__(self, start=0):\n        self.value = start\n\n    def add(self, amount=1):\n        self.value += amount\n        return self.value\n\na = Counter()\nb = Counter(10)\na.add()\na.add(4)\nprint(a.value, b.value)\n",
    "task": "a에 2를 한 번 더 더해 7을 만드세요. b는 10으로 유지되어야 하고 add는 갱신된 값을 반환해야 합니다.",
    "hint": "a.add(2)\nprint(a.value, b.value)",
    "referenceComplete": true,
    "solution": "class Counter:\n    def __init__(self, start=0):\n        self.value = start\n\n    def add(self, amount=1):\n        self.value += amount\n        return self.value\n\na = Counter()\nb = Counter(10)\na.add()\na.add(4)\nprint(a.value, b.value)\n\na.add(2)\nprint(a.value, b.value)\n",
    "explain": [
      [
        "Counter(start=0)",
        "설계에서 새로운 객체를 만듭니다. start를 생략하면 기본값 0을 사용합니다."
      ],
      [
        "__init__와 self",
        "self는 현재 객체입니다. self.value에 초기값을 저장합니다."
      ],
      [
        "add(self, amount=1)",
        "이 객체의 값만 변경하는 메서드입니다. 기본 amount는 1이고 명시적으로 다른 값을 전달할 수 있습니다."
      ]
    ],
    "trace": false,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert a.value == 7 and b.value == 10, \"a에만 2를 더하세요.\"\nprobe = Counter(3)\nassert probe.add(2) == 5 and probe.value == 5, \"add는 객체의 상태와 반환값을 함께 갱신해야 합니다.\""
  },
  {
    "id": "py-queue",
    "chapter": "00",
    "group": "자료구조",
    "runtime": "python",
    "title": "먼저 들어온 값부터 꺼내는 큐",
    "short": "deque · enqueue/dequeue",
    "time": "20분",
    "lead": "스택의 반대 순서가 필요한 경우가 있습니다. 대기열과 너비 우선 탐색의 출발점인 큐를 만들어 봅니다.",
    "concept": "큐는 FIFO입니다. collections.deque의 append로 뒤에 넣고 popleft로 앞에서 꺼냅니다. 리스트의 pop(0)과 달리 앞에서 꺼내는 동작을 위해 원소 전체를 이동하지 않습니다.",
    "visual": [
      "FRONT [10, 20, 30] REAR",
      "10 → 20 → 30",
      "먼저 들어온 원소가 먼저 나갑니다"
    ],
    "predict": "10, 20, 30을 넣고 두 번 꺼내면 무엇이 남을까요? popleft 대신 pop을 쓰면 어떤 자료구조처럼 동작할까요?",
    "code": "from collections import deque\nqueue = deque()\nfor value in [10, 20, 30]:\n    queue.append(value)\n    record(\"queue\", values=list(queue), action=\"enqueue\", value=value)\nfirst = queue.popleft()\nrecord(\"queue\", values=list(queue), action=\"dequeue\", value=first)\nprint(first, list(queue))\n",
    "task": "두 번째 원소를 꺼내 second에 저장하고 기록을 남기세요. first=10, second=20이고 큐에는 [30]이 남아야 합니다.",
    "hint": "second = queue.popleft()\nrecord(\"queue\", values=list(queue), action=\"dequeue\", value=second)\nprint(second, list(queue))",
    "referenceComplete": true,
    "solution": "from collections import deque\nqueue = deque()\nfor value in [10, 20, 30]:\n    queue.append(value)\n    record(\"queue\", values=list(queue), action=\"enqueue\", value=value)\nfirst = queue.popleft()\nrecord(\"queue\", values=list(queue), action=\"dequeue\", value=first)\nprint(first, list(queue))\n\nsecond = queue.popleft()\nrecord(\"queue\", values=list(queue), action=\"dequeue\", value=second)\nprint(second, list(queue))\n",
    "explain": [
      [
        "deque()",
        "양쪽 끝에서 넣고 꺼내기 좋은 표준 라이브러리 자료구조입니다."
      ],
      [
        "append와 popleft",
        "append는 오른쪽 끝에 추가하고 popleft는 왼쪽 끝에서 꺼내 반환합니다. 빈 큐에서 꺼내면 IndexError입니다."
      ],
      [
        "record(\"queue\", ...)",
        "현재 큐를 리스트로 복사해 실제 값을 기록합니다. 그림의 FRONT가 다음에 꺼낼 값입니다."
      ]
    ],
    "trace": true,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert first == 10 and second == 20 and list(queue) == [30], \"popleft()로 앞에서 꺼내세요.\""
  },
  {
    "id": "py-search",
    "chapter": "00",
    "group": "알고리즘",
    "runtime": "python",
    "title": "Python으로 이진 탐색 구현하기",
    "short": "이진 탐색 · 경계 조건",
    "time": "20분",
    "lead": "반복문의 종료 조건과 반환값을 함께 다룹니다. 실제 left, right, mid 기록으로 탐색 범위를 확인합니다.",
    "concept": "정렬된 배열의 가운데 값을 비교하고 필요 없는 절반을 버립니다. 목표가 없으면 left가 right보다 커지고 -1을 반환합니다.",
    "visual": [
      "정렬된 배열 → 절반 선택",
      "left <= right",
      "이미 비교한 mid를 다음 범위에서 제외합니다"
    ],
    "predict": "mid+1 대신 mid를 left에 넣으면 언제 반복이 끝나지 않을까요? 빈 배열이면 right는 얼마일까요?",
    "code": "def binary_search(values, target):\n    left, right = 0, len(values) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        record(\"search\", values=values.copy(), left=left, right=right, mid=mid, target=target)\n        if values[mid] == target:\n            return mid\n        if values[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nvalues = [2, 4, 6, 8, 10, 12, 14]\ntarget = 12\nfound = binary_search(values, target)\nprint(found)\n",
    "task": "target을 10으로 바꾸고 found=4를 확인하세요. 작성한 함수는 빈 배열, 없는 값, 양 끝의 값도 처리해야 합니다.",
    "hint": "target = 10",
    "referenceComplete": true,
    "solution": "def binary_search(values, target):\n    left, right = 0, len(values) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        record(\"search\", values=values.copy(), left=left, right=right, mid=mid, target=target)\n        if values[mid] == target:\n            return mid\n        if values[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nvalues = [2, 4, 6, 8, 10, 12, 14]\ntarget = 10\nfound = binary_search(values, target)\nprint(found)\n",
    "explain": [
      [
        "// 2",
        "정수 나눗셈으로 가운데 인덱스를 계산합니다."
      ],
      [
        "return -1",
        "반복이 끝날 때까지 찾지 못했다는 결과를 호출한 곳에 전달합니다."
      ],
      [
        "record(\"search\", ...)",
        "비교 직전의 배열과 경계를 기록합니다. 실습 검사의 추가 호출은 그림에 기록하지 않습니다."
      ]
    ],
    "trace": true,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert target == 10 and found == 4, \"목표를 10으로 바꾸세요.\"\nassert binary_search([], 1) == -1 and binary_search(values, 9) == -1, \"없는 값은 -1을 반환하세요.\"\nassert binary_search(values, 2) == 0 and binary_search(values, 14) == 6, \"양 끝 인덱스를 확인하세요.\""
  },
  {
    "id": "cpp-io",
    "chapter": "00",
    "group": "C++ 기초",
    "runtime": "cpp",
    "title": "변수와 출력으로 첫 C++ 프로그램",
    "short": "변수 · main · cout",
    "time": "15분",
    "lead": "C++ 프로그램의 시작점과 출력부터 살펴봅니다. 소스를 실제 컴파일해서 실행합니다.",
    "concept": "main은 실행의 시작점입니다. 변수 선언에 자료형을 적고 문장 끝에 세미콜론을 붙입니다. std::cout은 값을 표준 출력으로 보냅니다.",
    "visual": [
      "소스 → 컴파일 → 실행",
      "int main()",
      "출력은 실제 프로그램의 표준 출력입니다"
    ],
    "predict": "정수 3 / 5와 실수 3 / 5.0은 결과가 같을까요? 세미콜론을 빼면 어느 단계에서 오류가 날까요?",
    "code": "#include <iostream>\n#include <string>\nint main() {\n    std::string name = \"바닥부터\";\n    int solved = 3;\n    std::cout << name << \": \" << solved << \" / 5\\n\";\n    return 0;\n}\n",
    "task": "solved를 4로 바꾸고 정확히 바닥부터: 4 / 5를 출력하세요. 이 실습실은 대화형 입력 대신 코드 안의 값을 바꿔 실행합니다.",
    "hint": "int solved = 4;",
    "referenceComplete": true,
    "solution": "#include <iostream>\n#include <string>\nint main() {\n    std::string name = \"바닥부터\";\n    int solved = 4;\n    std::cout << name << \": \" << solved << \" / 5\\n\";\n    return 0;\n}\n",
    "explain": [
      [
        "#include <iostream>",
        "입출력에 필요한 선언을 가져옵니다. 문자열은 <string>을 포함합니다."
      ],
      [
        "main과 return 0",
        "main은 프로그램 시작점입니다. 0 반환은 정상 종료를 뜻합니다."
      ],
      [
        "std::cout << value",
        "값을 출력 스트림에 넣습니다. \\n은 줄바꿈 문자입니다."
      ]
    ],
    "trace": false,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "expectedOutput": "바닥부터: 4 / 5"
  },
  {
    "id": "cpp-reference",
    "chapter": "00",
    "group": "함수와 클래스",
    "runtime": "cpp",
    "title": "값 복사와 참조를 구분하기",
    "short": "복사 · int& · 함수",
    "time": "20분",
    "lead": "함수 안에서 바꾼 값이 원래 변수에도 반영되는지 알아봅니다. 복사된 값과 참조를 나란히 비교합니다.",
    "concept": "int copy = original은 독립적인 정수를 복사합니다. int& 인자는 호출한 변수 자체를 가리켜 함수의 변경이 그 변수에 반영됩니다.",
    "visual": [
      "int copy = original",
      "int& value",
      "복사는 다른 값, 참조는 같은 객체를 가리킵니다"
    ],
    "predict": "increment(copy)를 실행하면 original도 바뀔까요? 인자에서 &를 빼면 copy는 바뀔까요?",
    "code": "#include <iostream>\nvoid increment(int& value) {\n    value += 5;\n}\nint main() {\n    int original = 10;\n    int copy = original;\n    increment(copy);\n    std::cout << original << \" \" << copy << \"\\n\";\n}\n",
    "task": "increment(original)도 호출해 두 값이 모두 15가 되게 하세요. 출력은 15 15입니다.",
    "hint": "increment(copy); 다음 줄에 increment(original);을 추가하세요.",
    "referenceComplete": true,
    "solution": "#include <iostream>\nvoid increment(int& value) {\n    value += 5;\n}\nint main() {\n    int original = 10;\n    int copy = original;\n    increment(copy);\n    increment(original);\n    std::cout << original << \" \" << copy << \"\\n\";\n}\n",
    "explain": [
      [
        "void increment(int& value)",
        "결과를 반환하지 않고 참조로 받은 변수의 값을 직접 바꿉니다."
      ],
      [
        "int copy = original",
        "original의 현재 값을 새 변수에 복사합니다. 이후에는 독립적인 변수입니다."
      ],
      [
        "&와 const 참조",
        "&는 참조 선언입니다. const int&는 이 참조를 통해 원래 값을 변경하지 못하게 합니다."
      ]
    ],
    "trace": false,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "expectedOutput": "15 15"
  },
  {
    "id": "cpp-class",
    "chapter": "00",
    "group": "함수와 클래스",
    "runtime": "cpp",
    "title": "클래스로 상태와 동작 묶기",
    "short": "class · 생성자 · private",
    "time": "20분",
    "lead": "Python의 self와 비교하며 C++ 객체를 만듭니다. 상태를 외부에서 함부로 바꾸지 못하도록 숨겨 봅니다.",
    "concept": "private 멤버는 클래스 안에서 접근합니다. public 메서드로 동작을 제공합니다. 생성자는 초기 상태를 만들고 const 메서드는 객체의 일반 멤버를 변경하지 않습니다.",
    "visual": [
      "Counter a(0), b(10)",
      "a와 b는 독립 객체",
      "외부에는 add()와 value()만 제공합니다"
    ],
    "predict": "a에 값을 더하면 b의 값도 바뀔까요? main에서 a.value_에 직접 접근하면 왜 컴파일 오류가 날까요?",
    "code": "#include <iostream>\nclass Counter {\nprivate:\n    int value_;\npublic:\n    explicit Counter(int start) : value_(start) {}\n    void add(int amount) { value_ += amount; }\n    int value() const { return value_; }\n};\nint main() {\n    Counter a(0), b(10);\n    a.add(3);\n    std::cout << a.value() << \" \" << b.value() << \"\\n\";\n}\n",
    "task": "a.add(4)를 추가해 a=7, b=10을 출력하세요. 두 객체의 상태가 독립적인지 확인하세요.",
    "hint": "a.add(3); 다음 줄에 a.add(4);를 추가하세요.",
    "referenceComplete": true,
    "solution": "#include <iostream>\nclass Counter {\nprivate:\n    int value_;\npublic:\n    explicit Counter(int start) : value_(start) {}\n    void add(int amount) { value_ += amount; }\n    int value() const { return value_; }\n};\nint main() {\n    Counter a(0), b(10);\n    a.add(3);\n    a.add(4);\n    std::cout << a.value() << \" \" << b.value() << \"\\n\";\n}\n",
    "explain": [
      [
        "Counter(int start) : value_(start)",
        "생성자의 초기화 목록으로 value_의 초기 상태를 지정합니다."
      ],
      [
        "private와 public",
        "private는 구현 내부, public은 외부에서 사용하는 인터페이스입니다."
      ],
      [
        "value() const",
        "이 메서드가 객체의 일반 멤버를 바꾸지 않는다는 약속입니다."
      ]
    ],
    "trace": false,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "expectedOutput": "7 10"
  },
  {
    "id": "cpp-sort",
    "chapter": "00",
    "group": "알고리즘",
    "runtime": "cpp",
    "title": "버블 정렬의 비교와 교환",
    "short": "정렬 · 비교 · swap",
    "time": "20분",
    "lead": "완성된 sort를 호출하기 전에 정렬을 직접 만들어 봅니다. 실제 비교와 교환 기록을 한 단계씩 재생합니다.",
    "concept": "인접한 두 값을 비교해서 순서가 잘못되었으면 교환합니다. 한 바퀴가 끝날 때 가장 큰 값이 뒤에 자리 잡으므로 다음 바퀴의 범위를 줄일 수 있습니다.",
    "visual": [
      "비교 → 필요하면 교환",
      "큰 값은 오른쪽으로",
      "작은 예제로 O(n²) 비교 횟수를 관찰합니다"
    ],
    "predict": "[5, 1, 4, 2]를 한 바퀴 비교하면 맨 뒤에는 어떤 값이 있을까요? 정렬된 배열에서도 비교는 계속 일어날까요?",
    "code": "#include <iostream>\n#include <vector>\n#include <utility>\nint main() {\n    std::vector<int> values = {5, 1, 4, 2};\n    int n = static_cast<int>(values.size());\n    for (int pass = 0; pass < n - 1; ++pass) {\n        for (int j = 0; j < n - 1 - pass; ++j) {\n            bool swapped = false;\n            if (values[j] > values[j + 1]) {\n                std::swap(values[j], values[j + 1]);\n                swapped = true;\n            }\n            record_sort(values, j, j + 1, swapped);\n        }\n    }\n    for (int value : values) std::cout << value << \" \";\n    std::cout << \"\\n\";\n}\n",
    "task": "배열에 3을 추가해 {5, 1, 4, 2, 3}을 정렬하세요. 출력은 1 2 3 4 5이고 비교 기록은 10단계입니다.",
    "hint": "std::vector<int> values = {5, 1, 4, 2, 3};",
    "referenceComplete": true,
    "solution": "#include <iostream>\n#include <vector>\n#include <utility>\nint main() {\n    std::vector<int> values = {5, 1, 4, 2, 3};\n    int n = static_cast<int>(values.size());\n    for (int pass = 0; pass < n - 1; ++pass) {\n        for (int j = 0; j < n - 1 - pass; ++j) {\n            bool swapped = false;\n            if (values[j] > values[j + 1]) {\n                std::swap(values[j], values[j + 1]);\n                swapped = true;\n            }\n            record_sort(values, j, j + 1, swapped);\n        }\n    }\n    for (int value : values) std::cout << value << \" \";\n    std::cout << \"\\n\";\n}\n",
    "explain": [
      [
        "std::swap(a, b)",
        "두 변수의 값을 교환합니다. 비교 결과가 참일 때만 실행합니다."
      ],
      [
        "n - 1 - pass",
        "이미 뒤에 확정된 큰 값은 다시 비교하지 않습니다."
      ],
      [
        "record_sort(...)",
        "비교한 두 인덱스와 실제 교환 여부를 기록합니다. 교환한 뒤의 배열을 표시합니다."
      ]
    ],
    "trace": true,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "expectedOutput": "1 2 3 4 5"
  },
  {
    "id": "torch-gradients",
    "chapter": "00",
    "group": "자동 미분",
    "runtime": "torch",
    "title": "기울기는 왜 쌓일까?",
    "short": "grad 누적 · zero_",
    "time": "20분",
    "lead": "backward를 반복하기 전에 기울기가 어디에 보관되는지 확인합니다. 학습 루프에서 가장 흔한 실수를 작은 식으로 재현합니다.",
    "concept": "w²의 미분은 2w입니다. backward는 .grad에 기울기를 더합니다. 같은 식이라도 새로 forward를 계산하면 새 그래프가 생기지만 .grad는 자동으로 지워지지 않습니다.",
    "visual": [
      "backward → grad += 기울기",
      "0 → 4 → 8",
      "grad를 비운 다음에는 다시 4가 됩니다"
    ],
    "predict": "w=3이면 두 번의 backward 후 기울기는 얼마일까요? 같은 loss 객체에 backward를 두 번 호출하는 것과 새 loss를 만드는 것은 같을까요?",
    "code": "import torch\nw = torch.tensor(2., requires_grad=True)\n(w ** 2).backward()\nfirst_grad = w.grad.item()\n(w ** 2).backward()\nsecond_grad = w.grad.item()\nw.grad.zero_()\n(w ** 2).backward()\nthird_grad = w.grad.item()\nprint(first_grad, second_grad, third_grad)\n",
    "task": "w의 초기값을 3으로 바꾸세요. first_grad=6, second_grad=12, third_grad=6을 확인하세요.",
    "hint": "w = torch.tensor(3., requires_grad=True)",
    "referenceComplete": true,
    "solution": "import torch\nw = torch.tensor(3., requires_grad=True)\n(w ** 2).backward()\nfirst_grad = w.grad.item()\n(w ** 2).backward()\nsecond_grad = w.grad.item()\nw.grad.zero_()\n(w ** 2).backward()\nthird_grad = w.grad.item()\nprint(first_grad, second_grad, third_grad)\n",
    "explain": [
      [
        "새로운 (w ** 2)",
        "매번 forward 연산을 새로 실행합니다. 이미 해제된 같은 그래프를 다시 역전파하는 예제가 아닙니다."
      ],
      [
        "w.grad.zero_()",
        "기울기 텐서를 제자리에서 0으로 채웁니다. 다음 backward가 새로 쌓일 출발점을 만듭니다."
      ],
      [
        "optimizer.zero_grad()",
        "여러 학습 파라미터의 기울기를 관리할 때 optimizer로 한꺼번에 초기화합니다."
      ]
    ],
    "trace": false,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert w.item() == 3 and first_grad == 6 and second_grad == 12 and third_grad == 6, \"새 그래프의 기울기도 .grad에는 누적됩니다. 초기화 위치를 확인하세요.\""
  },
  {
    "id": "torch-loop",
    "chapter": "00",
    "group": "모델 학습",
    "runtime": "torch",
    "title": "학습 루프를 바닥부터 만들기",
    "short": "forward · backward · update",
    "time": "20분",
    "lead": "목표 y=2x+1을 데이터만 보고 알아내게 합니다. optimizer 없이 기울기를 사용해 w와 b를 직접 바꿉니다.",
    "concept": "한 단계는 예측, 손실 계산, 역전파, 가중치 갱신, 기울기 초기화로 구성됩니다. 기록된 loss 곡선과 실제 w·b 값이 학습 과정을 보여 줍니다.",
    "visual": [
      "예측 → 손실 → 기울기 → 갱신",
      "w → 2, b → 1",
      "작은 CPU 텐서만으로 학습합니다"
    ],
    "predict": "학습률을 너무 크게 하면 손실이 항상 줄어들까요? 기울기를 초기화하지 않으면 다음 갱신에 무엇이 섞일까요?",
    "code": "import torch\nx = torch.tensor([[-1.], [0.], [1.], [2.]])\ny = 2 * x + 1\nw = torch.tensor(0., requires_grad=True)\nb = torch.tensor(0., requires_grad=True)\nlearning_rate = 0.1\nsteps = 40\nhistory = []\nfor step in range(steps):\n    prediction = x * w + b\n    loss = ((prediction - y) ** 2).mean()\n    history.append(loss.item())\n    if step % 5 == 0:\n        record(\"training\", epoch=step, loss=loss.item(), weights=[w.item(), b.item()])\n    loss.backward()\n    with torch.no_grad():\n        w -= learning_rate * w.grad\n        b -= learning_rate * b.grad\n    w.grad.zero_()\n    b.grad.zero_()\nfinal_loss = ((x * w + b - y) ** 2).mean()\nrecord(\"training\", epoch=steps, loss=final_loss.item(), weights=[w.item(), b.item()])\nprint(\"w, b:\", w.item(), b.item())\nprint(\"loss:\", final_loss.item())\n",
    "task": "steps를 80으로 늘리고 final_loss를 0.000001 미만으로 낮추세요. 마지막 w≈2, b≈1을 확인하세요.",
    "hint": "steps = 80",
    "referenceComplete": true,
    "solution": "import torch\nx = torch.tensor([[-1.], [0.], [1.], [2.]])\ny = 2 * x + 1\nw = torch.tensor(0., requires_grad=True)\nb = torch.tensor(0., requires_grad=True)\nlearning_rate = 0.1\nsteps = 80\nhistory = []\nfor step in range(steps):\n    prediction = x * w + b\n    loss = ((prediction - y) ** 2).mean()\n    history.append(loss.item())\n    if step % 5 == 0:\n        record(\"training\", epoch=step, loss=loss.item(), weights=[w.item(), b.item()])\n    loss.backward()\n    with torch.no_grad():\n        w -= learning_rate * w.grad\n        b -= learning_rate * b.grad\n    w.grad.zero_()\n    b.grad.zero_()\nfinal_loss = ((x * w + b - y) ** 2).mean()\nrecord(\"training\", epoch=steps, loss=final_loss.item(), weights=[w.item(), b.item()])\nprint(\"w, b:\", w.item(), b.item())\nprint(\"loss:\", final_loss.item())\n",
    "explain": [
      [
        "torch.no_grad()",
        "학습 파라미터를 갱신하는 연산은 미분 그래프에 추가하지 않습니다."
      ],
      [
        "learning_rate * w.grad",
        "현재 위치에서 손실을 줄이는 방향으로 얼마나 이동할지 정합니다."
      ],
      [
        "record(\"training\", ...)",
        "현재 epoch, 실제 손실, 선택한 파라미터를 기록합니다. 그래프의 점을 임의로 만들지 않습니다."
      ]
    ],
    "trace": true,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert steps == 80 and final_loss.item() < 1e-6, \"80단계 학습 후 손실을 확인하세요.\"\nassert abs(w.item()-2) < .01 and abs(b.item()-1) < .01, \"w와 b를 올바르게 갱신하세요.\"\nassert final_loss.item() < history[0], \"초기 손실보다 작아야 합니다.\""
  },
  {
    "id": "torch-optimizer",
    "chapter": "00",
    "group": "모델 학습",
    "runtime": "torch",
    "title": "nn.Linear와 optimizer로 정리하기",
    "short": "nn.Module · SGD · parameters",
    "time": "20분",
    "lead": "직접 작성한 갱신 루프를 PyTorch의 모델과 optimizer로 옮깁니다. 생략된 원리를 알고 추상화를 사용해 봅니다.",
    "concept": "nn.Linear는 가중치와 편향을 가진 모델입니다. model.parameters()는 학습할 파라미터를 제공하고, SGD.step()은 계산된 기울기로 파라미터를 갱신합니다.",
    "visual": [
      "model(x) = xWᵀ + b",
      "zero_grad → backward → step",
      "모델과 갱신 규칙을 분리합니다"
    ],
    "predict": "optimizer.step()만 호출해도 기울기가 계산될까요? nn.Linear(1,1)의 학습 파라미터는 몇 개의 숫자일까요?",
    "code": "import torch\nfrom torch import nn\ntorch.manual_seed(7)\nx = torch.tensor([[-1.], [0.], [1.], [2.]])\ny = 2 * x + 1\nmodel = nn.Linear(1, 1)\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\nsteps = 40\ninitial_loss = ((model(x) - y) ** 2).mean().item()\nfor step in range(steps):\n    optimizer.zero_grad()\n    prediction = model(x)\n    loss = ((prediction - y) ** 2).mean()\n    if step % 5 == 0:\n        record(\"training\", epoch=step, loss=loss.item(),\n               weights=[model.weight.item(), model.bias.item()])\n    loss.backward()\n    optimizer.step()\nfinal_loss = ((model(x) - y) ** 2).mean()\nrecord(\"training\", epoch=steps, loss=final_loss.item(),\n       weights=[model.weight.item(), model.bias.item()])\nprint(\"loss:\", final_loss.item())\n",
    "task": "steps를 80으로 늘리고 학습된 weight≈2, bias≈1 및 final_loss < 0.000001을 확인하세요.",
    "hint": "steps = 80",
    "referenceComplete": true,
    "solution": "import torch\nfrom torch import nn\ntorch.manual_seed(7)\nx = torch.tensor([[-1.], [0.], [1.], [2.]])\ny = 2 * x + 1\nmodel = nn.Linear(1, 1)\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\nsteps = 80\ninitial_loss = ((model(x) - y) ** 2).mean().item()\nfor step in range(steps):\n    optimizer.zero_grad()\n    prediction = model(x)\n    loss = ((prediction - y) ** 2).mean()\n    if step % 5 == 0:\n        record(\"training\", epoch=step, loss=loss.item(),\n               weights=[model.weight.item(), model.bias.item()])\n    loss.backward()\n    optimizer.step()\nfinal_loss = ((model(x) - y) ** 2).mean()\nrecord(\"training\", epoch=steps, loss=final_loss.item(),\n       weights=[model.weight.item(), model.bias.item()])\nprint(\"loss:\", final_loss.item())\n",
    "explain": [
      [
        "nn.Linear(1, 1)",
        "입력 특성 하나를 출력 하나로 변환합니다. weight의 shape는 (1,1), bias는 (1,)입니다."
      ],
      [
        "model.parameters()",
        "이 모델이 학습할 파라미터를 optimizer에 전달합니다."
      ],
      [
        "optimizer.zero_grad() / step()",
        "이전 기울기를 초기화하고, backward 이후 계산된 기울기로 가중치를 갱신합니다."
      ]
    ],
    "trace": true,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert isinstance(model, nn.Linear) and isinstance(optimizer, torch.optim.SGD), \"Linear와 SGD를 사용하세요.\"\nassert steps == 80 and final_loss.item() < 1e-6, \"80단계의 손실을 확인하세요.\"\nassert abs(model.weight.item()-2) < .01 and abs(model.bias.item()-1) < .01, \"가중치와 편향을 학습하세요.\""
  },
  {
    "id": "torch-network",
    "chapter": "00",
    "group": "작은 신경망",
    "runtime": "torch",
    "title": "두 층 신경망으로 XOR 배우기",
    "short": "Sequential · Tanh · Adam",
    "time": "25분",
    "lead": "직선 하나로 풀 수 없는 네 점을 작은 신경망으로 학습합니다. 큰 데이터나 GPU 없이 비선형성의 역할을 확인합니다.",
    "concept": "Linear 사이에 Tanh를 넣어 비선형 함수를 만듭니다. 이 수업은 구조를 이해하기 위해 0/1 목표와 평균 제곱 오차를 사용하고, 0.5를 기준으로 분류합니다.",
    "visual": [
      "(4,2) → (4,4) → (4,1)",
      "Linear → Tanh → Linear",
      "입력이 다를 때 1인 XOR을 학습합니다"
    ],
    "predict": "Tanh를 제거하고 Linear 두 개만 연결하면 왜 선형 모델을 벗어나지 못할까요? 출력과 목표의 shape가 다른 경우도 확인해 보세요.",
    "code": "import torch\nfrom torch import nn\ntorch.manual_seed(7)\nx = torch.tensor([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])\ny = torch.tensor([[0.], [1.], [1.], [0.]])\nmodel = nn.Sequential(nn.Linear(2, 4), nn.Tanh(), nn.Linear(4, 1))\noptimizer = torch.optim.Adam(model.parameters(), lr=0.05)\nsteps = 200\nfor step in range(steps):\n    optimizer.zero_grad()\n    prediction = model(x)\n    loss = ((prediction - y) ** 2).mean()\n    if step % 20 == 0:\n        accuracy = ((prediction > 0.5) == y.bool()).float().mean().item()\n        record(\"training\", epoch=step, loss=loss.item(), weights=[], accuracy=accuracy)\n    loss.backward()\n    optimizer.step()\nwith torch.no_grad():\n    final_prediction = model(x)\n    final_loss = ((final_prediction - y) ** 2).mean()\n    labels = (final_prediction > 0.5).int()\n    accuracy = (labels == y.int()).float().mean().item()\nrecord(\"training\", epoch=steps, loss=final_loss.item(), weights=[], accuracy=accuracy)\nprint(\"prediction:\", final_prediction.flatten().tolist())\nprint(\"labels:\", labels.flatten().tolist())\nprint(\"loss:\", final_loss.item())\n",
    "task": "steps를 300으로 늘리고 네 입력의 labels가 [0,1,1,0]인지 확인하세요. final_loss < 0.01과 정확도 1.0을 만족시켜 보세요.",
    "hint": "steps = 300",
    "referenceComplete": true,
    "solution": "import torch\nfrom torch import nn\ntorch.manual_seed(7)\nx = torch.tensor([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])\ny = torch.tensor([[0.], [1.], [1.], [0.]])\nmodel = nn.Sequential(nn.Linear(2, 4), nn.Tanh(), nn.Linear(4, 1))\noptimizer = torch.optim.Adam(model.parameters(), lr=0.05)\nsteps = 300\nfor step in range(steps):\n    optimizer.zero_grad()\n    prediction = model(x)\n    loss = ((prediction - y) ** 2).mean()\n    if step % 20 == 0:\n        accuracy = ((prediction > 0.5) == y.bool()).float().mean().item()\n        record(\"training\", epoch=step, loss=loss.item(), weights=[], accuracy=accuracy)\n    loss.backward()\n    optimizer.step()\nwith torch.no_grad():\n    final_prediction = model(x)\n    final_loss = ((final_prediction - y) ** 2).mean()\n    labels = (final_prediction > 0.5).int()\n    accuracy = (labels == y.int()).float().mean().item()\nrecord(\"training\", epoch=steps, loss=final_loss.item(), weights=[], accuracy=accuracy)\nprint(\"prediction:\", final_prediction.flatten().tolist())\nprint(\"labels:\", labels.flatten().tolist())\nprint(\"loss:\", final_loss.item())\n",
    "explain": [
      [
        "nn.Sequential(...)",
        "레이어를 앞에서부터 차례대로 적용합니다. 중간 출력 shape가 다음 레이어 입력과 맞아야 합니다."
      ],
      [
        "nn.Tanh()",
        "비선형 활성화 함수입니다. 선형 레이어만 쌓아서는 만들 수 없는 함수를 표현할 수 있게 합니다."
      ],
      [
        "torch.manual_seed(7)",
        "초기 가중치의 난수 시드를 고정해 같은 실행 환경에서 실험을 비교하기 쉽게 합니다."
      ],
      [
        "prediction > 0.5",
        "회귀 형태의 실제 출력을 이 작은 예제의 0/1 분류 결과로 바꿉니다. 실전 이진 분류에서는 BCEWithLogitsLoss 등의 목적 함수도 학습해야 합니다."
      ]
    ],
    "trace": true,
    "takeaway": "직접 입력한 코드를 실행한 다음 입력값을 바꾸어 같은 원리가 성립하는지 확인하세요.",
    "check": "assert isinstance(model, nn.Sequential) and any(isinstance(layer, nn.Tanh) for layer in model), \"비선형 활성화 함수를 유지하세요.\"\nassert steps == 300 and labels.flatten().tolist() == [0,1,1,0], \"네 점을 올바르게 분류하세요.\"\nassert final_loss.item() < .01 and accuracy == 1., \"최종 손실과 정확도를 확인하세요.\""
  }
];
