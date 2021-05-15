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
    addNewTweetsInReverseChronologicalOrder(lastStreamSize, streams.home.length - 1);
  });

  var $divForTweets = $('<div id="feed"></div>');
  $divForTweets.appendTo($HomeFeed);

  var lastStreamSize = streams.home.length - 1;
  addNewTweetsInReverseChronologicalOrder(0, lastStreamSize);

  function addNewTweetsInReverseChronologicalOrder(oldestTweet, newestTweet) {
    var lastestTweets = [];

    while (newestTweet > oldestTweet){
      var tweet = streams.home[newestTweet];
      var $tweet = $('<div class="tweet"></div>');
      var time = tweet.created_at;
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ', at ' + time.getHours() + ":" + time.getMinutes() + ':' + time.getSeconds());
      lastestTweets.push($tweet);
      newestTweet -= 1;
    }
    $divForTweets.prepend(lastestTweets);
  }

});