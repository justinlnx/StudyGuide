# Maximize the number of toys that can be purchased with amount K
Given an array consisting of cost of toys. Given an integer K depicting the amount of money available to purchase toys. Write a program to find the maximum number of toys one can buy with the amount K.

Note: One can buy only 1 quantity of a particular toy.

Examples :

>Input:  N = 10, K =  50\
>        cost = { 1, 12, 5, 111, 200, 1000, 10, 9, 12, 15 }\
>Output: 6\
>Explanation: Toys with amount 1, 5, 9, 10, 12, and 12 can be purchased resulting in a total amount of 49. Hence, maximum number of toys is 6.\
>\
>Input: N = 7, K = 50\
>       cost = { 1, 12, 5, 111, 200, 1000, 10 }\
>Output: 4

## Solution - brute force, sort and select
O(nlogn)
```java
class Solution {
  public int getMaxToys(int cost[], int N, int K) {
    int count = 0, sum = 0;

    Arrays.sort(cost);

    for (int i = 0; i < N; i ++) {
      if (sum + cost[i] <= K) {
        sum = sum + cost[i];
        count ++;
      }
    }

    return count;
  }
}
```

## Solution - heap

```java
class Solution {
  public int getMaxToys(int cost[], int k) {
    int n = cost.length;
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int i = 0; i < n; i ++) {
      pq.offer(cost[i]);
    }

    int count = 0;
    while (!pq.isEmpty() && pq.peek() <= k) {
      k = k - pq.poll();
      count ++;
    }

    return count;
  }
}
```