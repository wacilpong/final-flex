// 1. 고정형
const createArray = (total, col) => Array(total % col).fill(0);
export const createVirtualBox = (total, col) => createArray(total, col);
