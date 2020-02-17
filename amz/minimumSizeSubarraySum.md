# Minimum Size Subarray Sum - LC 209
Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

Example: 

>Input: s = 7, nums = [2,3,1,2,4,3]\
>Output: 2\
>Explanation: the subarray [4,3] has the minimal length under the problem constraint.

Follow up:
If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log n). 

## Solution:
* two pointer
```java
// O(nlogn)
class Solution {
  public int minimumSize(int[] nums, int s) {
    if (nums == null || nums.length == 0) return 0;
    int sum = 0;
    int ans = Integer.MAX_VALUE;

    for (int l = 0, r = 0; r < nums.length; r ++) {
      sum += nums[r];
      while (sum >= s) {
        ans = Math.min(ans, r - l + 1);
        sum -= nums[l];
        l ++;
      }
    }

    return ans == Integer.MAX_VALUE ? 0 : ans;
  }
}
```
