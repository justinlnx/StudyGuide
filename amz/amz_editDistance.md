# Edit Distance - similar to LC 72
Given a positive integer, and you can do following operations:
1. minus 1
2. divide 2 (only when there is no reminders)
3. divide 3 (only when there is no reminders)

Find the least number of operations required to convert the number to 1.

ie: 15
15 / 3 = 5
5 - 1 = 4
4 / 2 = 2
2 / 2 = 1

 0  1  2  3
[1, 1, 2, 2, ]
## Solution
```java
class Solution {
  public int editDistance(int num) {
    int[] dp = new int[num];
    dp[0] = 1;
    for (int i = 0; i < num + 1; i ++) {
      if (i + 1 <= num) {
        dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);
      }
      if (i * 2 <= num) {
        dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
      }
      if (i * 3 <= num) {
        dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
      }
    }

    return dp[num];
  }
}
```

# Edit Distance - LC 72
Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.
You have the following 3 operations permitted on a word:

1. Insert a character
2. Delete a character
3. Replace a character

Example 1:
>Input: word1 = "horse", word2 = "ros"\
>Output: 3\
>Explanation:\
>horse -> rorse (replace 'h' with 'r')\
>rorse -> rose (remove 'r')\
>rose -> ros (remove 'e')

Example 2:
>Input: word1 = "intention", word2 = "execution"\
>Output: 5\
>Explanation:\
>intention -> inention (remove 't')\
>inention -> enention (replace 'i' with 'e')\
>enention -> exention (replace 'n' with 'x')\
>exention -> exection (replace 'n' with 'c')\
>exection -> execution (insert 'u')


## Solution
```java
public class Solution {
  public int minDistance(String word1, String word2) {
    int m = word1.length();
    int n = word2.length();
    
    int[][] cost = new int[m + 1][n + 1];
    for(int i = 0; i <= m; i++)
      cost[i][0] = i;
    for(int i = 1; i <= n; i++)
      cost[0][i] = i;
    
    for(int i = 0; i < m; i++) {
      for(int j = 0; j < n; j++) {
        if(word1.charAt(i) == word2.charAt(j))
          cost[i + 1][j + 1] = cost[i][j];
        else {
          int a = cost[i][j];
          int b = cost[i][j + 1];
          int c = cost[i + 1][j];
          cost[i + 1][j + 1] = a < b ? (a < c ? a : c) : (b < c ? b : c);
          cost[i + 1][j + 1]++;
        }
      }
    }
    return cost[m][n];
  }
}
```
