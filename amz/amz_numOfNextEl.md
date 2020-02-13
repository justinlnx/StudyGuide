# Number of Next Element in Array
Given an array of where every odd position element is an integer represent how many next even position integer there are. Implement a `next()` function to return the next available number in the array.

For example:
> Input: [2, 2, 1, 7, 3, 5]\
> Output:\
> next(); // 2\
> next(); // 2\
> next(); // 7\
> next(); // 5\
> next(); // 5\
> next(); // 5\
> next(); // throw exception

## Followup 
Solve with least time and space complexity

## Clarify
* input array size, what happens if there are odd number of elements in the array
* 0 case

## Solution
```javascript
arr = [2, 2, 1, 7, 3, 5]
function next() {
  if (this.arr.length === 0) return null;

  if (this.arr[0] === 0) {
    this.arr = this.arr.slice(2);
    return next();
  }

  this.arr = [this.arr.slice(0, 1)[0] - 1, ...this.arr.slice(1)];
  return this.arr[1];
}
```
