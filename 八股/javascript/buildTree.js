function buildTree(paths) {
  const tree = {};

  paths.forEach((path) => {
    const parts = path.split("/");
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  });

  return tree;
}

// 示例数组
const filePaths = [
  "src/utils/helpers.js",
  "src/utils/math.js",
  "src/utils/math/add.js",
  "src/utils/math/subtract.js",
  "src/index.js",
  "src/styles/main.css",
];

// 构建树形结构
const tree = buildTree(filePaths);

// 输出树形结构
console.log(JSON.stringify(tree, null, 2));
