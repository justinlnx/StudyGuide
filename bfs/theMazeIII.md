# The Maze III - LC 499 / lintcode 789
There is a ball in a maze with empty spaces and walls. The ball can go through empty spaces by rolling up (u), down (d), left (l) or right (r), but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction. There is also a hole in this maze. The ball will drop into the hole if it rolls on to the hole.

Given the ball position, the hole position and the maze, find out how the ball could drop into the hole by moving the shortest distance. The distance is defined by the number of empty spaces traveled by the ball from the start position (excluded) to the hole (included). Output the moving directions by using 'u', 'd', 'l' and 'r'. Since there could be several different shortest ways, you should output the lexicographically smallest way. If the ball cannot reach the hole, output "impossible".

The maze is represented by a binary 2D array. 1 means the wall and 0 means the empty space. You may assume that the borders of the maze are all walls. The ball and the hole coordinates are represented by row and column indexes.

**Note:**
1. There is only one ball and one hole in the maze.
2. Both the ball and hole exist on an empty space, and they will not be at the same position initially.
3. The given maze does not contain border (like the red rectangle in the example pictures), but you could assume the border of the maze are all walls.
4. The maze contains at least 2 empty spaces, and the width and the height of the maze won't exceed 30.

Example 1:

>Input:\
>[\
>  [0,0,0,0,0],\
>  [1,1,0,0,1],\
>  [0,0,0,0,0],\
>  [0,1,0,0,1],\
>  [0,1,0,0,0],\
>]\
>[4,3]\
>[0,1]\
>Output:\
>"lul"

Example 2:

>Input:\
>[\
>  [0,0,0,0,0],\
>  [1,1,0,0,1],\
>  [0,0,0,0,0],\
>  [0,1,0,0,1],\
>  [0,1,0,0,0],\
]\
>[0,0]\
>[1,1]\
>[2,2]\
>[3,3]\
>Output:\
>"impossible"

## Solution:
```java
/**
 * Approach: BFS
 * Using Point Class and PriorityQueue to make the code more concise
 * and easy understanding.
 *
 * We can solve this problem on the basis of The Maze.
 */
class Solution {
  class Point implements Comparable<Point> {
    int distance;  // distance from ball
    int row;
    int col;
    String directions;  // directions from ball

    Point(int distance, int row, int col, String directions) {
      this.distance = distance;
      this.row = row;
      this.col = col;
      this.directions = directions;
    }
    public int compareTo(Point other) {
      if (this.distance == other.distance) {
        return this.directions.compareTo(other.directions);     
      }
      return this.distance - other.distance;
    }
  }
  public String findShortestWay(int[][] maze, int[] ball, int[] hole) {
    boolean[][] visited = new boolean[maze.length][maze[0].length];

    PriorityQueue<Point> pq = new PriorityQueue<>();

    pq.offer(new Point(0, ball[0], ball[1], ""));

    // arrays used for exploring 4 directions from a point
    char[] dstr = {'d', 'l', 'r', 'u'};
    int[][] dirs = {{1,0},{0,-1},{0,1},{-1,0}};

    while (!pq.isEmpty()) {
      Point pt = pq.poll();
      if (pt.row == hole[0] && pt.col == hole[1]) {
        return pt.directions;
      }
      visited[pt.row][pt.col] = true;

      for (int i = 0; i < dirs.length; i++) {
        int currRow = pt.row;
        int currCol = pt.col;
        int currDist = pt.distance;
        String directions = pt.directions;

        // Explore current direction until hitting a wall or the hole
        while (currRow + dirs[i][0] >= 0 &&
          currRow + dirs[i][0] < maze.length &&
          currCol + dirs[i][1] >= 0 &&
          currCol + dirs[i][1] < maze[0].length &&
          maze[currRow + dirs[i][0]][currCol + dirs[i][1]] != 1
        ) {
          currRow += dirs[i][0];
          currCol += dirs[i][1];
          currDist += 1;

          if (currRow == hole[0] && currCol == hole[1]) {
            break;
          }
        }
        if (!visited[currRow][currCol]) {
          pq.offer(new Point(currDist, currRow, currCol, directions + dstr[i]));
        }
      }
    }
    return "impossible";
  }
}
```