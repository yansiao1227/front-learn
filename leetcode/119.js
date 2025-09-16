function longestCommonSubstring(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // 创建一个二维 dp 数组
  let dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  let maxLength = 0; // 最长公共子串的长度
  let endIndexStr1 = 0; // 最长公共子串在 str1 中的结束位置

  // 动态规划计算公共子串
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // 如果匹配，长度加1
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endIndexStr1 = i - 1; // 更新最长公共子串在 str1 中的结束位置
        }
      }
    }
  }

  // 获取最长公共子串
  const longestCommonSubstr = str1.slice(
    endIndexStr1 - maxLength + 1,
    endIndexStr1 + 1
  );

  return longestCommonSubstr;
}

const str1 = "abc1234567hahah";
const str2 = "abq12577hahah2";

console.log(longestCommonSubstring(str1, str2)); // 输出： "7hahah"
