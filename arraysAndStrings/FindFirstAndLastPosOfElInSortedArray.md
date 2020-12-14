# LC-34 Find First and Last Position of Element in Sorted Array
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

Follow up: Could you write an algorithm with O(log n) runtime complexity?


Example 1:

>Input: nums = [5,7,7,8,8,10], target = 8\
>Output: [3,4]

Example 2:

>Input: nums = [5,7,7,8,8,10], target = 6\
>Output: [-1,-1]

Example 3:

>Input: nums = [], target = 0\
>Output: [-1,-1]

## Solution - Linear scan
```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] range = { -1, -1 };
        
        for (int i = 0; i < nums.length; i ++) {
            if (nums[i] == target) {
                range[0] = i;
                break;
            }
        }
        
        if (range[0] == -1) {
            return range;
        }
        
        for (int i = nums.length - 1; i >= 0; i --) {
            if (nums[i] == target) {
                range[1] = i;
                break;
            }
        }
        
        return range;
    }
}
```

## Solution - Binary Search
```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] range = { -1, -1 };
        
        int leftIdx = binarySearch(nums, target, true);
        if (leftIdx == nums.length || nums[leftIdx] != target) {
            return range;
        }
        
        range[0] = leftIdx;
        range[1] = binarySearch(nums, target, false) - 1;
        return range;
    }
    
    private int binarySearch(int[] nums, int target, boolean left) {
        int lo = 0;
        int hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] > target || (left && target == nums[mid])) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        
        return lo;
    }
}
```