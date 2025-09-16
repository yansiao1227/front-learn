// node环境下没有window
console.log("globalThis", globalThis);
globalThis.testName = "Jenny";
function person() {
  console.log("this", this);
  return this.testName;
}
console.log(person()); //Jenny

// 箭头函数的this
const obj = {
  a: {
    name: "a",
    b: () => {
      console.log(this);
    },
  },
};
// window 因为 JavaScript 没有块作用域，所以在定义 sayThis 的时候，里面的 this 就绑到 window 上去了
obj.a.b();
// window 浏览器中的 global 对象
const globalB = obj.a.b;
globalB();





