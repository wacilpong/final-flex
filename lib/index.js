// 1. 고정형 그리드
const createArray = (total, col) => Array(total % col).fill(0);
const createVirtualBox = (total, col = 5) => createArray(total, col);

console.log(createVirtualBox(10, 4));
