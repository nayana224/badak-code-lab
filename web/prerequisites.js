// Suggested cross-course starting points; these do not lock lessons.
const prerequisites = {
 'tensor':['shape','broadcast'],
 'autograd':['math-derivative','math-chain'],
 'torch-attention':['math-dot','torch-softmax'],
 'torch-causal-attention':['torch-attention'],
 'project-python-scores':['py-validation','py-functions'],
 'project-cpp-summary':['cpp-vector','cpp-algorithm','cpp-optional'],
 'project-torch-prediction':['torch-manual-neuron','torch-loss-mean']
};
export function recommendedLessons(current, inCourse, allLessons) {
 const explicit = prerequisites[current.id];
 const index = inCourse.findIndex(item => item.id === current.id);
 const ids = explicit || (index > 0 ? [inCourse[index-1].id] : []);
 return ids.map(id => allLessons.find(item => item.id === id)).filter(Boolean);
}
