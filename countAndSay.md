# 38 Count and Say
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

* countAndSay(1) = "1"
* countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), which is then converted into a different digit string.

To determine how you "say" a digit string, split it into the minimal number of groups so that each group is a contiguous section all of the same character. Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and concatenate every saying.

For example, the saying and conversion for digit string "3322251":


Given a positive integer n, return the nth term of the count-and-say sequence.


Example 1:

>Input: n = 1\
>Output: "1"\
>Explanation: This is the base case.
Example 2:
>Input: n = 4\
>Output: "1211"\
>Explanation:\
>countAndSay(1) = "1"\
>countAndSay(2) = say "1" = one 1 = "11"\
>countAndSay(3) = say "11" = two 1's = "21"\
>countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"
 

**Constraints:**

* 1 <= n <= 30

```java
class Solution {
    public String countAndSay(int n) {
        LinkedList<Integer> prevSeq = new LinkedList<Integer>();
        prevSeq.add(1);
        // use -1 as the delimiter
        prevSeq.add(-1);
        
        List<Integer> finalSeq = nextSequence(n, prevSeq);
        StringBuffer sb = new StringBuffer();
        for (Integer digit: finalSeq) {
            sb.append(String.valueOf(digit));
        }
        return sb.toString();
    }
    
    private LinkedList<Integer> nextSequence(int n, LinkedList<Integer> prevSeq) {
        if (n <= 1) {
            prevSeq.pollLast();
            return prevSeq;
        }
        
        LinkedList<Integer> nextSeq = new LinkedList<Integer>();
        Integer prevDigit = null;
        Integer digitCount = 0;
        for (Integer digit : prevSeq) {
            if (prevDigit == null) {
                prevDigit = digit;
                digitCount ++;
            } else if (digit == prevDigit) {
                digitCount ++;
            } else {
                nextSeq.add(digitCount);
                nextSeq.add(prevDigit);
                prevDigit = digit;
                digitCount = 1;
            }
        }
        
        nextSeq.add(-1);
        return nextSequence(n - 1, nextSeq);
    }
}
```

## Solution 2
```java
class Solution {
    public String countAndSay(int n) {
        StringBuilder curr = new StringBuilder("1");
        StringBuilder prev;
        int count;
        char say;
        for (int i = 1; i < n; i ++) {
            prev = curr;
            curr = new StringBuilder();
            count = 1; 
            say = prev.charAt(0);
            
            int len = prev.length();
            for (int j = 1; j < len; j ++) {
                if (prev.charAt(j) != say) {
                    curr.append(count).append(say);
                    count = 1;
                    say = prev.charAt(j);
                } else {
                    count ++;
                }
            }
            curr.append(count).append(say);
        }
        return curr.toString();
    }
}
```