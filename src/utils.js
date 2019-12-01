export const deepCopy = (value) => JSON.parse(JSON.stringify(value));

export const createMatrix = (width, height, defaultValue) => new Array(height)
  .fill(defaultValue)
  .map(() => new Array(width).fill(defaultValue));

export const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const flatArray = (array2D) => {
  return array2D.reduce((acc, e) => {
    return [...acc, ...e]
  }, [])
}

const count = (array) => array.reduce((acc, e) => {
  acc[e] = (acc[e] || 0) + 1;
  return acc
}, {})

const uniq = (array) =>  [...new Set(array)]

export const getDifference = (a, b) => {
  const A  = count(flatArray(a).filter(e => e));
  const B  = count(flatArray(b).filter(e => e));
  const keys = uniq([...Object.keys(A), ...Object.keys(B)]);
  return keys.reduce((acc, key) => acc + Number(key) * Math.abs(Number(A[key] || 0) - Number(B[key] || 0)), 0) / 2

}