# Longest Substring without Reapting Characters - LC 3
Given a string, find the length of the longest substring without repeating characters.

Example 1:

>Input: "abcabcbb"\
>Output: 3 \
>Explanation: The answer is "abc", with the length of 3. 

Example 2:

>Input: "bbbbb"\
>Output: 1\
>Explanation: The answer is "b", with the length of 1.

Example 3:

>Input: "pwwkew"\
>Output: 3\
>Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

## Solution:
```java
class Solution {
	public int lengthOfLongestSubstring(String s) {
		int[] cnt = new int[256];
		char[] sc = s.toCharArray();

		int ans = 0;
		for (int l = 0, r = 0; r < s.length(); r++) {
			cnt[sc[r]]++;
			while (cnt[sc[r]] > 1) {
				cnt[sc[l]]--;
				l++;
			}
			ans = Math.max(ans, r - l + 1);
		}
		return ans;
	}
}
```