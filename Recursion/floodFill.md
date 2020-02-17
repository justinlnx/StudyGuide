# Flood Fill - 733
Implement the “paint fill” function that one might see on many image editing programs. That is, given a screen (represented by a 2-dimensional array of Colors), a point, and a new color, fill in the surrounding area until you hit a border of that color.

## Solution 1:
```java
enum Color {
  Black, White, Red, Yellow, Green
}

boolean PaintFill(Color[][] screen, int x, int y, Color ocolor, Color ncolor) {
  if (x < 0 || x >= screen[0].length || y < 0 || y >= screen.length) {
    return false;
  }
  if (screen[y][x] == ocolor) {
    screen[y][x] = ncolor;
    PaintFill(screen, x - 1; y, ocolor, ncolor); // left
    PaintFill(screen, x + 1; y, ocolor, ncolor); // right
    PaintFill(screen, x; y - 1, ocolor, ncolor); // top
    PaintFill(screen, x; y + 1, ocolor, ncolor); // down
  }
  return true;
}

boolean PaintFill(Color[][] screen, int x, int y, Color ncolor) {
  return PaintFill(screen, x, y, screen[y][x], ncolor);
}

// different shell
public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
  int currColor = image[sr][sc];
  if (currColor != newColor) {
    dfs(image, sr, sc, currColor, newColor);
  }
  return image;
}

public void dfs(int[][] image, int sr, int sc, int color, int newColor) {
  if (image[sr][sc] == color) {
    image[sr][sc] = newColor;
    if (sr > 0) dfs(image, sr - 1, sc, color, newColor);
    if (sc > 0) dfs(image, sr, sc - 1, color, newColor);
    if (sr < image.length - 1) dfs(image, sr + 1, sc, color, newColor);
    if (sc < image[0].length - 1) dfs(image, sr, sc + 1, color, newColor);
  }
}
```