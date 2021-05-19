$(document).ready(function () {

  jQuery("time.timeago").timeago();

  // select existing elements
  var $app = $('#app');


  // create new HTML elements
  var $title = $('<div class="title">Twiddler</div>');
  var $updateFeedButton = $('<button type="button" id="update-feed">Update Feed</button>');
  var $bottomHalf = $('<div id="bottom-half"></div>');
  var $leftMenu = $('<div id="left-half"></div>');
  var $feed = $('<div id="feed"></div>');
  var $friendList = $('<div id="friend-list">Friends</div>');

  // create event handler functions
  function titleEvent(event) {
  }
  function updateFeedEvent(event) {
    $feed.html('');
    renderFeed();
  }
  function iconMouseOverColorChange(event) {
    $(event.target).css("color", "tomato");
    $(event.target).addClass("fa-lg");
  }
  function iconMouseOutColorReturn(event) {
    $(event.target).css("color", "black");
    $(event.target).removeClass("fa-lg");
  }
  function handleUsernameClick(event) {
    // re-render feed with only user's tweets
    $feed.html('');
    var username = event.target.outerText.substring(1);
    renderFeed(username);

    // change updateFeed button to Back button, and back again
    if ($updateFeedButton.text() === "Update Feed") {
      $updateFeedButton.text("Back");
    }
    $updateFeedButton.on("click", function(event) {
      $updateFeedButton.text("Update Feed");
    });
  }

  // set event listeners (and relevant handlers)
  $title.on("click", titleEvent);
  $updateFeedButton.on("click", updateFeedEvent);


  // append new html elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($title);
  $bottomHalf.appendTo($app);
  $leftMenu.appendTo($bottomHalf);
  $feed.appendTo($bottomHalf);
  $friendList.appendTo($leftMenu);

  renderFeed();

  // helper functions
  function renderFeed(user) {
    tweets = user === undefined ? streams.home : streams.users[user];

    var currentSreamSize = tweets.length - 1;
    var start = 0;
    var indexOfNewestTweet = currentSreamSize;

    while (indexOfNewestTweet > 0) {
      var tweet = tweets[indexOfNewestTweet];
      var $tweet = tweetUIcomponent(tweet);
      $tweet.appendTo($feed);
      indexOfNewestTweet -= 1;
    }
  }

  function renderFriendList() {
    var friends = Object.keys(streams.users);
  }
  function tweetUIcomponent(tweet) {
    // new HTML elements
    var $tweet = $('<div class="tweet"></div>');
    var $img = $('<img class="profile-photo">');

    var $rightSideOfTweet = $('<div class="right-side"></div>');
    var $username = $('<div class="username-div username"></div>');
    var $message = $('<span class="message"></span>');

    var $timeAndIconDiv = $('<div class="time-and-icon-div"></div>');
    var $timestamp = $('<span class="timestamp"></span>');
    var $iconDiv = $('<div class="icon-div"></div>');
    var $comment = $('<i class="icon comment far fa-comment"></i>');
    var $retweet = $('<i class="icon comment fas fa-retweet"></i>');
    var $like = $('<i class="icon comment far fa-heart"></i>');
    var $share = $('<i class="icon comment fas fa-share-square"></i>');

    // add image attributes
    $img.attr("src", tweet.profilePhotoURL);

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

    $username.on("click", handleUsernameClick);


    // append
    $img.appendTo($tweet);
    $rightSideOfTweet.appendTo($tweet);
    $username.appendTo($rightSideOfTweet);
    $message.appendTo($rightSideOfTweet);

    $timeAndIconDiv.appendTo($rightSideOfTweet);
    $timestamp.appendTo($timeAndIconDiv);
    $iconDiv.appendTo($timeAndIconDiv);
    $comment.appendTo($iconDiv);
    $retweet.appendTo($iconDiv);
    $like.appendTo($iconDiv);
    $share.appendTo($iconDiv);

    return $tweet;
  }
});