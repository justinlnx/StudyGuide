# Maximum Subarray
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

>Input: [-2,1,-3,4,-1,2,1,-5,4],\
>Output: 6\
>Explanation: [4,-1,2,1] has the largest sum = 6.

## Solution: 
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int sum = nums[0], highest = nums[0];
        for (int i = 1; i < nums.length; i ++) {
            sum = sum < 0 ? nums[i] : sum + nums[i];
            highest = Math.max(highest, sum);
        }
        return highest;
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

There are various versions of the problem. If we are allowed to buy and sell only once, then we can use the Maximum difference between the two elements algorithm.

Let `profit[t][i]` represent maximum profit using at most `t` transactions up to day `i` (including day i). Then the relation is:

```
profit[t][i] = max(profit[t][i-1], max(price[i] – price[j] + profit[t-1][j]))
          for all j in range [0, i-1]
```
`profit[t][i]` will be maximum of –

`profit[t][i-1]` which represents not doing any transaction on the ith day.
Maximum profit gained by selling on ith day. In order to sell shares on ith day, we need to purchase it on any one of [0, i – 1] days. If we buy shares on jth day and sell it on ith day, max profit will be `price[i] – price[j] + profit[t-1][j]` where j varies from 0 to i-1. Here profit[t-1][j] is best we could have done with one less transaction till jth day.
Below is Dynamic Programming based implementation.

## Solution:
```java
class GFG { 
  // Function to find out maximum profit by buying & selling a  
  // share at most k times given stock price of n days 
  static int maxProfit(int[] price, int n, int k) {
    // table to store results of subproblems 
    // profit[t][i] stores maximum profit using at most t transactions
    // up to day i (including day i) 
    int[][] profit = new int[k + 1][n + 1]; 

    // For day 0, you can't earn money irrespective of how many times you trade 
    for (int i = 0; i <= k; i++) {
      profit[i][0] = 0;
    }

    // profit is 0 if we don't do any transation (i.e. k =0) 
    for (int j = 0; j <= n; j++) {
      profit[0][j] = 0;
    }

    // fill the table in bottom-up fashion
    for (int i = 1; i <= k; i++) { // transactions
      for (int j = 1; j < n; j++) { // day
        int max_so_far = 0; 

        for (int m = 0; m < j; m++) { // from day 0 to day j
          // find the profit of buying on day m and sell on day j
          // + profit earned from previous transactions up to day m
          max_so_far = Math.max(max_so_far, price[j] - price[m] + profit[i - 1][m]);
        }

        // update profit on j's day with i number of transactions
        // choose this value by comparing the largest between profit made prior to
        // j's day and profit on the accumulated max
        profit[i][j] = Math.max(profit[i][j - 1], max_so_far);
      }
    }

    return profit[k][n - 1];
  }

  // Driver code  
  public static void main(String []args) { 
    int k = 2; 
    int[] price = { 10, 22, 5, 75, 65, 80 }; 
    int n = price.length; 
    System.out.println("Maximum profit is: " + maxProfit(price, n, k));
  }
} 
```

## Optimized Solution:
The above solution has time complexity of O(k.n2). It can be reduced if we are able to calculate the maximum profit gained by selling shares on the ith day in constant time.

profit[t][i] = max(profit [t][i-1], max(price[i] – price[j] + profit[t-1][j]))
                            for all j in range [0, i-1]

If we carefully notice,
max(price[i] – price[j] + profit[t-1][j])
for all j in range [0, i-1]

can be rewritten as,
= price[i] + max(profit[t-1][j] – price[j])
for all j in range [0, i-1]
= price[i] + max(prevDiff, profit[t-1][i-1] – price[i-1])
where prevDiff is max(profit[t-1][j] – price[j])
for all j in range [0, i-2]

So, if we have already calculated max(profit[t-1][j] – price[j]) for all j in range [0, i-2], we can calculate it for j = i – 1 in constant time. In other words, we don’t have to look back in the range [0, i-1] anymore to find out best day to buy. We can determine that in constant time using below revised relation.
```java
class GFG { 
  static int maxProfit(int price[], int n, int k) { 
    int profit[][] = new int[k + 1][ n + 1]; 
    // For day 0, you can't earn money 
    // irrespective of how many times you trade 
    for (int i = 0; i <= k; i++) profit[i][0] = 0; 

    // profit is 0 if we don't do any  transation (i.e. k =0) 
    for (int j = 0; j <= n; j++) profit[0][j] = 0; 

    // fill the table in bottom-up fashion 
    for (int i = 1; i <= k; i++) { 
      int prevDiff = Integer.MIN_VALUE; 
      for (int j = 1; j < n; j++) {
        prevDiff = Math.max(prevDiff, profit[i - 1][j - 1] - price[j - 1]);
        profit[i][j] = Math.max(profit[i][j - 1], price[j] + prevDiff);
      }
    }

    return profit[k][n - 1];
  }
}  
```

# Maximum difference between two elements such that larger element appears after the smaller number
Given an array arr[] of integers, find out the maximum difference between any two elements such that larger element appears after the smaller number.

Examples :

>Input : arr = {2, 3, 10, 6, 4, 8, 1}\
Output : 8\
Explanation : The maximum difference is between 10 and 2.

>Input : arr = {7, 9, 5, 6, 3, 2}\
Output : 2\
Explanation : The maximum difference is between 9 and 7.

## Solution 1: Time Complexity O(n^2)
```java
class MaximumDiffrence { 
  /* The function assumes that there are at least two elements in array. 
      The function returns a negative value if the array is sorted in decreasing order.
      Returns 0 if elements are equal */
  int maxDiff(int arr[], int arr_size) {
    int max_diff = arr[1] - arr[0];
    for (int i = 0; i < arr_size; i++) {
      for (int j = i + 1; j < arr_size; j++) { 
        if (arr[j] - arr[i] > max_diff) {
          max_diff = arr[j] - arr[i];
        }
      }
    }
    return max_diff; 
  } 

  public static void main(String[] args)  
  { 
    MaximumDiffrence maxdif = new MaximumDiffrence(); 
    int arr[] = {1, 2, 90, 10, 110}; 
    System.out.println("Maximum differnce is " +  maxdif.maxDiff(arr, 5)); 
  } 
} 
```

## Solution 2:
In this method, instead of taking difference of the picked element with every other element, we take the difference with the minimum element found so far. So we need to keep track of 2 things:
1) Maximum difference found so far (max_diff).
2) Minimum number visited so far (min_element).

Time Complexity : O(n)
```java
class MaximumDiffrence { 
  int maxDiff(int arr[], int arr_size) {
    int max_diff = arr[1] - arr[0];
    int min_element = arr[0];
    for (int i = 1; i < arr_size; i++) { 
      if (arr[i] - min_element > max_diff) {
        max_diff = arr[i] - min_element; 
      }
      if (arr[i] < min_element) {
        min_element = arr[i];
      }
    }
    return max_diff;
  }
}
```
