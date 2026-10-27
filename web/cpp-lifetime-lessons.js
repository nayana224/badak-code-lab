// Short, independent C++20 examples. No dangling pointer is dereferenced.
const make = (value) => ({runtime:'cpp', group:'객체 수명 · 소유권', time:'15분', referenceComplete:true, ...value});
export const cppLifetimeLessons = [
 make({
  id:'cpp-vector-copy',title:'vector 복사와 독립적인 변경',short:'vector · 값 복사',
  lead:'벡터를 복사한 뒤 한쪽만 바꿔 두 객체가 독립적임을 확인합니다.',
  concept:'std::vector를 다른 vector로 복사하면 원소도 복사됩니다. 정수 원소를 가진 이 예제에서는 복사본을 바꿔도 원본 원소는 변하지 않습니다.',
  visual:['original → copy','원본과 복사본은 각각 보관','한쪽 변경은 다른 쪽을 바꾸지 않습니다'],
  predict:'복사본의 첫 원소만 9로 바꾸면 원본의 첫 원소는 무엇일까요?',
  code:'#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> original{1, 2};\n    auto copy = original;\n    copy[0] = 7;\n    std::cout << original[0] << " " << copy[0] << "\\n";\n}\n',
  task:'copy의 첫 원소를 9로 바꿔 1 9를 출력하세요.',hint:'copy[0] = 9;',
  solution:'#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> original{1, 2};\n    auto copy = original;\n    copy[0] = 9;\n    std::cout << original[0] << " " << copy[0] << "\\n";\n}\n',expectedOutput:'1 9',
  explain:[['auto copy = original','새 벡터를 원본의 원소들로 복사하여 만듭니다.'],['copy[0]','복사본의 첫 원소에 접근합니다. 유효한 인덱스인지 확인해야 합니다.']],
  takeaway:'vector<int> 복사는 별도의 원소들을 만듭니다. 포인터 등을 원소로 가진 경우에는 가리키는 대상까지 자동 복사되는 것은 아닙니다.'
 }),
 make({
  id:'cpp-copy-move',title:'복사 생성과 이동 생성 구분하기',short:'복사 생성자 · 이동 생성자',
  lead:'작은 객체가 어떤 생성자로 만들어지는지 실제 출력으로 관찰합니다.',
  concept:'이 예제의 복사 생성자와 이동 생성자는 어떤 생성자가 호출됐는지 출력합니다. std::move는 객체를 옮기는 연산 그 자체가 아니라 이동에 적합한 표현식으로 바꿉니다.',
  visual:['원본 → 복사 → copy','원본 → move → moved','선택된 생성자를 출력합니다'],
  predict:'std::move(source)를 넘기면 이 예제에서는 어느 생성자가 호출될까요?',
  code:'#include <iostream>\n#include <utility>\nstruct Item {\n    int value;\n    explicit Item(int v) : value(v) {}\n    Item(const Item& other) : value(other.value) { std::cout << "copy\\n"; }\n    Item(Item&& other) noexcept : value(other.value) { std::cout << "move\\n"; }\n};\nint main() {\n    Item source(7);\n    Item copy(source);\n    Item moved(std::move(source));\n    std::cout << copy.value << " " << moved.value << "\\n";\n}\n',
  task:'source의 초기값을 9로 바꿔 copy, move, 9 9를 세 줄로 출력하세요.',hint:'Item source(9);',
  solution:'#include <iostream>\n#include <utility>\nstruct Item {\n    int value;\n    explicit Item(int v) : value(v) {}\n    Item(const Item& other) : value(other.value) { std::cout << "copy\\n"; }\n    Item(Item&& other) noexcept : value(other.value) { std::cout << "move\\n"; }\n};\nint main() {\n    Item source(9);\n    Item copy(source);\n    Item moved(std::move(source));\n    std::cout << copy.value << " " << moved.value << "\\n";\n}\n',expectedOutput:'copy\nmove\n9 9',
  explain:[['Item(const Item& other)','다른 객체를 읽어 새 객체를 만드는 복사 생성자입니다.'],['Item(Item&& other)','이동 가능한 객체에서 새 객체를 만드는 이동 생성자입니다. 이 예제는 int 값을 복사하여 보여 줍니다.'],['std::move(source)','source를 이동에 사용할 수 있는 표현식으로 변환합니다. 실제 이동 동작은 타입이 정의합니다.']],
  takeaway:'이동 후 상태는 타입에 따라 다릅니다. 임의의 이동된 객체가 비었다고 가정하지 마세요.'
 }),
 make({
  id:'cpp-vector-reallocation',title:'vector 재할당과 참조 수명',short:'capacity · 재할당 · 무효화',
  lead:'용량을 넘어 원소를 추가하면 기존 참조를 다시 사용하면 안 되는 이유를 살펴봅니다.',
  concept:'vector가 재할당하면 기존 원소를 가리키던 포인터·참조·반복자가 무효화됩니다. 안전하게 관찰하기 위해 예제는 이전 참조를 보관하거나 사용하지 않고 용량 변화를 확인합니다.',
  visual:['원본 용량 → 용량 초과','재할당 → 이전 참조 무효화','원소는 다시 인덱스로 접근합니다'],
  predict:'capacity보다 더 많은 원소를 넣으면 vector는 재할당할까요?',
  code:'#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> values;\n    values.reserve(2);\n    const auto old_capacity = values.capacity();\n    while (values.size() <= old_capacity) values.push_back(7);\n    const bool grew = values.capacity() > old_capacity;\n    std::cout << (grew ? "grown" : "same") << " " << values[0] << "\\n";\n}\n',
  task:'추가하는 값을 9로 바꿔 grown 9를 출력하세요. 이전 참조를 사용하지 마세요.',hint:'values.push_back(9);',
  solution:'#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> values;\n    values.reserve(2);\n    const auto old_capacity = values.capacity();\n    while (values.size() <= old_capacity) values.push_back(9);\n    const bool grew = values.capacity() > old_capacity;\n    std::cout << (grew ? "grown" : "same") << " " << values[0] << "\\n";\n}\n',expectedOutput:'grown 9',
  explain:[['reserve(2)','최소 2개 원소를 위한 용량을 요청합니다. 실제 용량이 정확히 2라는 보장은 없습니다.'],['capacity()','재할당 없이 담을 수 있는 현재 원소 수를 반환합니다.'],['push_back(9)','벡터 끝에 원소를 추가합니다. 용량을 초과하면 재할당합니다.']],
  takeaway:'용량이 변경되는 재할당 뒤에는 이전 포인터·참조·반복자를 사용하지 않습니다.'
 }),
 make({
  id:'cpp-scope-lifetime',title:'블록을 벗어나면 객체는 언제 사라질까?',short:'블록 · 객체 수명 · 소멸',
  lead:'중첩된 블록에서 지역 객체가 정리되는 순서를 출력해 봅니다.',
  concept:'자동 저장 기간을 가진 지역 객체는 자신의 블록을 벗어나면 소멸합니다. 여러 객체는 생성의 역순으로 소멸합니다.',
  visual:['outer 생성 → inner 생성','inner 소멸 → outer 소멸','중첩 블록의 수명을 확인합니다'],
  predict:'inner와 outer 중 어떤 객체가 먼저 소멸할까요?',
  code:'#include <iostream>\nstruct Watch {\n    const char* name;\n    explicit Watch(const char* n) : name(n) {}\n    ~Watch() { std::cout << name << " end\\n"; }\n};\nint main() {\n    Watch outer("outer");\n    { Watch inner("inner"); }\n    std::cout << "middle\\n";\n}\n',
  task:'inner 블록 안에서 work를 출력해 work, inner end, middle, outer end 순서로 확인하세요.',hint:'std::cout << "work\\n";',
  solution:'#include <iostream>\nstruct Watch {\n    const char* name;\n    explicit Watch(const char* n) : name(n) {}\n    ~Watch() { std::cout << name << " end\\n"; }\n};\nint main() {\n    Watch outer("outer");\n    { Watch inner("inner"); std::cout << "work\\n"; }\n    std::cout << "middle\\n";\n}\n',expectedOutput:'work\ninner end\nmiddle\nouter end',
  explain:[['~Watch()','객체 수명이 끝날 때 호출되는 소멸자입니다.'],['중첩 블록 { ... }','inner가 살아 있는 범위를 만듭니다. 이 예제의 name은 문자열 리터럴을 가리킵니다.']],
  takeaway:'지역 객체는 블록을 벗어날 때 소멸하며 수명이 끝난 객체를 참조해서는 안 됩니다.'
 })
];
