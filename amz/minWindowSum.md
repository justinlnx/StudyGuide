# Minimum Window Sum - LC 76
Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:

>Input: S = "ADOBECODEBANC", T = "ABC"\
>Output: "BANC"

Note:
* If there is no such window in S that covers all characters in T, return the empty string "".
* If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

## Solution
```java
class Solution {
	public String minWindow(String ss, String tt) {
		char[] s = ss.toCharArray();
		char[] t = tt.toCharArray();
		if (t.length == 0) {
			return "";
		}
		int[] cntS = new int[256]; // number of apperances of each letter in window
		int[] cntT = new int[256]; // how many times each letter appear in T
		int K = 0; // number of T's unique chars
		for (int i = 0; i < 256; i ++) {
			cntS[i] = cntT[i] = 0;
		}
		for (char c : t) {
			cntT[c] ++;
			if (cntT[c] == 1) { // new char
				K ++;
			}
		}
		
		// t="abcc"
		// cntT[a] = 1, cntT[b] = 1, cntT[c] = 2, K = 3

		int C = 0; // number of T's unique char we have collected in s[l..r-1]
		int ansl = -1, ansr = -1; // final result
		int l, r = 0;
		// r: points to the next of last char
		//  | a b c d e s |
		//    ^            ^
		//    l            r
		// length = r - l
		for (l = 0; l < s.length; l++) {
			// insert into window
			while (r < s.length && C < K) {
				cntS[s[r]] ++;
				if (cntS[s[r]] == cntT[s[r]]) { // reached threshold
					C++;
				}
				r++;
			}
			
			if (C == K) {
				if (ansl == -1 || r - l < ansr - ansl) {
					ansl = l;
					ansr = r;
				}
			}
			
			// s[l] is removed from the window
			cntS[s[l]] --;
			if (cntS[s[l]] == cntT[s[l]] - 1) {
				C--; // removing left caused one found letter removed
			}
		}
		
		if (ansl == -1) {
			return "";
		} else {
			return ss.substring(ansl, ansr);
		}
	}
}
```