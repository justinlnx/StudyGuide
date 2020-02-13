# Top K Frequent Words - LC 692
Given a non-empty list of words, return the k most frequent elements.

Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

Example 1:
>Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2\
>Output: ["i", "love"]\
>Explanation: "i" and "love" are the two most frequent words. Note that "i" comes before "love" due to a lower alphabetical order.

Example 2:
>Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4\
>Output: ["the", "is", "sunny", "day"]\
>Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.

**Note:**
* You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
* Input words contain only lowercase letters.

## Solution
```java
// time: O(nlogk)
class Solution {
  public List<String> topKFrequent(String[] words, int k) {
    Map<String, Integer> count = new HashMap();
    for (String word : words) {
      count.put(word, count.getOrDefault(word, 0) + 1);
    }
    PriorityQueue<String> pq = new PriorityQueue<>((w1, w2) -> count.get(w1).equals(count.get(w2)) ? w2.compareTo(w1) : count.get(w1) - count.get(w2));
    for (String word : count.keySet()) {
      pq.offer(word);
      if (pq.size() > k) pq.poll();
    }
    
    List<String> res = new ArrayList();
    while(!pq.isEmpty()) res.add(0, pq.poll());
    return res;
  }
}
```
