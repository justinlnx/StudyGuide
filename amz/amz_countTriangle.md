# Count number of Triangles
Given n points in the plane, find the number of right triangles that can be formed with these points, where the two sides of the right angle are parallel to either the x or y axes

## Solution
假设给定一个点，比如 (1, 2), 这个点能形成的三角形取决于有多少个其他的点在 x = 1 这条竖直线上，还有有多少其他的点在 y = 2 这条水平线上。“-1” 就是要除掉这个点本身。如果有3个其他点在竖直线上，4个其他点在同一水平线上，那么这个点可以形成12个三角形。

count += p*q 就是累积计数这样的三角形。

```java
class Solution {
  public long countTriangles(ArrayList<Point> points) {
    Map<int, int> xCoord = new HashMap<>();
    Map<int, int> yCoord = new HashMap<>();

    for (Point p : points) {
      xCoord[p[0]] ++;
      yCoord[p[1]] ++;
    }

    long count = 0;
    for (Point p : points) {
      long x = xCoord[p[0]] - 1;
      long y = yCoord[p[1]] - 1;
      count += x * y;
    }

    return count;
  }
}
```
