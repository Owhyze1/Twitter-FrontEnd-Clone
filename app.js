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
  $updateFeedButton.appendTo($TweetFeed);
  $updateFeedButton.on("click", function(event) {
    console.log(event);
    alert('Feed updating');
  });

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($TweetFeed);
    index -= 1;
  }

});