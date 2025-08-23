const throttle = (func, delay = 300) => {
  let timer = 0;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = 0;
      }, delay);
    }
  };
};

// example
const throttleFunc = throttle(() => {
  console.log('throttle'+Date.now());
}, 1000);

throttleFunc();
throttleFunc();
throttleFunc();
