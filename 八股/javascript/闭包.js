function test() {
  let a = 0;
  return () => {
    a++;
    console.log(a);
  };
}
const fn = test();
fn(); // 1
fn(); // 2
