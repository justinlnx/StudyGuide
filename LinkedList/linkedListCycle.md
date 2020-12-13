# LC-141 Linked List Cycle
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:

>3 -> 2 -> 0 -> -4 -> 2\
>Input: head = [3,2,0,-4], pos = 1\
>Output: true\
>Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:\
> 1 -> 2 -> 1\
>Input: head = [1,2], pos = 0\
>Output: true\
>Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
>1\
>Input: head = [1], pos = -1\
>Output: false\
>Explanation: There is no cycle in the linked list.

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) return true;
        }
        
        return false;
    }
}
```


# LC-142 Linked List Cycle II

Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Notice that you should not modify the linked list.

Example 1:

>3 -> 2 -> 0 -> -4 -> 2\
>Input: head = [3,2,0,-4], pos = 1\
>Output: tail connects to node index 1\
>Explanation: There is a cycle in the linked list, where tail connects to the second node.

Example 2:\
> 1 -> 2 -> 1\
>Input: head = [1,2], pos = 0\
>Output: tail connects to node index 0\
>Explanation: There is a cycle in the linked list, where tail connects to the first node.

Example 3:
>1\
>Input: head = [1], pos = -1\
>Output: no cycle\
>Explanation: There is no cycle in the linked list.

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}
```