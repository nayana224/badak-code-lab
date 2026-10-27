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
