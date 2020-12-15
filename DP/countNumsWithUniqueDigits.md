# LC-357 Count numbers with unique digits
Given a non-negative integer n, count all numbers with unique digits, x, where 0 ≤ x < 10n.

Example:

>Input: 2\
>Output: 91 \
>Explanation: The answer should be the total numbers in the range of 0 ≤ x < 100, 
             excluding 11,22,33,44,55,66,77,88,99

**Constraints**:
* 0 <= n <= 8

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

## Solution - counting
When n == 0, return 1. I got this answer from the test case.

When n == 1, _ can put 10 digit in the only position. [0, ... , 10]. Answer is 10.

When n == 2, _ _ first digit has 9 choices [1, ..., 9], second one has 9 choices excluding the already chosen one. So totally 9 * 9 = 81. answer should be 10 + 81 = 91

When n == 3, _ _ _ total choice is 9 * 9 * 8 = 684. answer is 10 + 81 + 648 = 739

When n == 4, _ _ _ _ total choice is 9 * 9 * 8 * 7.

...

When n == 10, _ _ _ _ _ _ _ _ _ _ total choice is 9 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1

When n == 11, _ _ _ _ _ _ _ _ _ _ _ total choice is 9 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 * 0 = 0

```java
public static int countNumbersWithUniqueDigits(int n) {
    if (n == 0) {
        return 1;
    }
    int ans = 10, base = 9;
    for (int i = 2; i <= n && i <= 10; i++) {
        base = base * (9 - i + 2);
        ans += base;
    }
    return ans;
}
```