# Product of Array Except Self - LC 238
Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

**`Example:`**
>Input:  [1,2,3,4]\
>Output: [24,12,8,6]

**`Note`**: Please solve it without division and in `O(n)`.

**`Follow up`**:
Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

## Solution:
```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int length = nums.length;
        int[] res = new int[length];
        
        res[0] = 1; // res[] represents the product of all previous elements up to i, from left->right
        for (int i = 1; i < length; i ++) {
            // res[i] is product of res at [i-1] * nums[i-1]
            res[i] = nums[i - 1] * res[i - 1];
        }
        
        int R = 1; // R represends the product of all the number after i, from right->left
        for (int i = length - 1; i >= 0; i --) {
            res[i] = res[i] * R; // update res[i] with R, product all numbers to the right
            R *= nums[i]; // update product of all nums to the right by * current number
        }
        
        return res;
    }
}
```
