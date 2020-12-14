# LC-357 Count numbers with unique digits
Given a non-negative integer n, count all numbers with unique digits, x, where 0 ≤ x < 10n.

Example:

>Input: 2\
>Output: 91 \
>Explanation: The answer should be the total numbers in the range of 0 ≤ x < 100, 
             excluding 11,22,33,44,55,66,77,88,99

## Solution - permutations
```java
class Solution {
    public int countNumbersWithUniqueDigits(int n) {
        int[] dp = new int[n+1];
        dp[0] = 1;
        if (n >= 1) dp[1] = 10;
        
        for (int i = 2; i <= n; i ++) {
            dp[i] = dp[i - 1] + (dp[i - 1] - dp[i - 2]) * (11-i);
        }
        
        return dp[n];
    }
}
```