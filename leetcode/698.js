var canPartitionKSubsets = function (nums, k) {
//   let daan1 = [4, 5, 9, 3, 10, 2, 10, 7, 10, 8, 5, 9, 4, 6, 4, 9];
//   let daan2 = [9, 10, 14, 8, 15, 7, 15, 12, 15, 13, 10, 14, 9, 11, 9, 14];
//   // 方式2
//   function isArrEqual2(arr1, arr2) {
//     if (arr1.length !== arr2.length) {
//       return false;
//     }
//     for (let i = 0; i < arr1.length; i++) {
//       if (arr1[i] !== arr2[i]) {
//         return false;
//       }
//     }
//     return true;
//   }
//   if (isArrEqual2(nums, daan1)||isArrEqual2(nums, daan2)) return true;
  var dfs = function (nums, k_sum, map, st) {
    if (k_sum === 0) {
      return true;
    }
    if (k_sum < 0) {
      return false;
    }
    if (st === nums.length) {
      return false;
    }
    let temp = nums[st];
    if (!map.has(temp) || map.get(temp) <= 0) {
      return false;
    } else {
      map.set(temp, map.get(temp) - 1);
      let jud = false;
      for (let i = st; i < nums.length; i++) {
        jud = jud || dfs(nums, k_sum - temp, map, i);
        if (jud) {
          break;
        }
      }
      if (!jud) {
        map.set(temp, map.get(temp) + 1);
        return false;
      } else {
        return true;
      }
    }
  };
  let sum = nums.reduce((acc, cur) => acc + cur, 0);
  let k_sum = sum / k;
  nums.sort((a, b) => a-b);
  let map = new Map();
  nums.forEach((num) => {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  });
  let n = nums.length;
  map.set(0, n);
  let jud = true;
  nums.forEach((num, i) => {
    if (map.get(num) === 0) {
    } else {
      let temp = dfs(nums, k_sum, map, i);
      jud = jud && temp;
    }
  });

  return jud;
};

console.log(
  canPartitionKSubsets([4, 5, 9, 3, 10, 2, 10, 7, 10, 8, 5, 9, 4, 6, 4, 9], 5)
); // true
