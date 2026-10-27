// Each complete solution is shown above the blank learner editor and is compiled for real.
function lesson({id,title,short,lead,concept,visual,predict,code,task,hint,solution,expectedOutput,explain,takeaway,time='15분'}) {
 return {id,title,short,lead,concept,visual,predict,code,task,hint,solution,expectedOutput,explain,takeaway,time,runtime:'cpp',group:'모던 C++',referenceComplete:true};
}
export const modernCppLessons = [
 lesson({id:'cpp-auto',title:'auto와 const로 의도를 드러내기',short:'auto · const · 타입 추론',
  lead:'컴파일러가 초기값에서 자료형을 추론하는 방법을 확인합니다.',concept:'auto는 실행 중 타입이 바뀐다는 뜻이 아닙니다. 선언 시 초기값에서 타입을 결정합니다. const는 선언한 변수를 통한 변경을 막습니다.',
  visual:['const auto count = 3','count는 정수','초기화 값으로 타입을 추론합니다'],predict:'count에 1을 더해 다시 저장하면 컴파일될까요?',
  code:`#include <iostream>
int main() {
    const auto count = 3;
    auto total = count * 2;
    std::cout << total << "\\n";
}
`,task:'count를 4로 바꿔 8을 출력하세요.',hint:'const auto count = 4;',
  solution:`#include <iostream>
int main() {
    const auto count = 4;
    auto total = count * 2;
    std::cout << total << "\\n";
}
`,expectedOutput:'8',explain:[['auto','초기화 식의 타입을 컴파일 시 추론합니다.'],['const','이 이름을 통해 값을 변경하지 못하게 합니다.']],takeaway:'auto는 타입 추론, const는 변경 가능성에 관한 선언입니다.'}),
 lesson({id:'cpp-range-loop',title:'범위 기반 for로 값과 참조 비교하기',short:'range-for · 복사 · 참조',
  lead:'컨테이너의 값을 순서대로 읽고, 참조로 원본을 바꾸어 봅니다.',concept:'for (auto value : values)는 원소를 복사합니다. auto&를 사용하면 원소를 참조하여 수정할 수 있습니다. 읽기만 할 때는 const auto&를 사용할 수 있습니다.',
  visual:['원소 복사 → 원본 유지','auto& → 원본 변경','&는 현재 원소를 참조합니다'],predict:'auto value로 바꾸면 원래 vector의 값도 바뀔까요?',
  code:`#include <iostream>
#include <vector>
int main() {
    std::vector<int> values{1, 2, 3};
    for (auto& value : values) {
        value *= 2;
    }
    for (const auto& value : values) {
        std::cout << value << " ";
    }
    std::cout << "\\n";
}
`,task:'모든 원소를 3배로 만들어 3 6 9를 출력하세요.',hint:'value *= 3;',
  solution:`#include <iostream>
#include <vector>
int main() {
    std::vector<int> values{1, 2, 3};
    for (auto& value : values) {
        value *= 3;
    }
    for (const auto& value : values) {
        std::cout << value << " ";
    }
    std::cout << "\\n";
}
`,expectedOutput:'3 6 9',explain:[['auto&','각 원소를 참조하므로 대입은 원본을 변경합니다.'],['const auto&','원소를 복사하지 않고 이 참조를 통해 읽기만 합니다.']],takeaway:'반복문의 값 복사와 참조는 원본 변경 여부가 다릅니다.'}),
 lesson({id:'cpp-string',title:'문자열의 길이와 안전한 접근',short:'std::string · size · at',
  lead:'문자열을 소유하는 std::string을 사용해 값을 다룹니다.',concept:'std::string은 문자열을 소유합니다. size()는 바이트 수를 반환하며, at()은 범위를 벗어나면 예외를 발생시킵니다. UTF-8 한글 한 글자는 여러 바이트일 수 있습니다.',
  visual:['"cat" → 3바이트','at(0) → c','인덱스는 0부터 시작합니다'],predict:'"code"의 at(1)은 어떤 문자일까요?',
  code:`#include <iostream>
#include <string>
int main() {
    std::string word = "cat";
    std::cout << word.size() << " " << word.at(0) << "\\n";
}
`,task:'word를 "code"로 바꾸고 두 번째 문자와 길이 4를 확인해 4 o를 출력하세요.',hint:'word = "code", word.at(1)',
  solution:`#include <iostream>
#include <string>
int main() {
    std::string word = "code";
    std::cout << word.size() << " " << word.at(1) << "\\n";
}
`,expectedOutput:'4 o',explain:[['std::string','문자열 데이터를 소유하는 표준 라이브러리 타입입니다.'],['at()','범위를 검사하는 접근 함수입니다.']],takeaway:'size는 바이트 수이며 at은 범위 밖 접근을 검사합니다.'}),
 lesson({id:'cpp-struct-binding',title:'구조체의 결과를 이름으로 나누기',short:'struct · 구조적 바인딩',
  lead:'연관된 값을 구조체로 묶고 각 값을 별도 이름으로 꺼냅니다.',concept:'구조체는 여러 멤버를 한 값으로 묶습니다. C++17의 구조적 바인딩은 멤버를 순서대로 이름에 연결합니다. 여기서는 복사본을 만듭니다.',
  visual:['Point{2, 3}','auto [x, y] = point','두 멤버를 각각 꺼냅니다'],predict:'x를 바꾸면 복사해 둔 point.x도 바뀔까요?',
  code:`#include <iostream>
struct Point { int x; int y; };
int main() {
    Point point{2, 3};
    auto [x, y] = point;
    std::cout << x + y << "\\n";
}
`,task:'point를 {4, 5}로 바꿔 합 9를 출력하세요.',hint:'Point point{4, 5};',
  solution:`#include <iostream>
struct Point { int x; int y; };
int main() {
    Point point{4, 5};
    auto [x, y] = point;
    std::cout << x + y << "\\n";
}
`,expectedOutput:'9',explain:[['struct Point','두 정수 멤버를 가진 타입입니다.'],['auto [x, y]','point를 복사한 뒤 멤버를 각 이름에 연결합니다.']],takeaway:'구조적 바인딩으로 묶인 값을 읽기 쉬운 이름으로 다룰 수 있습니다.'}),
 lesson({id:'cpp-algorithm',title:'표준 알고리즘으로 정렬하고 찾기',short:'std::sort · std::find',
  lead:'직접 정렬을 구현한 경험을 표준 라이브러리 사용으로 연결합니다.',concept:'std::sort는 반열린 범위 [begin, end)를 정렬합니다. std::find는 첫 일치 위치를 반환하고 없으면 end를 반환합니다.',
  visual:['[3, 1, 2] → sort','[1, 2, 3]','end는 마지막 원소 다음 위치입니다'],predict:'없는 값을 찾으면 결과가 values.end()와 같을까요?',
  code:`#include <algorithm>
#include <iostream>
#include <vector>
int main() {
    std::vector<int> values{3, 1, 2};
    std::sort(values.begin(), values.end());
    auto found = std::find(values.begin(), values.end(), 2);
    if (found != values.end()) std::cout << *found << "\\n";
}
`,task:'찾는 값을 3으로 바꿔 3을 출력하세요.',hint:'std::find(values.begin(), values.end(), 3)',
  solution:`#include <algorithm>
#include <iostream>
#include <vector>
int main() {
    std::vector<int> values{3, 1, 2};
    std::sort(values.begin(), values.end());
    auto found = std::find(values.begin(), values.end(), 3);
    if (found != values.end()) std::cout << *found << "\\n";
}
`,expectedOutput:'3',explain:[['begin() / end()','첫 원소와 마지막 다음 위치로 범위를 나타냅니다.'],['*found','찾은 위치가 end가 아닐 때 해당 원소를 읽습니다.']],takeaway:'표준 알고리즘은 반열린 범위와 반환값의 의미를 확인하고 사용합니다.'}),
 lesson({id:'cpp-lambda',title:'람다로 조건을 직접 전달하기',short:'lambda · count_if · 캡처',
  lead:'작은 함수를 필요한 자리에서 만들고 표준 알고리즘에 넘깁니다.',concept:'람다는 이름 없이 만들 수 있는 함수 객체입니다. [limit]은 limit의 현재 값을 복사해 보관하고, count_if는 조건이 참인 원소의 수를 셉니다.',
  visual:['[1, 3, 5] → 조건','3 이상: 2개','캡처와 인자를 구분합니다'],predict:'기준을 5로 올리면 조건에 맞는 원소는 몇 개일까요?',
  code:`#include <algorithm>
#include <iostream>
#include <vector>
int main() {
    std::vector<int> values{1, 3, 5};
    int limit = 3;
    auto count = std::count_if(values.begin(), values.end(),
        [limit](int value) { return value >= limit; });
    std::cout << count << "\\n";
}
`,task:'limit을 5로 바꿔 1을 출력하세요.',hint:'int limit = 5;',
  solution:`#include <algorithm>
#include <iostream>
#include <vector>
int main() {
    std::vector<int> values{1, 3, 5};
    int limit = 5;
    auto count = std::count_if(values.begin(), values.end(),
        [limit](int value) { return value >= limit; });
    std::cout << count << "\\n";
}
`,expectedOutput:'1',explain:[['[limit]','바깥 변수의 현재 값을 복사해 캡처합니다.'],['(int value)','알고리즘이 각 원소를 전달하는 인자입니다.']],takeaway:'람다는 동작을 값처럼 알고리즘에 전달할 수 있습니다.'}),
 lesson({id:'cpp-optional',title:'값이 없을 수도 있음을 표현하기',short:'std::optional · 값 유무',
  lead:'찾은 값이 없을 수 있는 상황을 결과 타입으로 드러냅니다.',concept:'std::optional<int>는 int 값이 있거나 없을 수 있습니다. 값을 읽기 전에 has_value() 또는 조건 검사로 존재 여부를 확인합니다.',
  visual:['값 있음 → 사용','값 없음 → 대안','optional은 두 상태를 표현합니다'],predict:'찾지 못한 경우 value_or(0)은 무엇을 반환할까요?',
  code:`#include <iostream>
#include <optional>
std::optional<int> find_even(int value) {
    if (value % 2 == 0) return value;
    return std::nullopt;
}
int main() {
    auto result = find_even(3);
    std::cout << result.value_or(0) << "\\n";
}
`,task:'find_even에 4를 전달해 4를 출력하세요.',hint:'find_even(4)',
  solution:`#include <iostream>
#include <optional>
std::optional<int> find_even(int value) {
    if (value % 2 == 0) return value;
    return std::nullopt;
}
int main() {
    auto result = find_even(4);
    std::cout << result.value_or(0) << "\\n";
}
`,expectedOutput:'4',explain:[['std::nullopt','값이 없다는 상태를 나타냅니다.'],['value_or(0)','값이 없을 때 0을 대신 반환합니다.']],takeaway:'값이 없을 수 있음을 타입으로 표현하고 읽기 전에 처리합니다.'}),
 lesson({id:'cpp-raii',title:'객체의 수명으로 자원 관리하기',short:'RAII · 생성자 · 소멸자',
  lead:'블록이 끝나면 객체가 정리되는 순서를 관찰합니다.',concept:'RAII는 자원을 객체의 수명에 묶는 방식입니다. 생성자에서 확보하고 소멸자에서 해제하면 범위를 벗어날 때 정리됩니다. 예제의 출력은 수명을 관찰하기 위한 것입니다.',
  visual:['블록 진입 → 생성','블록 종료 → 소멸','정리는 객체 수명에 연결됩니다'],predict:'"밖"은 소멸 메시지보다 먼저 출력될까요, 나중에 출력될까요?',
  code:`#include <iostream>
struct Guard {
    Guard() { std::cout << "start\\n"; }
    ~Guard() { std::cout << "end\\n"; }
};
int main() {
    { Guard guard; }
    std::cout << "outside\\n";
}
`,task:'블록 안에서 "work"를 출력해 start, work, end, outside 순서로 확인하세요.',hint:'std::cout << "work\\n";',
  solution:`#include <iostream>
struct Guard {
    Guard() { std::cout << "start\\n"; }
    ~Guard() { std::cout << "end\\n"; }
};
int main() {
    { Guard guard; std::cout << "work\\n"; }
    std::cout << "outside\\n";
}
`,expectedOutput:'start\nwork\nend\noutside',explain:[['Guard()','객체가 만들어질 때 호출되는 생성자입니다.'],['~Guard()','객체 수명이 끝날 때 호출되는 소멸자입니다.']],takeaway:'객체 수명과 정리 시점을 연결하는 것이 RAII의 핵심입니다.'}),
 lesson({id:'cpp-unique',title:'unique_ptr로 소유권 하나만 갖기',short:'unique_ptr · make_unique',
  lead:'동적으로 만든 객체를 소유하는 스마트 포인터를 사용합니다.',concept:'unique_ptr은 객체의 단독 소유권을 갖고 수명이 끝나면 소유 객체를 정리합니다. make_unique로 만들며 일반 복사는 허용되지 않습니다.',
  visual:['make_unique → 소유','범위 종료 → 정리','소유자는 하나입니다'],predict:'unique_ptr을 일반 복사하려고 하면 컴파일될까요?',
  code:`#include <iostream>
#include <memory>
int main() {
    auto number = std::make_unique<int>(7);
    std::cout << *number << "\\n";
}
`,task:'초기값을 9로 바꿔 9를 출력하세요.',hint:'std::make_unique<int>(9)',
  solution:`#include <iostream>
#include <memory>
int main() {
    auto number = std::make_unique<int>(9);
    std::cout << *number << "\\n";
}
`,expectedOutput:'9',explain:[['std::make_unique<int>','int를 생성하고 소유하는 unique_ptr을 반환합니다.'],['*number','소유 객체를 읽습니다. 빈 포인터는 역참조하면 안 됩니다.']],takeaway:'단독 소유와 자동 정리를 표현할 때 unique_ptr을 사용합니다.'}),
 lesson({id:'cpp-move',title:'소유권을 안전하게 옮기기',short:'std::move · 이동 · 소유권',
  lead:'복사할 수 없는 unique_ptr의 소유권을 다른 변수에 옮깁니다.',concept:'std::move는 이동할 수 있도록 값을 표현합니다. unique_ptr을 이동하면 소유권이 목적지로 이전되고 원본 unique_ptr은 비게 됩니다. 모든 이동한 객체가 비게 되는 것은 아닙니다.',
  visual:['first → 이동 → second','first는 비어 있음','second가 객체를 소유합니다'],predict:'이동 후 first를 역참조해도 안전할까요?',
  code:`#include <iostream>
#include <memory>
#include <utility>
int main() {
    auto first = std::make_unique<int>(7);
    auto second = std::move(first);
    std::cout << (first ? "owned" : "empty") << " " << *second << "\\n";
}
`,task:'초기값을 9로 바꿔 empty 9를 출력하세요.',hint:'std::make_unique<int>(9)',
  solution:`#include <iostream>
#include <memory>
#include <utility>
int main() {
    auto first = std::make_unique<int>(9);
    auto second = std::move(first);
    std::cout << (first ? "owned" : "empty") << " " << *second << "\\n";
}
`,expectedOutput:'empty 9',explain:[['std::move(first)','first를 이동할 수 있는 표현식으로 바꿉니다.'],['unique_ptr의 이동','소유권은 second로 옮겨지고 first는 빈 포인터가 됩니다.']],takeaway:'이동은 타입별로 의미가 다릅니다. unique_ptr은 소유권을 이전합니다.'}),
 lesson({id:'cpp-ranges',title:'C++20 ranges로 걸러서 읽기',short:'C++20 · views::filter',
  lead:'컨테이너의 원소를 조건으로 걸러 반복합니다.',concept:'views::filter는 조건에 맞는 원소를 순회하는 뷰를 만듭니다. 새 vector를 즉시 생성하지 않고, 이 예제의 뷰는 원본 values가 살아 있는 동안 사용합니다.',
  visual:['[1, 2, 3, 4]','짝수 → 2, 4','뷰는 원본을 순회합니다'],predict:'짝수 대신 3 이상을 선택하면 어떤 값이 출력될까요?',
  code:`#include <iostream>
#include <ranges>
#include <vector>
int main() {
    std::vector<int> values{1, 2, 3, 4};
    auto selected = values | std::views::filter([](int n) { return n % 2 == 0; });
    for (int n : selected) std::cout << n << " ";
    std::cout << "\\n";
}
`,task:'3 이상을 선택하도록 조건을 바꿔 3 4를 출력하세요.',hint:'return n >= 3;',
  solution:`#include <iostream>
#include <ranges>
#include <vector>
int main() {
    std::vector<int> values{1, 2, 3, 4};
    auto selected = values | std::views::filter([](int n) { return n >= 3; });
    for (int n : selected) std::cout << n << " ";
    std::cout << "\\n";
}
`,expectedOutput:'3 4',explain:[['std::views::filter','조건에 맞는 원소를 순회하는 뷰를 만듭니다.'],['뷰와 원본의 수명','이 예제의 뷰는 values를 참조하므로 values가 살아 있어야 합니다.']],takeaway:'C++20 뷰를 쓸 때는 지연된 순회와 원본의 수명을 함께 확인합니다.'})
];

modernCppLessons.push(
 lesson({id:'cpp-template',title:'템플릿으로 타입에 공통인 함수 만들기',short:'template · 타입 매개변수',
  lead:'같은 계산을 여러 숫자 타입에 적용하는 함수를 만듭니다.',concept:'함수 템플릿은 타입을 매개변수로 받는 설계입니다. 호출할 때 전달된 인자에 맞춰 함수가 만들어집니다. 이 예제는 두 인자의 타입이 같아야 합니다.',
  visual:['twice<int>(3) → 6','twice<double>(1.5) → 3','입력 타입에 맞춰 계산합니다'],predict:'twice(4)는 무엇을 반환할까요?',
  code:`#include <iostream>\ntemplate <typename T>\nT twice(T value) { return value + value; }\nint main() {\n    std::cout << twice(3) << " " << twice(1.5) << "\\n";\n}\n`,
  task:'정수 인자를 4로 바꿔 8 3을 출력하세요.',hint:'twice(4)',
  solution:`#include <iostream>\ntemplate <typename T>\nT twice(T value) { return value + value; }\nint main() {\n    std::cout << twice(4) << " " << twice(1.5) << "\\n";\n}\n`,expectedOutput:'8 3',
  explain:[['template <typename T>','T를 타입 매개변수로 선언합니다.'],['twice(4)','호출 인자에서 T를 int로 추론합니다.']],takeaway:'템플릿은 타입에 따라 구체화되는 설계입니다.'}),
 lesson({id:'cpp-constexpr',title:'constexpr로 상수 계산하기',short:'constexpr · 컴파일 시 계산',
  lead:'변하지 않는 값과 컴파일 시 계산을 구분해 봅니다.',concept:'constexpr 함수는 조건이 맞으면 컴파일 시 평가할 수 있습니다. constexpr 변수의 초기화는 상수 표현식이어야 합니다. 같은 함수를 일반 입력에 호출할 때는 실행 시 계산될 수도 있습니다.',
  visual:['square(3) → 9','constexpr 변수에 저장','상수 표현식인지 확인합니다'],predict:'square(4)를 constexpr 변수에 저장하면 얼마일까요?',
  code:`#include <iostream>\nconstexpr int square(int value) { return value * value; }\nint main() {\n    constexpr int area = square(3);\n    static_assert(area == 9);\n    std::cout << area << "\\n";\n}\n`,
  task:'square(4)를 사용하고 static_assert를 16으로 바꿔 16을 출력하세요.',hint:'square(4), static_assert(area == 16)',
  solution:`#include <iostream>\nconstexpr int square(int value) { return value * value; }\nint main() {\n    constexpr int area = square(4);\n    static_assert(area == 16);\n    std::cout << area << "\\n";\n}\n`,expectedOutput:'16',
  explain:[['constexpr','상수 표현식으로 평가할 수 있는 함수 또는 값을 선언합니다.'],['static_assert','컴파일 시 조건을 검사합니다.']],takeaway:'constexpr 함수 호출이 항상 컴파일 시 실행되는 것은 아닙니다.'}),
 lesson({id:'cpp-concepts',title:'concepts로 템플릿의 조건 표현하기',short:'C++20 · concepts · 제약',
  lead:'템플릿이 받을 타입의 조건을 코드에 드러냅니다.',concept:'C++20의 std::integral은 정수 타입에 만족하는 제약입니다. 제약에 맞지 않는 타입으로 호출하면 컴파일 단계에서 거부됩니다.',
  visual:['정수 → 허용','실수 → 제약 불만족','타입에 대한 조건을 명시합니다'],predict:'twice(1.5)를 호출하면 이 함수의 제약을 만족할까요?',
  code:`#include <concepts>\n#include <iostream>\ntemplate <std::integral T>\nT twice(T value) { return value + value; }\nint main() {\n    std::cout << twice(3) << "\\n";\n}\n`,
  task:'정수 5를 전달해 10을 출력하세요. 실수 호출은 자유 실험으로 컴파일 오류를 살펴보세요.',hint:'twice(5)',
  solution:`#include <concepts>\n#include <iostream>\ntemplate <std::integral T>\nT twice(T value) { return value + value; }\nint main() {\n    std::cout << twice(5) << "\\n";\n}\n`,expectedOutput:'10',
  explain:[['std::integral','정수 타입에 만족하는 표준 concept입니다.'],['template <std::integral T>','T에 정수 타입 제약을 지정합니다.']],takeaway:'concepts는 템플릿이 요구하는 조건을 명시합니다.'}),
 lesson({id:'cpp-exception',title:'예외가 생겨도 객체는 정리될까?',short:'예외 · 스택 풀기 · RAII',
  lead:'예외로 블록을 빠져나갈 때 소멸자가 호출되는 순서를 확인합니다.',concept:'예외를 던지면 일치하는 catch를 찾는 동안 생성이 완료된 지역 객체가 역순으로 파괴됩니다. 소멸자는 예외를 밖으로 던지지 않도록 설계하는 것이 기본입니다.',
  visual:['생성 → 예외 → 소멸','catch에서 처리','스택이 풀리며 지역 객체가 정리됩니다'],predict:'catch의 출력보다 소멸자의 출력이 먼저 나올까요?',
  code:`#include <iostream>\n#include <stdexcept>\nstruct Guard {\n    ~Guard() { std::cout << "cleanup\\n"; }\n};\nint main() {\n    try {\n        Guard guard;\n        throw std::runtime_error("problem");\n    } catch (const std::exception&) {\n        std::cout << "caught\\n";\n    }\n}\n`,
  task:'예외를 던지기 전 "work"를 출력해 work, cleanup, caught 순서를 확인하세요.',hint:'std::cout << "work\\n";',
  solution:`#include <iostream>\n#include <stdexcept>\nstruct Guard {\n    ~Guard() { std::cout << "cleanup\\n"; }\n};\nint main() {\n    try {\n        Guard guard;\n        std::cout << "work\\n";\n        throw std::runtime_error("problem");\n    } catch (const std::exception&) {\n        std::cout << "caught\\n";\n    }\n}\n`,expectedOutput:'work\ncleanup\ncaught',
  explain:[['throw','예외 객체를 던져 현재 흐름을 중단합니다.'],['catch (const std::exception&)','예외를 참조로 받아 처리합니다.'],['스택 풀기','catch에 도달하기 전 수명이 끝나는 지역 객체를 정리합니다.']],takeaway:'RAII는 예외가 발생해도 객체 수명에 묶인 자원을 정리하는 데 도움을 줍니다.'}),
 lesson({id:'cpp-shared',title:'shared_ptr로 공동 소유 관찰하기',short:'shared_ptr · 소유자 수',
  lead:'여러 변수가 하나의 객체를 공동 소유할 때 수명이 어떻게 이어지는지 확인합니다.',concept:'shared_ptr을 복사하면 소유권을 공유합니다. 마지막 소유자가 없어질 때 객체가 정리됩니다. use_count는 이 작은 단일 스레드 예제에서 소유자 수를 관찰하기 위해 사용합니다.',
  visual:['first → 객체 ← second','소유자 수 2','마지막 소유자가 사라질 때 정리'],predict:'second가 블록을 벗어난 뒤 first.use_count()는 얼마일까요?',
  code:`#include <iostream>\n#include <memory>\nint main() {\n    auto first = std::make_shared<int>(7);\n    {\n        auto second = first;\n        std::cout << first.use_count() << " " << *second << "\\n";\n    }\n    std::cout << first.use_count() << "\\n";\n}\n`,
  task:'초기값을 9로 바꿔 첫 줄에 2 9, 다음 줄에 1을 출력하세요.',hint:'std::make_shared<int>(9)',
  solution:`#include <iostream>\n#include <memory>\nint main() {\n    auto first = std::make_shared<int>(9);\n    {\n        auto second = first;\n        std::cout << first.use_count() << " " << *second << "\\n";\n    }\n    std::cout << first.use_count() << "\\n";\n}\n`,expectedOutput:'2 9\n1',
  explain:[['std::make_shared','공동 소유할 객체를 만들고 shared_ptr을 반환합니다.'],['use_count()','현재 공유 소유자 수를 관찰합니다. 일반적인 동기화 수단으로 사용하지 않습니다.']],takeaway:'공유 소유가 필요한 경우에만 shared_ptr을 사용하고 소유권 관계를 분명히 합니다.'}),
 lesson({id:'cpp-weak',title:'weak_ptr로 소유하지 않고 관찰하기',short:'weak_ptr · lock · 수명',
  lead:'객체의 수명을 늘리지 않고 안전하게 접근 가능한지 확인합니다.',concept:'weak_ptr은 shared_ptr이 관리하는 객체를 관찰하지만 공동 소유자가 아닙니다. lock()은 객체가 살아 있으면 임시 shared_ptr을 반환하고, 이미 파괴됐다면 빈 포인터를 반환합니다.',
  visual:['weak_ptr → 관찰','lock 성공 또는 실패','객체 수명을 소유하지 않습니다'],predict:'마지막 shared_ptr이 사라진 뒤 lock()은 어떤 결과를 반환할까요?',
  code:`#include <iostream>\n#include <memory>\nint main() {\n    std::weak_ptr<int> observer;\n    {\n        auto owner = std::make_shared<int>(7);\n        observer = owner;\n        if (auto value = observer.lock()) std::cout << *value << "\\n";\n    }\n    std::cout << (observer.expired() ? "expired" : "alive") << "\\n";\n}\n`,
  task:'소유 객체를 9로 바꿔 첫 줄 9, 둘째 줄 expired를 출력하세요.',hint:'std::make_shared<int>(9)',
  solution:`#include <iostream>\n#include <memory>\nint main() {\n    std::weak_ptr<int> observer;\n    {\n        auto owner = std::make_shared<int>(9);\n        observer = owner;\n        if (auto value = observer.lock()) std::cout << *value << "\\n";\n    }\n    std::cout << (observer.expired() ? "expired" : "alive") << "\\n";\n}\n`,expectedOutput:'9\nexpired',
  explain:[['std::weak_ptr','소유권 없이 shared_ptr의 객체를 관찰합니다.'],['lock()','접근 시점에 객체가 살아 있으면 안전한 임시 소유권을 얻습니다.']],takeaway:'접근할 때 lock의 성공 여부를 확인하고, 수명을 늘려야 할 때만 결과를 보관합니다.'}),
 lesson({id:'cpp-span',title:'span으로 배열을 복사하지 않고 보기',short:'C++20 · span · 수명',
  lead:'원본 데이터의 연속 구간을 함수에 전달합니다.',concept:'std::span은 연속된 원소를 가리키는 비소유 뷰입니다. 복사본이 아니므로 원본이 살아 있고 재할당 등으로 무효화되지 않아야 합니다. std::span<const int>는 이 뷰를 통한 변경을 허용하지 않습니다.',
  visual:['vector → span → 함수','원본을 읽는 뷰','원본의 수명이 뷰보다 길어야 합니다'],predict:'vector가 사라진 뒤 span을 사용해도 안전할까요?',
  code:`#include <iostream>\n#include <span>\n#include <vector>\nint sum(std::span<const int> numbers) {\n    int total = 0;\n    for (int n : numbers) total += n;\n    return total;\n}\nint main() {\n    std::vector<int> values{1, 2, 3};\n    std::cout << sum(values) << "\\n";\n}\n`,
  task:'values에 4를 추가해 합계 10을 출력하세요.',hint:'std::vector<int> values{1, 2, 3, 4};',
  solution:`#include <iostream>\n#include <span>\n#include <vector>\nint sum(std::span<const int> numbers) {\n    int total = 0;\n    for (int n : numbers) total += n;\n    return total;\n}\nint main() {\n    std::vector<int> values{1, 2, 3, 4};\n    std::cout << sum(values) << "\\n";\n}\n`,expectedOutput:'10',
  explain:[['std::span<const int>','연속된 정수 구간을 읽기 위한 비소유 뷰입니다.'],['원본의 수명','원본 소멸이나 재할당 후 기존 span을 사용하면 안 됩니다.']],takeaway:'span은 데이터를 소유하지 않으므로 원본의 수명과 무효화 조건을 확인합니다.'}),
 lesson({id:'cpp-string-view',title:'string_view와 원본의 수명',short:'string_view · 비소유 문자열',
  lead:'문자열을 복사하지 않고 잠시 읽는 뷰를 사용합니다.',concept:'std::string_view는 문자 데이터를 소유하지 않습니다. 원본 문자열이 살아 있고 참조가 무효화되지 않은 동안에만 사용합니다. 길이를 별도로 보관하므로 null 종료를 보장하지 않습니다.',
  visual:['string → string_view','복사 없이 일부 읽기','원본이 유효해야 합니다'],predict:'원본 문자열이 소멸한 뒤 뷰를 읽으면 안전할까요?',
  code:`#include <iostream>\n#include <string>\n#include <string_view>\nint main() {\n    std::string name = "hello";\n    std::string_view view = name;\n    std::cout << view.substr(0, 2) << "\\n";\n}\n`,
  task:'앞의 3개 문자를 출력하도록 바꿔 hel을 출력하세요.',hint:'view.substr(0, 3)',
  solution:`#include <iostream>\n#include <string>\n#include <string_view>\nint main() {\n    std::string name = "hello";\n    std::string_view view = name;\n    std::cout << view.substr(0, 3) << "\\n";\n}\n`,expectedOutput:'hel',
  explain:[['std::string_view','문자열을 소유하지 않고 구간만 가리킵니다.'],['substr(0, 3)','처음부터 세 바이트 길이의 뷰를 만듭니다.']],takeaway:'비소유 뷰를 사용할 때 원본 수명과 참조 무효화를 먼저 확인합니다.'})
);
