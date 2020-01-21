# Design Twitter
Design a simplified version of Twitter where users can post tweets, follow/unfollow another user and is able to see the 10 most recent tweets in the user's news feed. Your design should support the following methods:

1. **postTweet(userId, tweetId)**: Compose a new tweet.
2. **getNewsFeed(userId)**: Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
3. **follow(followerId, followeeId)**: Follower follows a followee.
4. **unfollow(followerId, followeeId)**: Follower unfollows a followee.

### Examples:
```
Twitter twitter = new Twitter();

// User 1 posts a new tweet (id = 5).
twitter.postTweet(1, 5);

// User 1's news feed should return a list with 1 tweet id -> [5].
twitter.getNewsFeed(1);

// User 1 follows user 2.
twitter.follow(1, 2);

// User 2 posts a new tweet (id = 6).
twitter.postTweet(2, 6);

// User 1's news feed should return a list with 2 tweet ids -> [6, 5].
// Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.getNewsFeed(1);

// User 1 unfollows user 2.
twitter.unfollow(1, 2);

// User 1's news feed should return a list with 1 tweet id -> [5],
// since user 1 is no longer following user 2.
twitter.getNewsFeed(1);

```

## OOD design:
data structure need in the Tweet system:

>1. A data structure that saves the following relationship
>2. A data structure that saves the tweets posted 

Based on the requirement of method 3: we should get our followees' tweets and select the most recent 10 tweet. So there should have a timestamp inside the tweet. So we create a new class to represent a tweet

>3. A class `Tweet` containing timestamp

There are some tips in the system:

>1. One should get the tweets of itself, which means the followee must contain itself
>2. Since the followee must contains itself, it cannot unfollow itself (unfollow add this constraint)
>3. The followees must be identical

According to the analysis above, we have these data struture in this class:

>1. A inner class Tweet(tweetId, timePosted)
>2. A HashMap(follower, Set(followees))
>3. A HashMap(UserId, List(Tweet))
>4. A Static int timeStamp
>5. A int Maximum number of feed(can adjust if needed, optional)

For method 3, just simply use min heap to get the most recent 10.

```java
public class Twitter {

  private static class Tweet{
      int tweetId;
      int timePosted;
      public Tweet(int tId, int time){
          tweetId = tId;
          timePosted = time;
      }
  }

  static int timeStamp;
  int feedMaxNum;
  Map<Integer, Set<Integer>> followees;
  Map<Integer, List<Tweet>> tweets;

  /** Initialize your data structure here. */
  public Twitter() {
      timeStamp = 0;
      feedMaxNum = 10;
      followees = new HashMap<>();
      tweets = new HashMap<>();
  }

  /** Compose a new tweet. */
  public void postTweet(int userId, int tweetId) {
      if(!tweets.containsKey(userId)) {
          tweets.put(userId, new LinkedList<Tweet>());
          follow(userId, userId);  //follow itself
      }
      tweets.get(userId).add(0, new Tweet(tweetId, timeStamp++)); //add new tweet on the first place
  }

  /** Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. */
  public List<Integer> getNewsFeed(int userId) {
      //min heap that the earliest tweet is on the top
      PriorityQueue<Tweet> feedHeap = new PriorityQueue<>(new Comparator<Tweet>(){
          public int compare(Tweet t1, Tweet t2){
              return t1.timePosted - t2.timePosted;
          }
      });

      //add tweets of the followees
      Set<Integer> myFollowees = followees.get(userId);
      if(myFollowees != null){
          for(int followeeId : myFollowees){
              List<Tweet> followeeTweets = tweets.get(followeeId);
              if(followeeTweets == null) continue;
              for(Tweet t : followeeTweets){
                  // could do more optimization here
                  if(feedHeap.size() < feedMaxNum) feedHeap.add(t);
                  else{
                      if(t.timePosted <= feedHeap.peek().timePosted) break;
                      else{
                          feedHeap.add(t);
                          feedHeap.poll(); //remove the oldest tweet
                      }
                  }
              }
          }
      }
      List<Integer> myFeed = new LinkedList<>();
      while(!feedHeap.isEmpty()){
          myFeed.add(0, feedHeap.poll().tweetId);
      }
      return myFeed;
  }

  /** Follower follows a followee. If the operation is invalid, it should be a no-op. */
  public void follow(int followerId, int followeeId) {
      if(!followees.containsKey(followerId)) followees.put(followerId, new HashSet<Integer>());
      followees.get(followerId).add(followeeId);
  }

  /** Follower unfollows a followee. If the operation is invalid, it should be a no-op. */
  public void unfollow(int followerId, int followeeId) {
      if(!followees.containsKey(followerId) || followerId == followeeId) return; //cannot unfollow itself
      followees.get(followerId).remove(followeeId);
  }
}
```

Design: Twitter 这道题一上来我直接懵了。面试官问我会不会SQL，我默默摇摇头说不会不会 那是啥（希望换道题）而且我并不怎么用twitter。然鹅面试官淡淡一笑开始给我讲起了SQL是啥并且给我举了一些例子orz。题目大概是每个用户会有一个id，然后会有一个大的user table存follower和followee，相当于一个edge set。还会有一个post table，存每条post是啥，谁发的，时间等等。当一个user刷twitter的时候就会遍历这个table，每条post看看这个user有没有follow发布这条post的人，有的话就显示这条post。followups：1. 我们的这个twitter越来越壮大，用户也越来越多。然鹅有用户反映说看不到post。咋回事儿？有啥解决办法？答：这个table太大了，post太多而且edge也多，看每条post自己有没有follow太耗时间。解决办法是当一个用户发布一条twitter的时候notify所有follower。这样看twitter的人就不耗时间了。2. 我们的twitter继续壮大，直到有一天kayne west加入了twitter。所有人都follow他。然鹅kayne west表示自己发不出去twitter。咋回事儿？有啥解决办法？答：太多人follow他，他发一条post要notify所有人特别慢。解决办法我先说可以把用户分两类，follower特别多的和不多的。多的话就让其他用户去查post，少的话就notify所有followee。然鹅我又觉得这种办法不好因为不simple，implement起来特别复杂不straighforward。所以我告诉他说如果是我的话会不变implementation，而是在kayne west界面上先显示他发出去了，其实后台在慢慢跑notify所有他的followee。面试官觉得OK 我心中mmp。3. 按我2的做法可能会出现synchronization problem。比如A先发了一条然后B发了一条。有一个人follow了A和B，但是因为process需要时间可能是B先notify了这个人然后Anotify了他，所以twitter上的顺序可能是错的，问我怎么办？我说谁先notify就notify把，不用等别的post。当一条新的post来的时候，按时间顺序插到对的位置就好了。面试官点了点头 我不知所云。
