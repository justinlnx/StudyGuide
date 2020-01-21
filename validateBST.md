# Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    
    public boolean validate(TreeNode node, Integer lower, Integer upper) {
        if (node == null) return true;
        
        int val = node.val;
        if (lower != null && val <= lower) return false;
        if (upper != null && val >= upper) return false;
        
        if (!validate(node.right, val, upper)) return false;
        if (!validate(node.left, lower, val)) return false;
        
        return true;
    }
}
```

Notes:
1. What if node is string.
  - if its number value inside a string, try converting it. `val = Integer.parseInt(node.val)`
  - if its random string, use string characters length or string buffer size `java.lang.StringBuffer.length()`
  - check the byte size. each char is 2 bytes. but dependends on encoder, size could be different.
2. javascript, seriazlied json byte size
  - `var byteSize = Buffer.from(JSON.stringify(str)).length;`
