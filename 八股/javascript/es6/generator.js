function* generator(obj) {
  for (let key in obj) {
    yield { key: key, value: obj[key] };
  }
}

const obj = { a: 1, b: 2, c: 3 };

for (let item of generator(obj)) {
  console.log(item);
}
