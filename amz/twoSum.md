# Two Sum - LC 1
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

>Given nums = [2, 7, 11, 15], target = 9,\
>Because nums[0] + nums[1] = 2 + 7 = 9,\
>return [0, 1].

## Solution:
* Hash table
```java
class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i ++) {
      int complement = target - nums[i];
      if (map.containsKey(complement)) {
        return new int[] { map.get(complement), i };
      }
      map.put(nums[i], i);
    }
    return new int[0];
  }
}
```

# Two Sum II sorted array - LC 167
Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.

Note:

Your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.

Example:

>Input: numbers = [2,7,11,15], target = 9\
>Output: [1,2]\
>Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.


## Solution:
* Two Pointer
```java
class Solution {
  public int[] twoSums(int[] numbers, int target) {
    if (numbers == null || numbers.length < 2) {
      return new int[0];
    }

    for (int l = 0, r = numbers.length - 1; l < r; r--) {
      while (l < r && numbers[l] + numbers[r] < target) {
        l++;
      }
      if (l != r && numbers[l] + numbers[r] == target) {
        return new int[] {l + 1, r + 1};
      }
    }
    return new int[0];
  }
}
```
