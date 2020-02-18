# Word Break 1 - LC 139
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:
* The same word in the dictionary may be reused multiple times in the segmentation.
* You may assume the dictionary does not contain duplicate words.

Example 1:

>Input: s = "leetcode", wordDict = ["leet", "code"]\
>Output: true\
>Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:

>Input: s = "applepenapple", wordDict = ["apple", "pen"]\
>Output: true\
>Explanation: Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.

Example 3:

>Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]\
>Output: false

## Solution
```java
// dp
class Solution {
  public boolean wordBreak(String s, Set<String> dict) {
    boolean[] f = new boolean[s.length() + 1];
    f[0] = true;
    for (int i = 1; i <= s.length(); i ++) {
      for (int j = 0; j < i; j ++) {
        if (f[j] && dict.contains(s.substring(j, i))) {
          f[i] = true;
          break;
        }
      }
    }
    return f[s.length()];
  }
}
```


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
    
    LinkedList<String> res = new LinkedList<String>();
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
