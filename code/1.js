var twoSum = function (nums, target) {
  const hashtable = new Map();
  let res = [];
  for (let idx = 0; idx < nums.length; idx++) {
    const item = nums[idx];
    if (hashtable.has(target - item)) {
      res = [hashtable.get(target - item), idx];
      break; // 找到结果后立即终止循环
    }
    hashtable.set(item, idx);
  }
  return res;
};
console.log(twoSum([2, 7, 11, 15], 9));
