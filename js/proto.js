console.log(Function.__proto__ === Function.prototype); // true
function Foo() {}

// 查看构造器指向
console.log(Foo.prototype.constructor); // Foo
console.log(Foo.__proto__.constructor); // Function

const foo = new Foo();
// Foo作为构造函数
console.log(foo.__proto__ === Foo.prototype); // true
// Foo作为Function构造函数的实例对象
console.log(Foo.__proto__ === Function.prototype); // true

// 原型链继承，两个实例使用的是同一个原型对象，内存空间是共享的
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {
  this.type = "child";
}
Child.prototype = new Parent();
const child1 = new Child();
const child2 = new Child();
child1.play.push(4);
console.log(child1.play, child2.play);
console.log(child1.getName());

// 构造函数继承,父类 原型对象 中一旦存在父类之前自己定义的方法，那么子类将 无法继承 这些方法
function Parent1() {
  this.name = "parent1";
}

Parent1.prototype.getName = function () {
  return this.name;
};

function Child1() {
  Parent1.call(this);
  this.type = "child";
}
let child = new Child1();
console.log(child); // 没问题
// console.log(child.getName()); // 会报错

// 混合继承
function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
    return this.name;
}
function Child3() {
    // 第二次调用 Parent3()
    Parent3.call(this);
    this.type = 'child3';
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
console.log(Child3.prototype.constructor); // Parent3
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
console.log(Child3.prototype.constructor); // Child3

var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'

// 利用class和extends
class Person {
  constructor(name) {
    this.name = name
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log('Person:', this.name)
  }
}
class Gamer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    super(name)
    this.age = age
  }
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法