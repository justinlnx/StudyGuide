# LC 23 - Merge K Sorted Lists
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

>Input: lists = [[1,4,5],[1,3,4],[2,6]]\
>Output: [1,1,2,3,4,4,5,6]\
>Explanation: The linked-lists are:\
>[\
>  1->4->5,\
>  1->3->4,\
>  2->6\
>]\
>merging them into one sorted list:\
>1->1->2->3->4->4->5->6

Example 2:
>Input: lists = []\
>Output: []

Example 3:
>Input: lists = [[]]\
>Output: []

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
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length == 0 || lists == null) return null;
        return mergeSort(lists, 0, lists.length - 1);
    }
    
    private static ListNode mergeSort(ListNode[] lists, int i, int j) {
        if (j - i < 2) {
            return mergeTwo(lists[i], lists[j]);
        } else {
            int mid = (i + j) / 2;
            return mergeTwo(mergeSort(lists, i, mid), mergeSort(lists, mid + 1, j));
        }
    }
    
    private static ListNode mergeTwo(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        if (l1 == l2) return l1;
        if (l1.val < l2.val) {
            l1.next = mergeTwo(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwo(l1, l2.next);
            return l2;
        }
    }
}
```
