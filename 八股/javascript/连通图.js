let graph = {
  nodes: [
    { id: 1, label: 1 },
    { id: 2, label: 3 },
    { id: 3, label: 1 },
    { id: 4, label: 1 },
    { id: 5, label: 1 },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 1, to: 5 },
  ],
};

// 创建一个映射，用于快速查找节点的邻居
let adjacencyList = new Map();
graph.nodes.forEach((node) => {
  adjacencyList.set(node.id, []);
});
graph.edges.forEach((edge) => {
  adjacencyList.get(edge.from).push(edge.to);
  adjacencyList.get(edge.to).push(edge.from);
});

// 用于标记节点是否已被访问
let visited = new Set();

// 用于根据节点ID查找节点对象
let nodeMap = new Map();
graph.nodes.forEach((node) => {
  nodeMap.set(node.id, node);
});

function dfs(nodeId) {
  let stack = [nodeId];
  let count = 0;
  while (stack.length > 0) {
    let current = stack.pop();
    if (!visited.has(current)) {
      visited.add(current);
      count++;
      let currentNode = nodeMap.get(current);
      adjacencyList.get(current).forEach((neighbor) => {
        let neighborNode = nodeMap.get(neighbor);
        if (
          !visited.has(neighbor) &&
          currentNode.label === neighborNode.label
        ) {
          stack.push(neighbor);
        }
      });
    }
  }
  return count;
}

let maxConnectedComponentSize = 0;

graph.nodes.forEach((node) => {
  if (!visited.has(node.id)) {
    let size = dfs(node.id);
    if (size > maxConnectedComponentSize) {
      maxConnectedComponentSize = size;
    }
  }
});

console.log("最大连通块的成员个数为:", maxConnectedComponentSize);
