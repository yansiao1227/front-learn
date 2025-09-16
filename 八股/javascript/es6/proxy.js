// const obj = {
//   _name: "test",
//   get name() {
//     return this._name;
//   },
// };
// const proxyObj = new Proxy(obj, {
//   get(target, property, receiver) {
//     return Reflect.get(target, property, receiver);
//   },
// });

// const child = {
//   _name: "child",
// };
// Reflect.setPrototypeOf(child, proxyObj);

// console.log(child.name);
// console.log(proxyObj.name);

// 负数索引
const testArray = [1, 2, 3, 4, 5];
const proxyArray = new Proxy(testArray, {
  get(target, property, receiver) {
    if (property < 0) {
      property = String(target.length + Number(property));
    }
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    if (property < 0) {
      property = String(target.length + Number(property));
    }
    return Reflect.set(target, property, value, receiver);
  },
});
proxyArray[-1] = 10;
console.log(proxyArray[proxyArray.length - 1]);
