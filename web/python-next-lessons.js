// Python 입문: 수업의 완성 예제를 아래 입력창에 직접 작성해 실행합니다.
export const pythonNextLessons = [
 {
  id:'py-strings', runtime:'python', group:'Python 문법', title:'문자열을 정리하고 이어 붙이기', short:'str · strip · 문자열 결합', time:'10분',
  lead:'문자를 따옴표로 감싸 문자열로 만들고, 앞뒤 공백을 정리해 봅니다.',
  concept:'문자열은 순서가 있는 문자 데이터입니다. strip()은 양쪽 끝의 공백을 제거한 새 문자열을 반환합니다. +는 두 문자열을 이어 붙입니다.',
  visual:['"  민수  " → strip()','"민수"','문자열은 숫자가 아닌 문자 데이터입니다'],
  predict:'"  민수  ".strip()은 중간 공백도 제거할까요? "3" + "4"는 어떤 값일까요?',
  code:'name = "  민수  "\nclean_name = name.strip()\nmessage = "안녕, " + clean_name\nprint(message)\n',
  task:'name을 "  지수  "로 바꾸고 공백을 제거한 뒤 message에 "안녕, 지수"를 저장해 출력하세요.',
  hint:'name = "  지수  "',
  solution:'name = "  지수  "\nclean_name = name.strip()\nmessage = "안녕, " + clean_name\nprint(message)\n',
  check:'assert name == "  지수  " and clean_name == "지수", "strip()으로 앞뒤 공백을 제거하세요."\nassert message == "안녕, 지수", "정리한 이름을 문자열에 이어 붙이세요."',
  explain:[['str 문자열과 따옴표','따옴표 안의 문자를 문자열로 만듭니다. "3"은 숫자 3과 다른 값입니다.'],['strip()','문자열 양 끝의 공백을 제거한 새 문자열을 반환하며 원래 문자열은 바뀌지 않습니다.'],['문자열 + 문자열','두 문자열을 순서대로 이어 붙입니다. 숫자와 바로 더할 수는 없습니다.']],
  takeaway:'문자열 메서드의 결과를 새 변수에 저장해 사용합니다.'
 },
 {
  id:'py-bool', runtime:'python', group:'Python 문법', title:'두 조건을 함께 확인하기', short:'bool · and · or · not', time:'12분',
  lead:'참과 거짓을 나타내는 불리언 값으로 여러 조건을 결합합니다.',
  concept:'비교 연산은 True 또는 False를 만듭니다. and는 두 조건이 모두 참일 때 참입니다. or는 하나 이상 참일 때, not은 참과 거짓을 뒤집습니다.',
  visual:['점수 ≥ 60 그리고 출석','True and True → True','각 비교 결과를 먼저 살펴봅니다'],
  predict:'점수 80점이지만 출석하지 않았다면 두 조건을 and로 연결한 결과는 무엇일까요?',
  code:'score = 80\nattended = False\npassed = score >= 60 and attended\nprint("통과:", passed)\n',
  task:'attended를 True로 바꾸고 점수 조건과 출석 조건을 모두 만족해 passed가 True가 되게 하세요.',
  hint:'attended = True',
  solution:'score = 80\nattended = True\npassed = score >= 60 and attended\nprint("통과:", passed)\n',
  check:'assert score == 80 and attended is True, "출석 상태를 True로 바꾸세요."\nassert passed is True and passed == (score >= 60 and attended), "두 조건을 함께 확인하세요."',
  explain:[['bool, True, False','불리언은 참 또는 거짓을 나타냅니다. Python에서는 첫 글자를 대문자로 씁니다.'],['and, or, not','and는 모두 참, or는 하나 이상 참, not은 불리언 결과를 뒤집습니다.'],['score >= 60','점수가 60 이상인지 비교해 불리언 값을 만듭니다.']],
  takeaway:'비교 결과를 불리언으로 확인하고 조건을 결합합니다.'
 },
 {
  id:'py-errors', runtime:'python', group:'Python 문법', title:'오류를 읽고 예외를 처리하기', short:'ValueError · try · except', time:'15분',
  lead:'문자열을 숫자로 바꿀 수 없을 때 어떤 오류가 발생하는지 확인하고 처리합니다.',
  concept:'int()가 숫자로 해석할 수 없는 문자열을 받으면 ValueError를 발생시킵니다. 처리되지 않은 오류에는 발생한 줄과 오류 이름이 표시됩니다. try 안에서 해당 오류가 나면 except ValueError 블록이 실행됩니다.',
  visual:['int("12") → 12','int("hello") → ValueError','오류 종류와 메시지를 읽습니다'],
  predict:'int("4.5")는 정수 4가 될까요, ValueError를 발생시킬까요?',
  code:'def parse_number(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None\n\nresult = parse_number("hello")\nprint("결과:", result)\n',
  task:'parse_number("20")을 호출해 result에 20을 저장하세요. 숫자로 바꿀 수 없는 문자열은 None을 반환해야 합니다. 통과한 뒤 자유 실험으로 try 밖에서 int("hello")를 실행해 실제 오류의 마지막 줄을 읽어 보세요.',
  hint:'result = parse_number("20")',
  solution:'def parse_number(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None\n\nresult = parse_number("20")\nprint("결과:", result)\n',
  check:'assert result == 20, "숫자 문자열을 정수로 바꾸세요."\nassert parse_number(" 4 ") == 4 and parse_number("hello") is None and parse_number("4.5") is None, "숫자와 잘못된 문자열을 각각 처리하세요."',
  explain:[['int(text)','정수 문자열을 int로 변환합니다. 예를 들어 int("20")은 20입니다. 변환할 수 없는 문자열은 ValueError가 발생합니다.'],['try / except ValueError','try에서 ValueError가 발생하면 except 블록이 처리합니다. 다른 종류의 오류는 이 블록으로 처리하지 않습니다.'],['None','반환할 유효한 값이 없음을 나타내는 값입니다.']],
  takeaway:'오류의 종류와 발생한 줄을 확인하고, 예상한 오류만 처리합니다.'
 },
 {
  id:'py-validation', runtime:'python', group:'Python 문법', title:'숫자의 범위까지 확인하기', short:'입력 검증 · raise · ValueError', time:'15분',
  lead:'문자열이 정수인지와 점수가 허용 범위인지 각각 확인합니다.',
  concept:'정수로 바꿀 수 없는 문자열은 int()가 ValueError를 발생시킵니다. 변환에 성공하더라도 0~100 범위 밖이면 raise ValueError로 이유를 알려 줍니다. input() 대신 코드의 문자열로 실험합니다.',
  visual:['문자열 → 정수 변환','0 ≤ 점수 ≤ 100','변환과 범위를 각각 확인합니다'],
  predict:'"101"은 정수로 변환될까요? 점수 범위 검사도 통과할까요?',
  code:'def parse_score(text):\n    score = int(text)\n    if score < 0 or score > 100:\n        raise ValueError("점수는 0부터 100까지여야 합니다.")\n    return score\n\nresult = parse_score("75")\nprint("점수:", result)\n',
  task:'parse_score("100")을 호출해 result에 100을 저장하세요. 정수가 아니거나 0~100 범위 밖이면 ValueError를 발생시켜야 합니다.',
  hint:'result = parse_score("100")',
  solution:'def parse_score(text):\n    score = int(text)\n    if score < 0 or score > 100:\n        raise ValueError("점수는 0부터 100까지여야 합니다.")\n    return score\n\nresult = parse_score("100")\nprint("점수:", result)\n',
  check:'assert result == 100 and parse_score("0") == 0 and parse_score("50") == 50, "0과 100을 포함한 범위의 정수를 반환하세요."\nfor invalid in ("-1", "101", "abc", ""):\n    try:\n        parse_score(invalid)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError("범위를 벗어나거나 정수가 아니면 ValueError가 필요합니다.")',
  explain:[['int(text)','정수 문자열을 숫자로 변환합니다. 정수가 아니면 ValueError가 발생합니다.'],['score < 0 or score > 100','점수가 허용 범위 밖인지 양쪽 경계를 검사합니다.'],['raise ValueError(...)','값이 잘못되었음을 오류와 메시지로 호출자에게 알립니다.']],
  takeaway:'변환 가능 여부와 허용 범위를 분리해 검증하고, 실패 이유를 명확히 알립니다.'
 }
];
