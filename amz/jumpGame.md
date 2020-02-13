# Jump Game II - LC 45

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

Example:

>Input: [2,3,1,1,4]\
>Output: 2\
>Explanation: The minimum number of jumps to reach the last index is 2.
    Jump 1 step from index 0 to 1, then 3 steps to the last index.


## Solution
* Greedy algorithm
```java
class Solution {
  public int jump(int[] nums) {
    int end = 0;
    int maxPosition = 0;
    int steps = 0;
    for (int i = 0; i < nums.length - 1; i++) {
      maxPosition = Math.max(maxPosition, nums[i] + i);
      if (i == end) {
        end = maxPosition;
        steps ++;
      }
    }
    return steps;
  }
}
```
