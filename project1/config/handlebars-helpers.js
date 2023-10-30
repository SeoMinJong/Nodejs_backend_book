export const lengthOfList = (list = []) => list.length;
export const eq = (val1, val2) => val1 === val2;
export const dateString = (isoString) => new Date(isoString).toLocaleDateString();