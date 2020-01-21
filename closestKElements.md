# Find K Closest Elements

Given a sorted array, two integers k and x, find the k closest elements to x in the array. The result should also be sorted in ascending order. If there is a tie, the smaller elements are always preferred.

Example 1:
>Input: [1,2,3,4,5], k=4, x=3 \
>Output: [1,2,3,4]


Example 2:
>Input: [1,2,3,4,5], k=4, x=-1\
>Output: [1,2,3,4]


## Solution 1: use sorted list. O(n logn)
```java
class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        // Time complexity: O(nlogn)
        // Space complexity: O(k)
        List<Integer> list = Arrays.stream(arr).boxed().collect(Collectors.toList());
        Collections.sort(list, (a, b) -> a == b ? a - b : Math.abs(a-x) - Math.abs(b-x));
        list = list.subList(0, k);
        Collections.sort(list);

        return list;
    }
}
```

## Solution 2: use heap, pq of size k+1. O(n logk)
- sorting heap of size k + 1 takes logk
- going thru the array takes n
```java
class Soultion {
  public List<Integer> findClosestElements(int[] arr, int k, int x) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(k + 1, (a, b) -> Math.abs(a - x) - Math.abs(b - x));

    pq.add(arr[0]);

    for (int i = 1; i < arr.length; i ++) {
      if (pq.size() < k + 1) {
        pq.add(arr[i]);
      } else {
        pq.poll();
        pq.add(arr[i]);
      }
    }

    pq.poll();
    return pq.toArray();
  }
}
```

## Solution 3: use quicksort with partition
- average O(n)
- worst case O(n^2)
k-nearest neighbor. 大概就是一个integer array 找最小的k个数。我看过之前的面经有所准备。先说了brute force的先sort一遍然后return前k个 O(nlogn)。然后说我们可以做得更好，keep一个size为k的heap，遍历一遍 O(nlogk)。然后说可以用quick sort partition的形式，先random guess一个k least number（index），针对这个pivot index partition。加入最后这个number end up在index q。如果恰好它最后是第k个index的话 (q=k)就return它前面所有的number。如果q>k的话就partition recursively前面0...q的第k小的。q<k的话就找q..len-1的第k-q小的数。这样amortize runtime奇迹般的是O(n)。然鹅我algo课没好好听并不会证明。最后面试官问我会不会证明的时候我尴尬的一笑说我并不会嘻嘻。不过最后能过也是阿弥陀佛。
```java
class Solution {
  public List <Integer> findClosestElements(int[] arr, int k, int x) {
    
  }
}
```
