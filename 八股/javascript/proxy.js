const arr = [1, 2, 3, 4, 5, 6];
// 负数索引
const proxyArr = new Proxy(arr, {
  get(target, key) {
    if (key < 0) {
      key = target.length + Number(key);
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (key < 0) {
      key = target.length + Number(key);
    }
    return Reflect.set(target, key, value);
  },
});
console.log(proxyArr,proxyArr[-1]);
proxyArr[-1] = 100;
console.log(proxyArr,proxyArr[-1]);
