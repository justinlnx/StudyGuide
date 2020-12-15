# Find the point where maximum intervals overlap
Consider a big party where a log register for guest’s entry and exit times is maintained. Find the time at which there are maximum guests in the party. Note that entries in register are not in any order.
Example : 

>Input: arrl[] = {1, 2, 9, 5, 5}\
>       exit[] = {4, 5, 12, 9, 12}\
>First guest in array arrives at 1 and leaves at 4, second guest arrives at 2 and leaves at 5, and so on.\
>\
>Output: 5\
>There are maximum 3 guests at time 5.  

```java
class Solution {
  public int maxOverlap(int[] start, int[] end, int n) {
    Arrays.sort(start);
    Arrays.sort(end);

    int guestsIn = 1, maxGuests = 1, time = start[0];
    int i = 1, j = 0;

    while (i < n && j < n) {
      if (start[i] <= exit[j]) {
        guestsIn ++;

        if (guestsIn > maxGuests) {
          maxGuests = guestsIn;
          time = start[i];
        }
        i++;
      } else {
        guestsIn --;
        j ++;
      }
    }

    return i;
  }
}
```