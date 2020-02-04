# LRU Cache

Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

`get(key)` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
`put(key, value)` - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a positive capacity.


**`Follow up`**:
>Could you do both operations in O(1) time complexity?


**`Example:`**
```java
LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```


## Solution
```java
class LRUCache {
    private class Node {
        int key;
        int val;
        Node prev;
        Node next;
        
        Node(int k, int v) {
            this.key = k;
            this.val = v;
        }
        
        Node() {
            this(0, 0);
        }
    }
    private int cap;
    private int count;
    private Map<Integer, Node> map;
    private Node head;
    private Node tail;
        
    public LRUCache(int capacity) {
        this.cap = capacity;
        this.count = 0;
        map = new HashMap<>();
        head = new Node();
        tail = new Node();
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        Node n = map.get(key);
        if (n == null) {
            return -1;
        }
        update(n);
        return n.val;
    }
    
    public void put(int key, int value) {
        Node n = map.get(key);
        if (n == null) {
            n = new Node(key, value);
            map.put(key, n);
            add(n);
            ++count;
        } else {
            n.val = value;
            update(n);
        }
        if (count > cap) {
            Node del = tail.prev;
            remove(del);
            map.remove(del.key);
            --count;
        }
    }
    
    private void update(Node node) {
        remove(node);
        add(node);
    }
    
    private void add(Node node) {
        Node after = head.next;
        head.next = node;
        node.prev = head;
        node.next = after;
        after.prev = node;
    }
    
    private void remove(Node node) {
        Node before = node.prev;
        Node after = node.next;
        before.next = after;
        after.prev = before;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
```
