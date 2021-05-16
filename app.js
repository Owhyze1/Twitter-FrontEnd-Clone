$(document).ready(function () {

  jQuery("time.timeago").timeago();

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
  function iconMouseOverColorChange(event) {
    $(event.target).css("color", "tomato");
  }
  function iconMouseOutColorReturn(event) {
    $(event.target).css("color", "black");
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
      var $tweet = tweetUIcomponent(tweet);
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
    var $comment = $('<i class="icon comment far fa-comment"></i>');
    var $retweet = $('<i class="icon comment fas fa-retweet"></i>');
    var $like = $('<i class="icon comment far fa-heart"></i>');
    var $share = $('<i class="icon comment fas fa-share-square"></i>');

    // add image attributes
    $tweet.attr("src", tweet.profilePhotoURL);

    // add text
    $username.text('@' + tweet.user);
    $message.text(tweet.message);
    $timestamp.text(jQuery.timeago(tweet.created_at));


    // Tweet UI event handlers
    $comment.on("mouseover", iconMouseOverColorChange);
    $retweet.on("mouseover", iconMouseOverColorChange);
    $like.on("mouseover", iconMouseOverColorChange);
    $share.on("mouseover", iconMouseOverColorChange);

    $comment.on("mouseout", iconMouseOutColorReturn);
    $retweet.on("mouseout", iconMouseOutColorReturn);
    $like.on("mouseout", iconMouseOutColorReturn);
    $share.on("mouseout", iconMouseOutColorReturn);


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