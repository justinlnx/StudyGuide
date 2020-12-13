# window sum

Example:
> Input: A = [1, 2, 3, 4, 5], k = 3\
> Output: [6, 9, 12]\
> [1, 2, 3] -> 6\
> [2, 3, 4] -> 9\
> [3, 4, 5] -> 12

```java
public List<Integer> GetSum(List<Integer> A, int k) {
  ArrayList<Integer> result = new ArrayList<>();
  if (A == null || A.size() == 0 || k < 0) return result;

  for (int i = 0; i < A.size() - k + 1; i ++) {
    int sum = 0;
    for (int j = i; j < i + k; j ++) {
      sum += A.get(j);
    }
    result.add(sum);
  }

  return result;
}
```