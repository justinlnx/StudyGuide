# Top N Buzzwords
You work on a team whose job is to understand the most sought after toys for the holiday season. A teammate of yours has built a webcrawler that extracts a list of quotes about toys from different articles. You need to take these quotes and identify which toys are mentioned most frequently. Write an algorithm that identifies the top N toys out of a list of quotes and list of toys.

Your algorithm should output the top N toys mentioned most frequently in the quotes.

Input:
The input to the function/method consists of five arguments:

>`numToys`, an integer representing the number of toys\
>`topToys`, an integer representing the number of top toys your algorithm needs to return;\
>`toys`, a list of strings representing the toys,\
>`numQuotes`, an integer representing the number of quotes about toys;\
>`quotes`, a list of strings that consists of space-sperated words representing articles about toys

Output:
* Return a list of strings of the most popular N toys in order of most to least frequently mentioned

Note:
* The comparison of strings is case-insensitive.
* If the value of topToys is more than the number of toys, return the names of only the toys mentioned in the quotes. 
* If toys are mentioned an equal number of times in quotes, sort alphabetically.

Example 1:

Input:
>numToys = 6\
>topToys = 2
>toys = ["elmo", "elsa", "legos", "drone", "tablet", "warcraft"]\
>numQuotes = 6\
>quotes = [\
>"Elmo is the hottest of the season! Elmo will be on every kid's wishlist!",\
>"The new Elmo dolls are super high quality",\
>"Expect the Elsa dolls to be very popular this year, Elsa!",\
>"Elsa and Elmo are the toys I'll be buying for my kids, Elsa is good",\
>"For parents of older kids, look into buying them a drone",\
>"Warcraft is slowly rising in popularity ahead of the holiday season"\
>];

Output:
>["elmo", "elsa"]

Explanation:

>elmo - 4\
>elsa - 4\
>"elmo" should be placed before "elsa" in the result because "elmo" appears in 3 different quotes and "elsa" appears in 2 different quotes.

## Solution:
* using a custom class for managing word stats and a PriorityQueue for sorting the top words.
* Output: [elmo, elsa]
* Runtime: O(qw) where q is the number of quotes and w the number of words.
```java
class Solution {
  private static List<String> topNBuzzwords(int numToys, int topToys, String[] toys, int numQuotes, String[] quotes) {
    List<String> res = new ArrayList<>();
    Set<String> setToys = new HashSet<>();
    Map<String, WordStats> mapWords = new HashMap<>(); 
    
    // 1. process inputs
    for (int i = 0; i < numToys; i++)
      setToys.add(toys[i]);

    for (int i = 0; i < numQuotes; i++) {
      String q = quotes[i];
      q = q.replaceAll("[\\!?,;.]", "").toLowerCase();
      String[] words = q.split(" ");
      
      for (int w = 0; w < words.length; w++) {
        String word = words[w];
        if (setToys.contains(word)) {
          WordStats stats;
          if (mapWords.containsKey(word))
            stats = mapWords.get(word);
          else
            stats = new WordStats(word, 0);
          stats.countTimes++;
          stats.quotesIds.add(i);
          mapWords.put(word, stats);
        }
      }
    }

    // 2. sort the toys based on requirements
    PriorityQueue<WordStats> pq = new PriorityQueue<WordStats>(new Comparator<WordStats>() {
      @Override
      public int compare(WordStats o1, WordStats o2) {
        if (o1.countTimes != o2.countTimes)
          return Integer.compare(o2.countTimes, o1.countTimes);
        else if (o1.quotesIds.size() != o2.quotesIds.size())
          return Integer.compare(o2.quotesIds.size(), o1.quotesIds.size());
        else
          return o1.word.compareTo(o2.word);
      }
    });
    pq.addAll(mapWords.values());

    // 3. printout the output
    if (topToys > pq.size())
      for (int i = 0; i < numToys && !pq.isEmpty(); i++)
        res.add(pq.poll().word);
    else
      for (int i = 0; i < pq.size(); i++)
        res.add(pq.poll().word);

    return res;
  }

  private static class WordStats {
    String word;
    int countTimes;
    Set<Integer> quotesIds;
    public WordStats(String word, int countTimes) {
      this.word = word;
      this.countTimes = countTimes;
      this.quotesIds = new HashSet<>();
    }
  }
}
```
