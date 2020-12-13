# LC-20 Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.

Open brackets must be closed in the correct order.
 

Example 1:

>Input: s = "()"\
>Output: true\
>Example 2:

>Input: s = "()[]{}"\
>Output: true\
>Example 3:

>Input: s = "(]"\
>Output: false\
>Example 4:

>Input: s = "([)]"\
>Output: false\
>Example 5:

>Input: s = "{[]}"\
>Output: true


```java
class Solution {
    public boolean isValid(String s) {
        HashMap<Character, Character> maps = new HashMap<Character, Character>();
        maps.put(')', '(');
        maps.put(']', '[');
        maps.put('}', '{');
        
        Stack<Character> stack = new Stack<Character>();
        
        for (int i = 0; i < s.length(); i ++) {
            char c = s.charAt(i);
            if (maps.containsKey(c)) {
                if (stack.empty() || stack.pop() != maps.get(c)) {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        
        return stack.empty();
    }
}
```

## Solution 2
```java
class Solution {
    public boolean isValid(String s) {
        if (s == null || s.length() == 0) return true;
        Stack<Character> stack = new Stack<Character>();

        for (int i = 0; i < s.length(); i ++) {
            if (stack.empty()) stack.push(s.charAt(i));
            else if (s.charAt(i) - stack.peek() == 1 || s.charAt(i) - stack.peek() == 2) stack.pop();
            else stack.push(s.charAt(i));
        }

        return stack.empty();
    }
}
```