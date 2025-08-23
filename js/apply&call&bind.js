// 手写实现apply、call和bind方法

// 手写实现apply
Function.prototype.myApply = function(context, args) {
  // 处理context为null或undefined的情况，默认指向全局对象
  context = context || globalThis;
  
  // 为context创建一个唯一的属性，避免属性名冲突
  const key = Symbol();
  
  // 将当前函数（this）赋值给context的这个唯一属性
  context[key] = this;
  
  // 执行函数并传入参数数组
  const result = args ? context[key](...args) : context[key]();
  
  // 删除添加的属性
  delete context[key];
  
  // 返回函数执行结果
  return result;
};

// 手写实现call
Function.prototype.myCall = function(context, ...args) {
  // 直接利用已实现的myApply方法
  return this.myApply(context, args);
};

// 手写实现bind
Function.prototype.myBind = function(context, ...args1) {
  // 保存原函数的引用
  const self = this;
  
  // 返回一个新函数
  return function(...args2) {
    // 合并参数并调用原函数的myApply方法
    return self.myApply(context, [...args1, ...args2]);
  };
};

function fn(...args){
    console.log(this.myname,args);
}
let testObj = {
    myname:"张三"
}
let bindFn = fn.myBind(testObj,"123");
bindFn("456");