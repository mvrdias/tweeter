/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {
// Fake data taken from tweets.json
// var data = [
// //tweet.user.name
// //tweet.user.avatars.regular
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $("#tweets-container").empty();
    // todo then iterate over each tweet
    tweets.forEach(function (tweet) {
      // todo then create html representing the tweet
      var tweetHtml = createTweetElement(tweet);
      // todo then append that html to the #all-squeaks
      $("#tweets-container").prepend(tweetHtml);
    });
}

function createTweetElement(tweet) {
 // var $tweet = $('<article>').addClass('tweet');
  return `
        <article class="tweet">
          <header>
            <img src=${tweet.user.avatars.regular} class="tweet-image" height="50" width="50">
            <span class="tweet-name">${tweet.user.name}</span>
            <span class="tweet-handle">${tweet.user.handle}</span>
          </header>

          <p class="content">${tweet.content.text}</p>

          <footer>
            <span class="time-create">${tweet.created_at}</span>
            <div class="icons">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
          </footer>
        </article>`;

}

// renderTweets();


function getTweetsAndRender() {

  $.ajax({
    method: 'GET',
    url: '/tweets',
    success(tweets) {
     // console.log('Got tweets from the server', tweets);
      renderTweets(tweets);
    }
  });

  // $.get('/tweets').then(renderTweets); pode substituir a linha de cima.

  // get tweets from the server
  // and then renderTweets(tweets);
}



$('#new-tweet-form').on('submit', function (event) {
      // TODO 1. prevent the default behaviour that you are hijacking

      event.preventDefault();
      // TODO 2. perform the hijacked behaviour programmatically

      var theForm = this;
      var data = $(this).serialize();

      var  $tweetContent = $('#tweet-content');

      if ( ($tweetContent.val().length > 140) || ($tweetContent.val() == "") ) {
        alert("text greater than 140 characters or null");
      } else {
        $.ajax({
        method: 'post',
        url: '/tweets',
        data: data
        }).done(function () {
        // TODO 3. manipulate the DOM to indicate to the user that the action was *completed*
        // What is `this` in this function?
        theForm.reset();
        getTweetsAndRender();
        });
      }

  });


getTweetsAndRender(); // Run this when page loads so the tweets are loaded



});