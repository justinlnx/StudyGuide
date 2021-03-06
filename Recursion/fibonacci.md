# Write a method to generate the nth Fibonacci number.

## Recurisve Soltion
```java
int fibo(int n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  
  if (n > 1) {
    return fibo(n - 1) + fibo(n - 2);
  }

  return -1;
}
```

## Iterative Solution
```java
int fibo(int n) {
  if (n < 0) return -1;
  if (n == 0) return 0;
  int a = 1; b = 1;

  for (int i = 3; i <= n; i ++) {
    int c = a + b;
    a = b;
    b = c;
  }

  return b;
}
```

## DP
```java
int fibo (int n) {
  if (n < 0) return -1;
  if (n == 0) return 0;
  int[] f = new int [n + 1];

  f[0] = 0;
  f[1] = 1;

  for (int i = 2; i <= n; i ++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n];
}
```
