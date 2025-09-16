// const Shape = {
//   triangle: "triangle",
//   square: "square",
//   rectangle: "rectangle",
// };

const Shape = {
  triangle: Symbol(),
  square: Symbol(),
  rectangle: Symbol(),
};

function area(shape, options) {
  switch (shape) {
    case Shape.triangle:
      return 0.5 * options.width * options.height;
    case Shape.square:
      return options.length * options.length;
    case Shape.rectangle:
      return options.width * options.height;
  }
  return 0;
}

console.log(area(Shape.triangle, { width: 50, height: 100 }));
console.log(area(Shape.square, { length: 50 }));
console.log(area(Shape.rectangle, { width: 50, height: 100 }));
