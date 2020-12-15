# LC-648 Replace Words
In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another".

Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.

Return the sentence after the replacement.

Example 1:

>Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the >battery"\
>Output: "the cat was rat by the bat"

Example 2:
>Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"\
>Output: "a a b c"

Example 3:
>Input: dictionary = ["a", "aa", "aaa", "aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"\
>Output: "a a a a a a a a bbb baba a"

Example 4:
>Input: dictionary = ["catt","cat","bat","rat"], sentence = "the cattle was rattled >by the battery"\
>Output: "the cat was rat by the bat"

Example 5:
>Input: dictionary = ["ac","ab"], sentence = "it is abnormal that this solution is accepted"\
>Output: "it is ab that this solution is ac"

## Solution - Prefix Hash
Store all the roots in a Set structure. Then for each word, look at successive prefixes of that word. If you find a prefix that is a root, replace the word with that prefix. Otherwise, the prefix will just be the word itself, and we should add that to the final sentence answer.

```java
class Solution {
    public String replaceWords(List<String> dictionary, String sentence) {
        Set<String> rootSet = new HashSet();
        for (String root: dictionary) rootSet.add(root);
        
        StringBuilder ans = new StringBuilder();
        for (String word: sentence.split("\\s+")) {
            String prefix = "";
            for (int i = 1; i <= word.length(); i ++) {
                prefix = word.substring(0, i);
                if (rootSet.contains(prefix)) break;
            }
            
            if (ans.length() > 0) ans.append(" ");
            ans.append(prefix);
        }
        
        return ans.toString();
    }
}
```

## Solution - TrieNode

Put all the roots in a trie (prefix tree). Then for any query word, we can find the smallest root that was a prefix in linear time.

```java
class Solution {
    public String replaceWords(List<String> roots, String sentence) {
        TrieNode trie = new TrieNode();
        for (String root: roots) {
            TrieNode cur = trie;
            for (char letter: root.toCharArray()) {
                if (cur.children[letter - 'a'] == null)
                    cur.children[letter - 'a'] = new TrieNode();
                cur = cur.children[letter - 'a'];
            }
            cur.word = root;
        }

        StringBuilder ans = new StringBuilder();

        for (String word: sentence.split("\\s+")) {
            if (ans.length() > 0)
                ans.append(" ");

            TrieNode cur = trie;
            for (char letter: word.toCharArray()) {
                if (cur.children[letter - 'a'] == null || cur.word != null)
                    break;
                cur = cur.children[letter - 'a'];
            }
            ans.append(cur.word != null ? cur.word : word);
        }
        return ans.toString();
    }
}

class TrieNode {
    TrieNode[] children;
    String word;
    TrieNode() {
        children = new TrieNode[26];
    }
}
```