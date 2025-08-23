const debounce = (func, delay = 300) => {
  let timer = 0;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
// example
const debounceFunc = debounce(() => {
  console.log('debounce'+Date.now());
}, 1000);
debounceFunc();
debounceFunc();
debounceFunc();