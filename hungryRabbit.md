# Hungry Rabbit

A very hungry rabbit is placed in the center of a garden represented by a rectangular N x M 2D matrix. The values of the matrix will represent the numbers of carrots available to the rabbit in each square of the garden. If the garden does not have an exact center, the rabbit should start in the square closest to the center with the highest carrot count.

On a given turn, the rabbit will eat the carrots available on the square that it is on, then move up, down, left or right, choosing the square that has the most carrots. If there are no carrots left on any of the adjacent squares, the rabbit will go to sleep.

You may assume that the rabbit will never have to choose between two squares with the same number of carrots.

Write a function that takes a garden matrix and returns the number of carrots the rabbit eats. You may assume the matrix is rectangular with at least 1 row and 1 column, and that it is populated with non-negative integers.

Sample input:
```
[
  [1, 2, 4, 2],
  [6, 3, 8, 1],
  [3, 5, 6, 2],
  [5, 7, 8, 1],
]
```

## Solution:
```javascript
const fromLargeToSmall = (matrix) => ([ar, ac], [br, bc]) => matrix[br][bc] - matrix[ar][ac];

const getInitialPosition = (matrix, width, height) => {
  if (width % 2 === 1 && height % 2 === 1) {
    return [Math.floor(width / 2), Math.floor(height / 2)];
  } else if (width % 2 === 1 && height % 2 != 1) {
    const col = Math.floor(width / 2);
    return [
      [height / 2][col],
      [(height / 2) - 1][col],
    ].sort(fromLargeToSmall(matrix))[0];
  } else if (width % 2 != 1 && height % 2 === 1) {
    const row = Math.floor(height / 2);
    return [
      [row][width / 2],
      [row][(width / 2) - 1],
    ].sort(fromLargeToSmall(matrix))[0];
  } else {
    const col = width / 2;
    const row = height / 2;
    return [
      [row, col],
      [row - 1, col],
      [row, col - 1],
      [row - 1, col - 1],
    ].sort(fromLargeToSmall(matrix))[0];
  }
}

const findNextPoint = (matrix, current, width, height) => {
  const [x, y] = current;
  const available = [];
  if (y > 0) available.push([x, y - 1]); // top
  if (x < width - 1) available.push([x + 1, y]); // right
  if (y < height - 1) available.push([x, y + 1]); // bottom
  if (x > 0) available.push([x - 1, y]); // left

  return available.sort(fromLargeToSmall(matrix))[0]; // sort from largest to smallest
}

const hungryRabbit = (matrix) => {
  const width = matrix.length;
  const height = matrix[0].length;
  let eaten = 0;

  let currentPosition = getInitialPosition(matrix, width, height);
  console.log(currentPosition);

  while(matrix[currentPosition[0]][currentPosition[1]] !== 0) {
    const [currX, currY] = currentPosition;
    eaten += matrix[currX][currY];
    matrix[currX][currY] = 0;

    // matrix.forEach(r => console.log(r));
    // console.log();
    currentPosition = findNextPoint(matrix, currentPosition, width, height);
  }

  return eaten;
}

```
