# Insert into a Cycle Linked List

Insert a node into a sorted cycle linked list, and return the new node.

```java
public class LinkedListInsert {
  public ListNode Solution(ListNode head, int val) {
    if (head == null) {
      ListNode node = new ListNode(val);
      node.next = node;
      return node;
    }

    ListNode curr = head;

    while (curr != head) {
      if (val < curr.next.val && val >= curr.val) break;
      if (cur.val > cur.next.val && (val < curr.next.val || val > curr.val)) break;
      curr = curr.next;
    }

    ListNode newNode = new ListNode(val);
    newNode.next = curr.next;
    curr.next = newNode;
    return newNode;
  }
}
```