const createArray = (total, col) => Array(total - (total % col)).fill(0);
export const createHiddenBox = (total, col) => createArray(total, col);
