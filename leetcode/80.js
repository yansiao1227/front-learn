var removeDuplicates = function (nums) {
  dict = {};
  let delArr = [];
  nums.forEach((item, i) => {
    if (dict[item]) {
      dict[item] += 1;
      if (dict[item] > 2) delArr.push(i);
    } else {
      dict[item] = 1;
    }
  });
  debugger;
  let temp = nums.filter((item, i) => {
    return !delArr.includes(i);
  });
  temp.forEach((item, i) => {
    nums[i] = item;
  });
  nums.splice(temp.length, nums.length - temp.length + 1);
  return nums;
};
console.log(removeDuplicates([1, 1, 1, 2, 2, 3]));
