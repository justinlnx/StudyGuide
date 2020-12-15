# LC-5 Longest Palindrome substring

Given a string s, return the longest palindromic substring in s.

Example 1:

>Input: s = "babad"\
>Output: "bab"\
>Note: "aba" is also a valid answer.\
>Example 2:

>Input: s = "cbbd"\
>Output: "bb"\
>Example 3:

>Input: s = "a"\
>Output: "a"\
>Example 4:

>Input: s = "ac"\
>Output: "a"


```java
class Solution {
    public String longestPalindrome(String s) {
        char[] chars = s.toCharArray();
        int len = s.length();
        while (len >= 0) {
            for (int i = 0; i + len - 1 < chars.length; i++) {
                int left = i;
                int right = i + len - 1;
                boolean good = true;
                while (left < right) {
                    if (chars[left] != chars[right]) {
                        good = false;
                        break;
                    }
                    left++;
                    right--;
                }
                if (good) return s.substring(i, i + len);
            }
            --len;
        }
        return "";
    }
}
```

## Solution - dp
```java
class Solution {
    public String longestPalindrome(String s) {
        if (s.length() == 0) return "";
        
        boolean[][] dp = new boolean[s.length()][s.length()];
        int start = 0, end = 0;
        
        for (int i = 0; i < s.length(); i ++) {
            for (int j = i; j >= 0; j --) {
                boolean startEqEnd = s.charAt(j) == s.charAt(i);
                
                if (i == j) {
                    dp[i][j] = true;
                } else if (i - j == 1) {
                    dp[i][j] = startEqEnd;
                } else if (startEqEnd && dp[i-1][j+1]) {
                    dp[i][j] = true;
                }
                
                if (dp[i][j] && i - j > end - start) {
                    end = i;
                    start = j;
                }
            }
        }
        
        return s.substring(start, end + 1);
    }
}
```