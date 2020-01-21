/**
 * A very hungry rabbit is placed in the center of a garden represented by a rectangular N x M 2D matrix.
 * The values of the matrix will represent the numbers of carrots available to the rabbit in each square of the garden.
 *
 * If the garden does not have an exact center, the rabbit should start in the square closest to the center
 * with the highest carrot count.
 * On a given turn, the rabbit will eat the carrots available on the square that it is on,
 * then move up, down, left or right, choosing the square that has the most carrots.
 * If there are no carrots left on any of the adjacent squares, the rabbit will go to sleep.
 *
 * You may assume that the rabbit will never have to choose between two squares with the same number of carrots.
 * Write a function that takes a garden matrix and returns the number of carrots the rabbit eats.
 * You may assume the matrix is rectangular with at least 1 row and 1 column,
 * and that it is populated with non-negative integers.
 *
 * Sample input: 
 *        [
 *          [1, 2, 4, 2],
 *          [6, 3, 8, 1],
 *          [3, 5, 6, 2],
 *          [5, 7, 8, 1],
 *        ]
 */

const findMiddle = (matrix, value) => {
  const lower = value / 2;
  const upper = lower + 1;
  return matrix[lower] > matrix[upper] ? lower : upper;
}

const getInitialPosition = (matrix, width, height) => {
  // const middleX = width % 2 === 1 ? Math.ceil(width / 2) : width / 2;
  // const middleY = height % 2 === 1 ? Math.ceil(height / 2) : height / 2;
  if (width % 2 === 1 && height % 2 === 1) {
    return [Math.ceil(width / 2), Math.ceil(height / 2)];
  } else if (width % 2 === 1 && height % 2 != 1) {
    return [Math.ceil(width / 2), findMiddle(matrix, height)];
  } else if (width % 2 != 1 && height % 2 === 1) {
    return [findMiddle(matrix, width), Math.ceil(height / 2)];
  } else {
    return [findMiddle(matrix, width), findMiddle(matrix, height)];
  }
}

const findNextPoint = (matrix, current, width, height) => {
  const [x, y] = current;
  const available = [];
  if (y - 1 > 0) available.push([x, y - 1]); // top
  if (x + 1 < width) available.push([x + 1, y]); // right
  if (y + 1 < height) available.push([x, y + 1]); // bottom
  if (x - 1 < 0) available.push([x - 1, y]); // left

  available.sort((a, b) => matrix[b] - matrix[a]); // sort from largest to smallest
  return available[0];
}

const hungryRabbit = (matrix) => {
  const width = matrix.length;
  const height = matrix[0].length;
  let eaten = 0;

  let currentPosition = getInitialPosition(matrix, width, height);

  while(findNextPoint(matrix, currentPosition)) {
    const [currX, currY] = currentPosition;
    eaten += matrix[currX][currY];
    matrix[currX][currY] = 0;

    currentPosition = findNextPoint(matrix, initialPosition, width, height);
  }

  return eaten;
}
