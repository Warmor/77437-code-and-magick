'use strict';

(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  reviewsFilter.classList.add('invisible');

  var IMAGE_LOAD_TIMEOUT = 10000;
  var reviewAuthorLoadTimeout;
  var reviewsList = document.querySelector('.reviews-list');
  var reviewTemplate = document.querySelector('#review-template');
  var reviewClone;
  
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
    
    reviewAuthor.onerror = function() {
      review.classList.add('review-load-failure');
    };
    reviewAuthor.onload = function() {
      clearTimeout(reviewAuthorLoadTimeout);
    };

    reviewAuthorLoadTimeout = setTimeout(function() {
      reviewAuthor.src = '';
      review.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    reviewAuthor.src = data.author.picture;
    reviewAuthor.alt = data.author.name;
    reviewAuthor.title = data.author.name;
    reviewText.textContent = data.description;
    reviewsList.appendChild(review);
    return review;
  }
  
  reviews.forEach(function(data){
    reviewCreate(data);
  });
  reviewsFilter.classList.remove('invisible');
})();