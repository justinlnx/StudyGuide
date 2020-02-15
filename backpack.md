# Backpack 背包问题
1. brutal force, greedy
2. dp
3. space optimizations

举例：背包容量 m = 10
>物品大小 A = [2, 3, 5, 7]\
>物品价值 V = [1, 5, 2, 4]

爆搜解法：分别枚举每一个物体取或者不取，1代表取，0代表不取

| 状态  | 容量  | 价值 | 状态  | 容量 | 价值 | 状态  | 容量 | 价值 | 状态  | 容量 | 价值 |
| ----- | ----:| ----:| ----:| ----:| ----:| ----:| ----:| ----:| ----:| ----:| ----:| ----:|
| 0000  | 0    | 0    | 0100 |  3   |    5 | 1000 |    2 |    1 | 1100 |  5   | 6 |
| 0001  | 7    | 4    | 0101 |  10  |**`9`**| 1001 |    9 |    5 | 1101 |  12  | X |
| 0010  | 5    | 2    | 0110 |  8   |    7 | 1010 |    7 |    3 | 1110 |  10  | 8 |
| 0011  | 12   | X    | 0111 | 15   |    X | 1011 |   14 |    X | 1111 |  17  | X |

贪心 Greedy
* 取价值最高：
   * m=2, A = [1, 1, 2], V = [2, 2, 3]
   * 贪心答案：3，正确答案：4

* 取重量最轻
   * m=2, A = [1, 1, 2], V = [1, 1, 3]
   * 贪心答案：2，正确答案：3

* 取单位价值最高
   * m=3, A = [1, 1, 3], V = [2, 2, 5]
   * 贪心答案：4，正确答案：5

## DP
>背包容量 m = 10\
>物品大小 A = [2, 3, 5, 7]\
>物品价值 V = [1, 5, 2, 4]

**`状态`**

设：使用数组来记录取前i个物品，在容量j的情况下能取的最大价值

|物品i/容量j  | 0   | 1   |  2  |  3  |   4 |   5 |   6 |   7 |   8 |   9 | 10  |
| ---------- |----:|----:|----:|----:|----:|----:|----:|----:|----:|----:|----:|
| 0          |   0 |   0 |   0 |   0 |   0 |   0 |   0 |   0 |   0 |   0 |   0 |
| 1          |   0 |   0 |   1 |   1 |   1 |   1 |   1 |   1 |   1 |   1 |   1 | 
| 2          |   0 |   0 |   1 |   5 | 5+0 | 5+1 |   6 |   6 |   6 |   6 |   6 |
| 3          |   0 |   0 |   1 |   5 |   5 |   6 |   6 |   6 | 2+5 |   7 |2+1+5|
| 4          |   0 |   0 |   1 |   5 |   5 |   6 |   6 |   6 |   7 |   7 | 4+5 |

**`转移方程`**

* dp[i][j] 表示前i个物体，在容量j的情况下，能取到的最大价值
* 如果取第i个物体，价值为 `dp[i - 1][j - A[i]] + V[i]` | (j-A[i]>0)
* 如果不取第i个物体，价值为 `dp[i - 1][j]`
* 状态转移：`dp[i][j] = max(dp[i - 1][j – A[i]] + V[i], dp[i - 1][j])`
* ans: `dp[m-1][n-1]`

**`初始值与边界情况`**
* dp[0][j] = dp[i][0] = 0
* `j - A[i] > 0`

**`计算顺序`**
* row: left to right
* col: top to down

## Solution:
```java
class Solution {
  public int backpack(int m, int[] A, int[] V) {
    int[][] dp = new int[A.length + 1][V.length + 1];
    
    for (int i = 0; i <= A.length; i ++) {
      for (int j = 0; j <= V.length; j ++) {
        if (i == 0 || j == 0) dp[i][j] = 0;

        if (j - A[i] > 0) {
          dp[i][j] = Math.max(dp[i - 1][j - A[i]] + V[i], dp[i - 1][j]);
        } else {
          dp[i][j] = dp[i - 1][j]
        }
      }
    }

    return dp[A.length][v.length];
  }
}
```
# Maximum profit by buying and selling a share at most k times
In share trading, a buyer buys shares and sells on a future date. Given the stock price of `n` days, the trader is allowed to make at most `k` transactions, where a new transaction can only start after the previous transaction is complete, find out the maximum profit that a share trader could have made.

Example:

>Input:\
  Price = [10, 22, 5, 75, 65, 80]\
    K = 2\
Output:  87\
Trader earns 87 as sum of 12 and 75\
Buy at price 10, sell at 22, buy at 5 and sell at 80

>Input:  
Price = [12, 14, 17, 10, 14, 13, 12, 15]\
    K = 3\
Output:  12\
Trader earns 12 as the sum of 5, 4 and 3\
Buy at price 12, sell at 17, buy at 10 \
and sell at 14 and buy at 12 and sell at 15
 
>Input:  
Price = [100, 30, 15, 10, 8, 25, 80]\
    K = 3\
Output:  72\
Only one transaction. Buy at price 8 and sell at 80.

>Input:  
Price = [90, 80, 70, 60, 50]\
    K = 1\
Output:  0\
Not possible to earn.


**`状态`**

设：使用数组来记录在day i, 取前t个transaction，情况下能取的最大价值

**`转移方程`**

* dp[t][i] 表示在day i, 取前t个transaction，能取到的最大价值
* 如果在day i-1做第t个transaction，价值为 `dp[t][i-1]`
* 如果在day i  做第t个transaction，价值为 `max{price[i] - price[j] + dp[t-1][i]} for j from 0 to i`
* 状态转移：`dp[t][i] = max(dp[t][i – 1], max{p[i] - p[j] + dp[t-1][i]})`
* ans: `dp[t][i]`

**`初始值与边界情况`**
* dp[0][i] = dp[t][0] = 0
* `0 <= j <= i`

**`计算顺序`**
* row: left to right
* col: top to down

## Solution:
```java
class Solution {
  public int maxProfit(int[] price, int n, int k) {
    int[][] dp = new int[k + 1][n + 1];
    for (int t = 0; t <= k; t ++) {
      for (int i = 0; i <= n; i ++) {
        if (i == 0 || t == 0) dp[t][i] = 0;
        int maxProfit = 0;
        for (int j = 0; j < i; j ++) {
          maxProfit = Math.max(maxProfit, price[i] - price[j] + dp[t-1][i]);
        }
        dp[t][i] = Math.max(dp[t][i-1], maxProfit);
      }
    }
    return dp[k][n -1];
  }
}
```
