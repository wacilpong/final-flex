const createArray = (total, col) => Array(col - (total % col)).fill(0);
export const createHiddenBox = (total, col) => createArray(total, col);
