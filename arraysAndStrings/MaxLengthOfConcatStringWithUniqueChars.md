# LC-1239 Maximum Length of a Concatenated String with Unique Characters
Given an array of strings arr. String s is a concatenation of a sub-sequence of arr which have unique characters.

Return the maximum possible length of s.

Example 1:

>Input: arr = ["un","iq","ue"]\
>Output: 4\
>Explanation: All possible concatenations are "","un","iq","ue","uniq" and "ique".\
>Maximum length is 4.

Example 2:

>Input: arr = ["cha","r","act","ers"]\
>Output: 6\
>Explanation: Possible solutions are "chaers" and "acters".

Example 3:
>Input: arr = ["abcdefghijklmnopqrstuvwxyz"]\
>Output: 26\

```java
class Solution {
    public int maxLength(List<String> arr) {
        return backTrack(arr, 0, 0, new int[26]);
    }
    
    private int backTrack(List<String> arr, int index, int len, int[] set){
        if(index >= arr.size()) return len;
        
        boolean containsUniqChar = true;
        char[] chars = arr.get(index).toCharArray();
        
        for(char ch: chars) {
            if(++set[ch - 'a'] > 1){
                containsUniqChar = false;
            }
        }
        
        int uniq = 0;
        if(containsUniqChar) {
            uniq = backTrack(arr, index + 1, len + chars.length, set);
        }
        
        for(char ch : chars) {
            set[ch - 'a']--;
        }
        
        return Math.max(uniq, backTrack(arr, index + 1, len, set));
    }
}
```