# LC-206 Reverse Linked List

Reverse a singly linked list.

Example:

>Input: 1->2->3->4->5->NULL\
>Output: 5->4->3->2->1->NULL

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode temp = new ListNode();
        temp.next = head;
        ListNode pre = temp.next;
        ListNode cur = pre.next;
        
        while (cur != null) {
            pre.next = cur.next;
            cur.next = temp.next;
            temp.next = cur;
            cur = pre.next;
        }
        
        return temp.next;
    }
}
```

## Reverse second half of the linked list

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseSecondHalfList(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode fast = head;
        ListNode slow = head;

        while (fast.next != null && fast.next.next != null) {
          fast = fast.next.next;
          slow = slow.next;
        }

        ListNode pre = slow.next;
        ListNode cur = pre.next;
        
        while (cur != null) {
            pre.next = cur.next;
            cur.next = slow.next;
            slow.next = cur;
            cur = pre.next;
        }
        
        return head;
    }
}
```