'use strict';

require([
  './utilits'
], function(utilits) {
  var reviews = [];
  var IMAGE_LOAD_TIMEOUT = 10000;
  var REVIEWS_URL = '//o0.github.io/assets/json/reviews.json';
  var pageCount = 0;
  var reviewClone;
  var reviewsBlock = document.querySelector('.reviews');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsControl = document.querySelector('.reviews-controls-more');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewTemplate = document.querySelector('#review-template');

  var newReviewArr;
  var filterChecked = 1;

  reviewsFilter.classList.add('invisible');
  reviewsControl.classList.remove('invisible');

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
    reviewsList.appendChild(review);
    reviewAuthor.src = data.author.picture;

    return review;
  };

  var reviewRender = function(reviewArr) {
    reviewArr.forEach(reviewCreate);
  };

  utilits.callServer(function(reviewLoaded) {
    reviewsBlock.classList.add('reviews-list-loading');
    reviews = reviewLoaded;
    sortingTest(filterChecked);
    reviewsBlock.classList.remove('reviews-list-loading');
  }, REVIEWS_URL);

  var sortingAll = function() {
    newReviewArr = reviews.slice();
  };

  var sortingRecent = function() {
    newReviewArr.sort(function(a, b) {
      return a.date - b.date;
    });
  };

  var sortingGood = function() {
    newReviewArr = newReviewArr.sort(sortingRating).filter(function(element) {
      if (element.rating > 2) {
        return true;
      } else{
        return false;
      }
    });
  };

  var sortingRating = function(a, b) {
    return b.rating - a.rating;
  };

  var sortingBad = function() {
    newReviewArr = newReviewArr.sort(sortingRating).reverse().filter(function(element) {
      if (element.rating < 3) {
        return true;
      } else{
        return false;
      }
    });
  };
  var sortingPopular = function() {
    newReviewArr.sort(function(a, b) {
      return a.review_usefulness - b.review_usefulness;
    });
  };

  var sortingTest = function(filterCheck) {
    var start = pageCount * 3;
    var end = start + 3;
    newReviewArr = reviews.slice();
    switch (filterCheck) {
      case 'reviews-all':
        sortingAll();
        break;
      case 'reviews-recent':
        sortingRecent();
        break;
      case 'reviews-good':
        sortingGood();
        break;
      case 'reviews-bad':
        sortingBad();
        break;
      case 'reviews-popular':
        sortingPopular();
        break;
    }

    if (newReviewArr.length <= end) {
      reviewsControl.classList.add('invisible');
    } else {
      reviewsControl.classList.remove('invisible');
    }
    newReviewArr = newReviewArr.slice(start, end);
    reviewRender(newReviewArr);
  };

  var clear = function() {
    reviewsList.innerHTML = '';
    pageCount = 0;
  };

  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      filterChecked = evt.target.previousSibling.id;
      clear();
      sortingTest(filterChecked);
    }
  });

  reviewsControl.addEventListener('click', function() {
    pageCount++;
    sortingTest(filterChecked);
  });

  reviewsFilter.classList.remove('invisible');

});
