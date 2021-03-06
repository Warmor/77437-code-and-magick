'use strict';

require([
  './utilits',
  './review'
], function(utilits, Review) {
  var reviews = [];
  var REVIEWS_URL = '//o0.github.io/assets/json/reviews.json';
  var pageCount = 0;
  var reviewsBlock = document.querySelector('.reviews');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsControl = document.querySelector('.reviews-controls-more');
  var reviewsList = document.querySelector('.reviews-list');

  var newReviewArr;
  var reviewArrHash = [];
  var filterChecked = 1;

  reviewsFilter.classList.add('invisible');
  reviewsControl.classList.remove('invisible');


  var reviewRender = function(reviewArr) {
    reviewArr.forEach(function(data) {
      var review = new Review(data);
      reviewArrHash.push(review);
      reviewsList.appendChild(review.element);
    });
  };

  var setOldFilter = function() {
    sortingTest(localStorage.getItem('filterStok'));
    var oldFilterInput = document.querySelector('#' + localStorage.getItem('filterStok'));
    oldFilterInput.checked = true;
  };

  utilits.callServer(function(reviewLoaded) {
    reviewsBlock.classList.add('reviews-list-loading');
    reviews = reviewLoaded;
    setOldFilter();
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
    reviewArrHash.forEach(function(item) {
      item.remove();
    });
    reviewArrHash = [];
    pageCount = 0;
  };

  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      filterChecked = evt.target.previousSibling.id;
      localStorage.setItem('filterStok', filterChecked);
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
