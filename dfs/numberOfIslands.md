# Number of Islands - LC 200
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
>Input:\
>11110\
>11010\
>11000\
>00000\
>Output: 1

Example 2:
>Input:\
>11000\
>11000\
>00100\
>00011\
>Output: 3

## Solution:
```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  var islands = 0;
  for(var row = 0; row < grid.length; row ++) {
    for(var col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '1') {
        walk(grid, row, col);
        islands ++;
      }
    }
  }
  return islands;
};

function walk(grid, row, col) {
  if (grid[row][col] === '1') {
    grid[row][col] = '*'; // mark the land as visited
    if (col > 0) walk(grid, row, col - 1); // go left
    if (col < grid[row].length - 1) walk(grid, row, col + 1); // go right
    if (row > 0) walk(grid, row - 1, col); // go up
    if (row < grid.length - 1) walk(grid, row + 1, col); // go down
  }
}
```
