// Explicit recommendations link concepts that are reused later, without locking lessons.
export const cppPrerequisites = {
 'cpp-vector': ['cpp-control', 'cpp-reference'],
 'cpp-search': ['cpp-control', 'cpp-function', 'cpp-vector'],
 'cpp-sort': ['cpp-control', 'cpp-vector'],
 'cpp-range-loop': ['cpp-vector', 'cpp-reference', 'cpp-auto'],
 'cpp-template': ['cpp-function', 'cpp-auto'],
 'cpp-concepts': ['cpp-template'],
 'cpp-algorithm': ['cpp-vector', 'cpp-string'],
 'cpp-lambda': ['cpp-function', 'cpp-algorithm'],
 'cpp-raii': ['cpp-class'],
 'cpp-exception': ['cpp-raii', 'cpp-scope-lifetime'],
 'cpp-copy-move': ['cpp-reference', 'cpp-vector-copy'],
 'cpp-vector-reallocation': ['cpp-vector', 'cpp-reference'],
 'cpp-unique': ['cpp-raii', 'cpp-scope-lifetime'],
 'cpp-move': ['cpp-unique', 'cpp-copy-move'],
 'cpp-shared': ['cpp-unique', 'cpp-scope-lifetime'],
 'cpp-weak': ['cpp-shared'],
 'cpp-ranges': ['cpp-vector', 'cpp-lambda'],
 'cpp-span': ['cpp-vector-reallocation', 'cpp-reference'],
 'cpp-string-view': ['cpp-string', 'cpp-scope-lifetime'],
 'project-cpp-summary': ['cpp-vector', 'cpp-algorithm', 'cpp-optional']
};
