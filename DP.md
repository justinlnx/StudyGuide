动态规划题目特点

什么时候用dp去做

1. 计数
   - 有多少种方法走到右下角
   - 有多少种方法选出k个数 使得和是sum
   - how many ways ...

2. 求最大最小值
   - 从左上角到右下角路径的最大数字和
   - 最长上升子序列长度

3. 求存在性
   - 取石子游戏，先手是否必胜
   - 能不能选出k个数 使得和是sum
   - 回答是不是，有没有存在，true false类型的问题

# Coin Change - LC 322
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example 1:

>Input: coins = [1, 2, 5], amount = 11\
>Output: 3 \
>Explanation: 11 = 5 + 5 + 1

Example 2:

>Input: coins = [2], amount = 3\
>Output: -1

# 动态规划组成部分一：确定状态
* 状态在动态规划中的作用属于定海神针
* 简单的说，解动态规划的时候需要开一个数组，数组的每个元素f[i]或者
f[i][j]代表什么
   * 类似于解数学题中，X，Y，Z代表什么
* 确定状态需要两个意识：
   * 最后一步
   * 子问题

## 最后一步
* 虽然我们不知道最优策略是什么，但是最优策略肯定是K枚硬币a1, a2, ..., aK 面值加起来是27
* 所以一定有一枚最后的硬币: aK
* 除掉这枚硬币，前面硬币的面值加起来是27- aK

__关键点__
1. 我们不关心前面的K-1枚硬币是怎么拼出27- aK的（可能有1种拼法，可能
有100种拼法），而且我们现在甚至还不知道aK和K，但是我们确定前面的硬币拼
出了27- aK
2. 因为是最优策略，所以拼出27- aK的硬币数一定要最少，否则这就不是最
优策略了

## 子问题
* 所以我们就要求：最少用多少枚硬币可以拼出27- aK
* 原问题是最少用多少枚硬币拼出27
* 我们将原问题转化成了一个子问题，而且规模更小：27- aK
* 为了简化定义，我们设状态f(X)=最少用多少枚硬币拼出X

等等，我们还不知道最后那枚硬币aK是多少
* 最后那枚硬币aK只可能是2，5或者7
* 如果aK是2，`f(27)`应该是`f(27-2) + 1` (加上最后这一枚硬币2）
* 如果aK是5，`f(27)`应该是`f(27-5) + 1` (加上最后这一枚硬币5）
* 如果aK是7，`f(27)`应该是`f(27-7) + 1` (加上最后这一枚硬币7）
* 除此以外，没有其他的可能了
* 需要求最少的硬币数，所以：
`f(27) = min{f(27-2)+1, f(27-5)+1, f(27-7)+1}`

```
拼出27所需最少的硬币数 = min{
  拼出25所需最少的硬币数，加上最后一枚硬币2,
  拼出22所需最少的硬币数，加上最后一枚硬币5,
  拼出20所需最少的硬币数，加上最后一枚硬币7,
}
```
跟递归有什么不一样？
```java
int f(int X) {                            // f(x)=最少用多少硬币拼出x
  if (X == 0) return 0;                   // 0元 只需要0枚
  int res = MAX_VALUE;
  if (X >= 2) {                           // 最后一枚是2元
    res = Math.min(f(X – 2) + 1, res);
  }
  if (X >= 5) {                           // 最后一枚是5元
    res = Math.min(f(X – 5) + 1, res);
  }
  if (X >= 7) {                           // 最后一枚是7元
    res = Math.min(f(X – 7) + 1, res);
  }
  return res;
}
```

```
                        f(27)
          /               |                   \
      f(25)             f(22)               f(20)
    /   |   \         /   |    \          /   |    \
f(23) f(20) f(18)  f(20) f(17) f(18)  f(18) f(15) f(13)
...
```
f(20) 会多次运算，f(20)下面的子类也会多次运算，导致递归变成指数级别，超时
* 做了很多重复计算，效率低下
* 用dp将计算结果保存下来，并改变计算顺序

# 动态规划组成部分二：转移方程
* 设状态f[X]=最少用多少枚硬币拼出X
* 对于任意X, `f[X] = min{f[X-2]+1, f[X-5]+1, f[X-7]+1}`
```
拼出X所需最少的硬币数 = min{
  拼出 X-2 所需最少的硬币数，加上最后一枚硬币2,
  拼出 X-5 所需最少的硬币数，加上最后一枚硬币5,
  拼出 X-7 所需最少的硬币数，加上最后一枚硬币7,
}
```

# 动态规划组成部分三：初始条件和边界情况
* f[X] = min{f[X-2]+1, f[X-5]+1, f[X-7]+1}
* 两个问题：X-2, X-5 或者X-7小于0怎么办？什么时候停下来？
* 如果不能拼出Y，就定义f[Y]=正无穷
   *  例如f[-1]=f[-2]=…=正无穷
* 所以`f[1] = min{f[-1]+1, f[-4]+1, f[-6]+1} = 正无穷`, 表示拼不出来1
* 初始条件：`f[0] = 0`
   * 一般是转移方程算不出来的，需要额外定义

# 动态规划组成部分四：计算顺序
* 拼出X所需要的最少硬币数：`f[X] = min{f[X-2]+1, f[X-5]+1, f[X-7]+1}`
* 初始条件：`f[0] = 0`
* 然后计算`f[1], f[2], …, f[27]`
   * 一般从小到大
* 当我们计算到f[X]时，f[X-2], f[X-5], f[X-7]都已经得到结果了
* 每一步尝试三种硬币，一共27步
* 与递归算法相比，没有任何重复计算
* 算法时间复杂度（即需要进行的步数）： 27 * 3
* 递归时间复杂度：>>27*3

## Solution
```java
class Solution {
  // A = [2, 5, 7], M = 27
  public int coinChange(int[] A, int M) {
    int[] f = int [M + 1];
    int n = A.length; // number of types of coins

    // init
    f[0] = 0;

    int i, j;
    // f[1], f[2], ..., f[27]
    for (i = 1; i <= M; i++) {
      f[i] = Integer.MAX_VALUE;
      // last coin A[j]
      // f[i] = min{f[i - A[0]] + 1, ..., f[i - A[n - 1]] + 1}
      for (j = 0; j < n; j ++) {
        if (i >= A[j] && f[i - A[j]] != Integer.MAX_VALUE) {
          f[i] = Math.min(f[i - A[j]] + 1, f[i]);
        }
      }
    }

    if (f[M] == Integer.MAX_VALUE) {
      f[M] = -1;
    }

    return f[M];
  }
}
```

# Example 2: Move Robot - LC 62
**确认状态**

moving from (0, 0) to (m - 1, n - 1)
suppose there are `x` ways to (m - 2, n - 1), and `y` ways to (m - 1, n - 2).
so total number of ways to (m - 1, n - 1) is `x+y`

**转移方程**
suppose: f[i][j] indiciates the number of ways from (0,0) to (i, j)
>f[i][j] = f[i-1][j] + f[i][j-1]\
>走到(i,j)的方法 = 走到(i-1, j)的方法 + 走到(i, j-1)的方法

**初始条件和边界情况**

init: 
* f[0][0] = 1
* i = 0 or j = 0, f[0][j] = f[i][0] = 1

**计算顺序**

>f[0][0] = 1\
>f[0][0], f[0][1], ..., f[0][n-1]\
>f[1][0], f[1][1], ..., f[1][n-1]\
>...\
>f[m-1][0], f[m-1][1], ..., f[m-1][n-1]

* ans is f[m-1][n-1]
* time complexity: O(mn)
* space complexity: O(mn)

## Solution
```java
class Solution {
  public int uniquePaths(int m, int n) {
    int[][] f = new int[m][n];

    for (int i = 0; i < m; i ++) { // row: up to down
      for (int j = 0; j < n; j ++) { // col: left to right
        if (i == 0 || j == 0) {
          f[i][j] = 1;
        } else {
          f[i][j] = f[i - 1][j] + f[i][j - 1];
        }
      }
    }

    return f[m - 1][n - 1];
  }
}
```

