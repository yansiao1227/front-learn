const memorize = (func, context = this) => {
  // 纯净对象，不带Object原型链上的方法
  const cache = Object.create(null);
  return (...key) => {
    if (!cache[key.toString()]) {
      cache[key.toString()] = func.apply(context, key);
    }
    return cache[key.toString()];
  };
};
const add = (a, b) => {
  return a + b;
};
const memoAdd = memorize(add);
console.log(memoAdd(1, 2));
console.log(memoAdd(1, 2));
