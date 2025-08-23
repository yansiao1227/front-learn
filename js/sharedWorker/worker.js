// worker.js
let connections = [];

onconnect = function (event) {
  const port = event.ports[0];
  connections.push(port);

  // 接收消息
  port.onmessage = function (e) {
    console.log("Worker 收到:", e.data);

    // 把消息广播给所有连接的页面
    connections.forEach(p => {
      if (p !== port) {  // 不回发给自己
        p.postMessage(e.data);
      }
    });
  };

  // 通知页面已连接
  port.postMessage("✅ 已连接到 SharedWorker");
};
