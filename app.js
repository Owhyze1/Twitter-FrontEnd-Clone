$(document).ready(function () {

  // select existing elements
  var $app = $('#app');
  // $app.html('');

  // create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $TweetFeed = $('<div><h2>Tweet Feed</h2></div>');
  var $HomeFeed = $('<div><h3>Home Feed</h3></div>');
  var $updateFeedButton = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');


  // create event handler functions
  function titleEvent(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }
  function updateFeedEvent(event) {
    renderFeed(numberOfDisplayedTweets);
  }


  // set event listeners (and relevant handlers)
  $title.on("click", titleEvent);
  $updateFeedButton.on("click", updateFeedEvent);


  // append new html elements to the DOM
  $title.appendTo($app);
  $TweetFeed.appendTo($app);
  $HomeFeed.appendTo($TweetFeed);
  $updateFeedButton.appendTo($HomeFeed);
  $feed.appendTo($HomeFeed);




  // var lastStreamSize = streams.home.length - 1;
  var numberOfDisplayedTweets = renderFeed(0);


  // helper functions
  function renderFeed(oldestTweet) {
    var currentSreamSize = streams.home.length - 1;
    var lastestTweets = [];
    var indexOfNewestTweet = currentSreamSize;

    while (indexOfNewestTweet > oldestTweet) {
      var tweet = streams.home[indexOfNewestTweet];
      var $tweet = tweetUIcomponent(tweet);//$('<div class="tweet"></div>');
      // var time = tweet.created_at;
      // $tweet.text('@' + tweet.user + ': ' + tweet.message + ', at ' + time.getHours() + ":" + time.getMinutes() + ':' + time.getSeconds());
      lastestTweets.push($tweet);
      indexOfNewestTweet -= 1;
    }
    $feed.prepend(lastestTweets);
    return currentSreamSize;
  }

  function tweetUIcomponent(tweet) {
    // new HTML elements
    var $tweet = $('<div class="tweet"></div>');
    var $img = $('<img class="profile-photo">');
    var $username = $('<span class="username"></span>');
    var $message = $('<span class="message"></span>');
    var $timestamp = $('<span class="timestamp"></span>');
    var $comment = $('<img class="icon comment">');
    var $retweet = $('<img class="icon retweet">');
    var $like = $('<img class="icon like">');
    var $share = $('<img class="icon share">');

    // add image attributes
    $tweet.attr("src", tweet.profilePhotoURL);
    $comment.attr("src", "assets/icons/placeholder.png");
    $retweet.attr("src", "assets/icons/placeholder.png");
    $like.attr("src", "assets/icons/placeholder.png");
    $share.attr("src", "assets/icons/placeholder.png");

    // add text
    $username.text('@' + tweet.user);
    $message.text(tweet.message);
    $timestamp.text(tweet.created_at);

    // append
    $img.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);

    return $tweet;
  }
});