var merge = function (nums1, m, nums2, n) {
  let i = 0,
    j = 0;
  while (i < m && nums1[i] !== 0) {
    if (nums1[i] <= nums2[j]) {
    } else {
      j = 0;
      while (j < n && nums2[j] > nums1[i]) {
        j++;
      }
      let temp = nums1[i];
      nums1[i] = nums2[j];
      nums2[j] = temp;
    }
    i++;
  }
  j = 0;
  while (i < m + n) {
    nums1[i++] = nums2[j++];
  }
  return nums1;
};
console.log(merge([1, 2, 3, 0, 0, 0], 6, [2, 5, 6], 3));
