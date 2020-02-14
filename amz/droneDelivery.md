# Drone Deliver - OA
**Input:** 
* `maxTravelDis`: an integer representing the maximum operating travel distance of the given aircraft.
* `forwardRouteList`: a list of pairs of integers where the first integer represents the unique identifier of a forward shipping route and the second integer represents the amount of travel distance required by this shipping route
* `returnRouteList`: similar to above

**Output:**

Returns a list of paris of integers representing the pairs of IDs of forward and return shipping routes that optimally utilize the given aircraft. If no route is possible, return an empty list.

Example 1:
>Input:\
>maxTravelDist = 7000\
>forwardRouteList=[[1, 2000], [2, 4000], [3, 6000]]\
>returnRouteList=[[1, 2000]]\
>\
>Output:\
>[[2, 1]]\
>\
>Explanation:\
>There are only three combinations, [1, 1], [2, 1], [3, 1], which have a total of 4000, 6000, and 8000 miles, respectively. Since 6000 is the largest can be used that does not exceed 7000, [2, 1] is the only optimal pair.

Example 2:
>Input:\
>maxTravelDist = 10000\
>forwardRouteList=[[1, 3000], [2, 5000], [3, 7000], [4, 10000]]\
>returnRouteList=[[1, 2000], [2, 3000], [3, 4000], [4, 5000]]\
>\
>Output:\
>[[2, 4], [3, 2]]\
>\
>Explanation:\
>[2, 4] and [3, 2] both uses 10000 miles, fully utlizes the craft.

## Solution:
```java
class Solution {
  public List<List<Integer>> findPairs(List<List<Integer>> forwardList, List<List<Integer>> returnList, int maxSum) {
    int currMax = 0;
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < forwardList.size(); i ++) {
      for (int j = 0; j < returnList.size(); j ++) {
        int total = forwardList.get(i) + returnList.get(j);

        if (total > maxSum) {
          continue;
        }

        if (total >= currMax) {
          List<Integer> route = new ArrayList<>();
          route.add(forwardList.get(i).get(0));
          route.add(returnList.get(j).get(0));
          if (total > currMax) {
            result = new ArrayList<>();
          }
          result.add(route);
          currMax = total;
        }
      }
    }
  }
}
```
