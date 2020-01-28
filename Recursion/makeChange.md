# number of ways to represent n cents
Given an infinite number of quarters (25 cents), dimes (10 cents), nickels (5 cents) and pennies (1 cent), write code to calculate the number of ways of representing n cents.

This is a recursive problem, so let's figure out how to do `makeChange(n)` using prior solutions (i.e., sub-problems). Let's say `n = 100`, so we want to compute the number of ways of making change of 100 cents. What's the relationship to its sub-problems?

We know that `makeChange(100)`:
= `makeChange(100 using 0 quarters)` + `makeChange(100 using 1 quarter)` + `makeChange(100 using 2 quarter)` + `makeChange(100 using 3 quarter)` + `makeChange(100 using 4 quarter)`

Can we reduce this further? Yes!

= `makeChange(100 using 0 quarters)` + `makeChange(75 using 0 quarter)` + `makeChange(50 using 0 quarters)` + `makeChange(25 using 0 quarters)` + 1

Now what? We’ve used up all our quarters, so now we can start applying our next biggest denomination: dimes.
This leads to a recursive algorithm that looks like this:
```java
public static int makeChange(int n, int denom) {
  int next_denom = 0;
  switch (denom) {
    case 25:
      next_denom = 10;
      break;
    case 10:
      next_denom = 5;
      break
    case 5:
      next_denom = 1;
      break;
    case 1:
      return 1;
  }
  int ways = 0;
  for (int i = 0; i * denom <= n; i++) {
    ways += makeChange(n - i * denom, next_denom);
  }
  return ways;
}
```

# Coin Change, LC 518
You are given coins of different denominations and a total amount of money. Write a function to compute the number of combinations that make up that amount. You may assume that you have infinite number of each kind of coin.

Example 1:
>Input: amount = 5, coins = [1, 2, 5]\
>Output: 4\
>Explanation: there are four ways to make up the amount:\
>5=5\
>5=2+2+1\
>5=2+1+1+1\
>5=1+1+1+1+1

Example 2:
>Input: amount = 3, coins = [2]\
>Output: 0\
>Explanation: the amount of 3 cannot be made up just with coins of 2.\

Example 3:
>Input: amount = 10, coins = [10]\
Output: 1

## Solution:
```java
class Solution = {
  public int change(int amount, int[] coins) {
    int [] comb = new int[amount + 1];
    comb[0] = 1;
    for (int i = 0; i < coins.length; i ++) {
      for (int j = 1; j < amount; j ++) {
        if (j - coins[i] >= 0) {
          // counts every possible combinations with given coins
          // current combo + any prev value combo
          comb[j] = comb[j] + comb[j - coins[i]];
        }
      }
    }
    return comb[amount];
  }
}

change(amount, [25, 10, 5, 1])
```