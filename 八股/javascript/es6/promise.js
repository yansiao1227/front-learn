Promise.testAll = function (promises) {
  const results = [];
  const numPromises = promises.length;
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((result) => {
          count++;
          results[i] = result;
          if (count === numPromises) {
            return resolve(results);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  });
};

Promise.testRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p)
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};

Promise.testAllSettled = function (promises) {
  const results = [];
  const numPromises = promises.length;
  let count = 0;
  return new Promise((resolve) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((r) => {
          count++;
          results[i] = { status: "fulfilled", value: r };
          if (count === numPromises) {
            return resolve(results);
          }
        })
        .catch((e) => {
          count++;
          results[i] = { status: "rejected", reason: e };
          if (count === numPromises) {
            return resolve(results);
          }
        });
    });
  });
};

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 600);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 500);
});

Promise.testAll([p1, p2])
  .then((results) => {
    console.log("all results", results);
  })
  .catch((error) => {
    console.error("all error", error);
  });

Promise.testRace([p1, p2])
  .then((results) => {
    console.log("race results", results);
  })
  .catch((error) => {
    console.error("race error", error);
  });

Promise.testAllSettled([p1, p2]).then((results) => {
  console.log("all settled results", results);
});
