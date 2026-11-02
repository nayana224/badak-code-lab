// Independent lesson inspired by visual explanations of shallow copying.
// The browser drawing uses only values and Python identity comparisons recorded below.
const beforeCode = `original = [[1, 2], [3, 4]]
copied = original.copy()

record("shallow_copy", original=original, copied=copied,
       same_outer=original is copied,
       same_inner=[left is right for left, right in zip(original, copied)])

copied[0][0] = 9
record("shallow_copy", original=original, copied=copied,
       same_outer=original is copied,
       same_inner=[left is right for left, right in zip(original, copied)])

copied[1] = [7, 8]
record("shallow_copy", original=original, copied=copied,
       same_outer=original is copied,
       same_inner=[left is right for left, right in zip(original, copied)])
print("original:", original)
print("copied:", copied)
`;
export const shallowCopyLessons = [{
 id:'py-shallow-copy-trace', runtime:'python', group:'Python 문법', title:'얕은 복사: 안쪽 리스트는 공유될까?', short:'shallow copy · is · 중첩 리스트', time:'20분',
 lead:'바깥 리스트를 복사한 뒤 안쪽 값을 바꾸고, 안쪽 리스트 자체도 교체해 봅니다.',
 concept:'list.copy()는 새 바깥 리스트를 만들지만 안에 들어 있던 객체는 그대로 참조합니다. copied[0][0] 변경은 공유된 안쪽 리스트를 바꾸고, copied[1]에 새 리스트를 대입하면 copied의 두 번째 연결만 바뀝니다.',
 visual:['새 바깥 리스트 두 개','안쪽 리스트는 처음에 공유','값 변경과 연결 교체를 비교합니다'],
 predict:'얕은 복사 후 copied[0][0]을 바꾸면 original[0][0]도 바뀔까요?',
 code:beforeCode, solution:beforeCode.replace('copied[0][0] = 9', 'copied[0][0] = 10'), referenceComplete:true, trace:true,
 task:'copied[0][0]에 10을 넣고, 두 번째 안쪽 리스트는 [7, 8]로 교체하세요. 실행 기록에서 안쪽 리스트의 공유 관계와 실제 값을 단계별로 비교하세요.',
 hint:'copied[0][0] = 10',
 check:`assert original == [[10, 2], [3, 4]], "공유된 첫 번째 안쪽 리스트의 변경을 확인하세요."
assert copied == [[10, 2], [7, 8]], "복사본의 두 번째 연결을 새 리스트로 바꾸세요."
assert original is not copied and original[0] is copied[0] and original[1] is not copied[1], "바깥과 안쪽 리스트의 실제 객체 관계를 확인하세요."`,
 explain:[['얕은 복사와 중첩 리스트','바깥 리스트만 새로 만들고 안쪽 리스트는 처음에 공유합니다.'],['is와 ==','is는 같은 객체인지, ==는 값이 같은지를 비교합니다.'],['record("shallow_copy", ...)','실습실 전용 도구가 실제 리스트 값과 is 비교 결과를 기록합니다. Python 표준 함수는 아닙니다.']],
 takeaway:'공유된 안쪽 객체의 변경과 바깥 리스트에서 한 연결을 바꾸는 일은 다릅니다.'
}];
export const shallowCopyQuizzes = {
 'py-shallow-copy-trace':{question:'b = a.copy() 이후 b[0][0]을 바꾸면 a[0][0]은?',options:['같은 안쪽 리스트를 공유하므로 함께 바뀐다','바깥을 복사했으므로 항상 그대로다'],answer:0,explanation:'얕은 복사는 새 바깥 리스트를 만들지만 기존 안쪽 리스트는 공유합니다. 안쪽 리스트 자체를 새 객체로 교체하는 것과 구분하세요.'}
};
export const shallowCopyExamples = {
 '얕은 복사와 중첩 리스트':'a = [[1]]; b = a.copy()이면 a is b는 False지만 a[0] is b[0]은 True입니다.',
 'is와 ==':'a = [1]; b = [1]이면 a == b는 True이지만 a is b는 False입니다.',
 'record("shallow_copy", ...)':'두 리스트의 값과 각 위치의 is 비교 결과를 기록해 실행 시점의 상태를 그림으로 표시합니다.'
};
