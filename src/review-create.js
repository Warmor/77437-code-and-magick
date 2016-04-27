'use strict';

define('reviewCreate', function() {

  var IMAGE_LOAD_TIMEOUT = 10000;
  var reviewClone;
  var reviewTemplate = document.querySelector('#review-template');

  if ('content' in reviewTemplate) {
    reviewClone = reviewTemplate.content.querySelector('.review');
  } else {
    reviewClone = reviewTemplate.querySelector('.review');
  }

  var reviewCreate = function(data) {
    var review = reviewClone.cloneNode(true);
    var reviewRating = review.querySelector('.review-rating');
    var reviewText = review.querySelector('.review-text');
    var reviewAuthor = review.querySelector('.review-author');

    for (var i = 1; i < data.rating; i++) {
      var reviewRatingDoble = reviewRating.cloneNode(true);
      review.insertBefore(reviewRatingDoble, reviewRating);
    }

    var reviewAuthorLoadTimeout = setTimeout(function() {
      reviewAuthor.src = '';
      review.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    reviewAuthor.onload = function() {
      clearTimeout(reviewAuthorLoadTimeout);
    };

    reviewAuthor.onerror = function() {
      clearTimeout(reviewAuthorLoadTimeout);
      review.classList.add('review-load-failure');
    };

    reviewAuthor.alt = data.author.name;
    reviewAuthor.title = data.author.name;
    reviewText.textContent = data.description;
    reviewAuthor.src = data.author.picture;

    return review;
  };

  return reviewCreate;
});
