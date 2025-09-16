var coinChange = function (coins, amount) {
  if (amount === 0) {
    return 0;
  }
  let dp = [];
  for (let i = 0; i <= amount; i++) {
    if (coins.includes(i)) {
      dp.push(1);
    } else {
      dp.push(Infinity);
    }
  }
  for (let i = Math.min(...coins); i < dp.length; i++) {
    if (!coins.includes(i)) {
      let temp = [];
      coins.forEach((item) => {
        if (i - item > 0) temp.push(dp[i - item]);
      });
      dp[i] = Math.min(...temp) + 1;
    }
  }
  return dp[amount] !== Infinity ? dp[amount] : -1;
};
console.log(coinChange([186, 419, 83, 408], 6249));
