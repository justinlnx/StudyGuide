# Insert Interval - LC 57
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

Example 1:
>Input: intervals = [[1,3],[6,9]], newInterval = [2,5]\
>Output: [[1,5],[6,9]]

Example 2:

>Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]\
>Output: [[1,2],[3,10],[12,16]]\
>Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

## Solution
```javascript
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  if (!intervals || intervals.length === 0) return [newInterval];
  if (!newInterval) return intervals;
  
  const res = [];
  var i = 0;
  // add all intervals that end is before newInterval start
  while(i < intervals.length && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i]);
    i++
  }
  // merge all overlapping intervals to one
  var intervalToAdd = newInterval;
  while(i < intervals.length && intervals[i][0] <= newInterval[1]) {
    intervalToAdd = [
      Math.min(intervalToAdd[0], intervals[i][0]),
      Math.max(intervalToAdd[1], intervals[i][1]),
    ];
    i++;
  }
  res.push(intervalToAdd);
  // add the rest
  
  return [...res, ...intervals.slice(i)];
};
```
