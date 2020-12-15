# 49 Group Anagrams
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

>Input: strs = ["eat","tea","tan","ate","nat","bat"]\
>Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:

>Input: strs = [""]\
>Output: [[""]]

Example 3:

>Input: strs = ["a"]\
>Output: [["a"]]

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        if (strs.length == 0) return new ArrayList<>();
        Map<String, List> map = new HashMap<>();
        for (String s : strs) {
            char[] ch = s.toCharArray();
            Arrays.sort(ch);
            String key = String.valueOf(ch);
            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(s);
        }
        
        return new ArrayList(map.values());
    }
};
```
