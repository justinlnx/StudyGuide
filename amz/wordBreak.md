# Word Break 2 - LC 140
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.

Example 1:
>Input:\
>s = "catsanddog"\
>wordDict = ["cat", "cats", "and", "sand", "dog"]\
>Output:\
>[\
>  "cats and dog",\
>  "cat sand dog"\
>]

Example 2:

>Input:\
>s = "pineapplepenapple"\
>wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]\
>Output:\
>[\
>  "pine apple pen apple",\
>  "pineapple pen apple",\
>  "pine applepen apple"\
>]

Explanation: Note that you are allowed to reuse a dictionary word.

Example 3:
>Input:\
>s = "catsandog"\
>wordDict = ["cats", "dog", "sand", "and", "cat"]\
>Output:\
>[]

## Solution
```java
class Solution {
  public List<String> wordBreak(String s, List<String> wordDict) {
    return dfs(s, wordDict, new HashMap<String, LinkedList<String>>());
  }
  
  public List<String> dfs(String s, List<String> wordDict, HashMap<String, LinkedList<String>> map) {
    if (map.containsKey(s)) {
      return map.get(s);
    }
    
    Linked
    List<String> res = new LinkedList<String>();
    if (s.length() == 0) {
      res.add("");
      return res;
    }

    for (String word : wordDict) {
      if (s.startsWith(word)) {
        List<String> sublist = dfs(s.substring(word.length()), wordDict, map);
        for (String sub : sublist) {
          res.add(word + (sub.isEmpty() ? "" : " ") + sub);
        }
      }
    }
    map.put(s, res);
    return res;
  }
}
```
