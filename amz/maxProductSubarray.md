# Maximum Product Subarray - LC 152
Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

Example 1:

>Input: [2,3,-2,4]\
>Output: 6\
>Explanation: [2,3] has the largest product 6.

Example 2:

>Input: [-2,0,-1]\
>Output: 0\
>Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

## Solution:
* 因为负数乘法的原因，需要记录每个位置的最大和最小的乘积
* 状态：
   * 设f[i] = 以a[i]结尾的连续子序列的最大乘积
   * 设g[i] = 以a[i]结尾的连续子序列的最小乘积
* 转移方程：
   * `f[i] = max{ a[i], max{ a[i]*f[i - 1], a[i]*g[i - 1] } }`
   * `g[i] = min{ a[i], min{ a[i]*f[i - 1], a[i]*g[i - 1] } }`
* 计算顺序
   * 左往右
```java
// time complexity: O(n)
class Solution {
  public int maxProduct(int[] nums) {
    if (nums == null || nums.length == 0) return 0;
    int[] f = new int[nums.length];
    int[] g = new int[nums.length];
    f[0] = nums[0];
    g[0] = nums[0];
    int max = nums[0];
    
    for (int i = 1; i < nums.length; i ++) {
      g[i] = Math.min(nums[i], Math.min(nums[i] * f[i - 1], nums[i] * g[i - 1]));
      f[i] = Math.max(nums[i], Math.max(nums[i] * f[i - 1], nums[i] * g[i - 1]));
      if (f[i] > max) {
        max = f[i];
      }
    }
    
    return max;
  }
}
```