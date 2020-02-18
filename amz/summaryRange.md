# Summary Ranges - LC 228
Given a sorted integer array without duplicates, return the summary of its ranges.

Example 1:

>Input:  [0,1,2,4,5,7]\
>Output: ["0->2","4->5","7"]\
>Explanation: 0,1,2 form a continuous range; 4,5 form a continuous range.

Example 2:

>Input:  [0,2,3,4,6,8,9]\
>Output: ["0","2->4","6","8->9"]\
>Explanation: 2,3,4 form a continuous range; 8,9 form a continuous range.

## Solution:
```java
class Solution {
  public List<String> summaryRanges(int[] nums) {
    List<String> list = new ArrayList();
    if (nums.length == 1) {
      list.add(nums[0] + "");
      return list;
    }

    for (int i = 0; i < nums.length; i++) {
      int a = nums[i];
      while (i + 1 < nums.length && (nums[i + 1] - nums[i]) == 1) {
        i++;
      }
      if (a != nums[i]) {
        list.add(a + "->" + nums[i]);
      } else {
        list.add(a + "");
      }
    }
    return list;
  }
}
```

## Unsorted Array Solution:
```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

const summaryRangesList = (nums) => {
  const ret = [];
  const map = new Map();

  for(let i = 0; i < nums.length; i++) {
    const node = new Node(nums[i]);
    map.set(node.val, node);

    if (map.has(node.val-1)) {
      node.prev = map.get(node.val-1);
      node.prev.next = node;
    }

    if (map.has(node.val+1)) {
      node.next = map.get(node.val+1);
      node.next.prev = node;
    }
  }

  for(let node of map.values()) {
    if (node.prev === null && node.next === null) {
      ret.push(node.val + "");
      continue;
    }

    if (node.prev === null && node.next != null) {
      let start = node.val;
      let last = node;
      while(last.next != null) {
        last = last.next;
      }

      ret.push(`${start}->${last.val}`)
    }
  }

  return ret;
}
```
