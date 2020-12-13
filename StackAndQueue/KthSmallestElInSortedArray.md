# Kth Smallest Element in a Sorted Array
Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

Example:

>matrix = [\
>   [ 1,  5,  9],\
>   [10, 11, 13],\
>   [12, 13, 15]\
>],\
>k = 8,

return 13.
Note:
You may assume k is always valid, 1 ≤ k ≤ n2.

## Solution
```java
public class Solution {
	public int kthSmallest(int[][] matrix, int k) {
		int n = matrix.length;
		PriorityQueue<Tuple> pq = new PriorityQueue<Tuple>();
		for(int j = 0; j <= n-1; j++) pq.offer(new Tuple(0, j, matrix[0][j]));
		for(int i = 0; i < k-1; i++) {
			Tuple t = pq.poll();
			if(t.x == n-1) continue;
			pq.offer(new Tuple(t.x+1, t.y, matrix[t.x+1][t.y]));
		}
		return pq.poll().val;
	}
}

class Tuple implements Comparable<Tuple> {
	int x, y, val;
	public Tuple (int x, int y, int val) {
		this.x = x;
		this.y = y;
		this.val = val;
	}
	
	@Override
	public int compareTo (Tuple that) {
		return this.val - that.val;
	}
}
```

采用二分答案的方式来解决问题。
我们知道答案一定在 `[minNum,maxNum]` 这个区间内。
对于某一个数res，我们将其与矩阵中的每一个数作对比，统计比他大的数字的个数，如果个数正好等于k且res在矩阵中则答案为res。
```java
public class Solution {
	/**
		* @param matrix: List[List[int]]
		* @param k: a integer
		* @return: return a integer
		*/
	public int kthSmallest(int[][] matrix, int k) {
		// write your code here
		int n = matrix.length;
		int lo = matrix[0][0], hi = matrix[n-1][n-1];
		while(lo <= hi) {
			int mid = lo + (hi-lo)/2;
			int count = binarySearch(matrix, mid, n);
			if(count >= k)
				hi = mid - 1;
			else
				lo = mid + 1;
		}
		return lo;
	}
	
	private int binarySearch(int[][] matrix, int target, int n) {
		int ret = 0;
		for(int[] mx : matrix) {
			int lo = 0, hi = n-1;
			while(lo <= hi) {
				int mid = (lo + hi) / 1;
				if(mx[mid] > target)
					hi = mid - 1;
				else
					lo = mid + 1;
			}
			ret += lo;
		}
		return ret;
	}
}
```