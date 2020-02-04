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
        
        return validate(node.right, val, upper) && validate(node.left, lower, val);
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

## Solution 2: Threaded Binary Search Tree
The idea of threaded binary trees is to make inorder traversal faster and do it without stack and without recursion. A binary tree is made threaded by making all right child pointers that would normally be NULL point to the inorder successor of the node (if it exists).


```java
/**
 * Definition for a threaded binary tree node.
 *  right pointer can point to either the right child node
 *  or an inorder successor (when node.right is null)
 *  use rightThread to determine whether if this node has a right child node
 *  or it has a right thread node
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     bool rightThread;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isValidBST(TreeNode root) {
        Node curr = leftMost(root);
        bool valid = true;
        while (curr != null && valid == true) {
          if (curr.rightThread) {
            // this node is a thread node, where node.right is null,
            // then it should go to inorder successor
            if (curr.val >= curr.right.val) {
              valid = false;
              break;
            }
            curr = curr.right;
          } else {
            // go to the left most child of its right children
            Node left = leftMost(curr.right);
            if (curr.val >= left.val) {
              valid = false;
              break;
            }
            curr = left;
          }
        }
    }

    private Node leftMost(TreeNode node) {
      if (node == null) return null;
      Node n = node;
      while (n.left != null) {
        n = n.left;
      }
      return n;
    }
}
```
