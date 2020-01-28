# Write a method to compute all the permutations of a string

Let's assume a given string S represented by the letters `A1, A2, A3, ... , An`

To permute set S, we can select the first character, `A1`, permute the remainder of the string to get a new list. Then, with that new list, we can push `A1` into each possible position.
For example, if our string is `"abc"`, we would do the following:

>1. Let first = "a" and let remainder = "bc"
>2. Let list = `permute(bc) = {"bc", "cd"}`
>3. Push "a" into each location of "bc" (--> "abc", "bac", "bca") and "cb" (--> "acb", "cab", "cba")
>4. Return our new list

Now, the code to do this:
```java
public static ArrayList<String> getPerms(String s) {
  ArrayList<String> permutations = new ArrayList<String>();
  if (s == null) {
    return null;
  } else if (s.length() == 0) {
    permutations.add("");
    return permutations;
  }

  char first = s.chatAt(0);
  String remainder = s.substring(1);
  ArrayList<String> words = getPerms(remainder);
  for (String word : words) {
    for (int i = 0; i <= word.lengths(); i++) {
      permutations.add(insertCharAt(word, first, i));
    }
  }
  return permutations;
}

public static String insertCharAt(String word, char c, int i) {
  String start = word.substring(0, i);
  String end = word.substring(i);
  return start + c + end;
}
```