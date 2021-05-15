$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $TweetFeed = $('<div><h2>Tweet Feed</h2></div>');
  $TweetFeed.appendTo($app);

  var $HomeFeed = $('<div><h3>Home Feed</h3></div>');
  $HomeFeed.appendTo($TweetFeed);

  var $updateFeedButton = $('<button type="button" id="update-feed">Update Feed</button>');
  $updateFeedButton.appendTo($HomeFeed);
  $updateFeedButton.on("click", function(event) {
    // need to update tweets
    var streamSize = streams.home.length - 1;
    addNewTweetsInReverseChronologicalOrder(lastStreamSize);
  });

  var $divForTweets = $('<div></div>');
  $divForTweets.appendTo($HomeFeed);


  var index = streams.home.length - 1;
  var lastStreamSize = index;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    // $tweet.text('@' + tweet.user + ': ' + tweet.message + '       ' + tweet.created_at.getHours() + ":" + tweet.created_at.getMinutes() + ":" + tweet.created_at.getSeconds());
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($divForTweets);
    index -= 1;
  }


  var addNewTweetsInReverseChronologicalOrder = function(oldestDisplayedTweetIndex) {
    var mostRecentTweetIndex = streams.home.length - 1;
    var lastestTweets = [];

    while (mostRecentTweetIndex > oldestDisplayedTweetIndex){
      var tweet = streams.home[mostRecentTweet];
      var $tweet = $('<div class="tweet"></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message + '         ' + tweet.created_at.getHours() + ":" + tweet.created_at.getMinutes() + ":" + tweet.created_at.getSeconds());
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      lastestTweets.push($tweet);
      mostRecentTweetIndex -= 1;
    }
    $divForTweets.prepend(lastestTweets);
  }




});