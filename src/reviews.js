'use strict';

require([
  './utilits',
  './Review'
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

  var reviewGet = function(callback) {
    var xhr = new XMLHttpRequest();

    reviewsBlock.classList.add('reviews-list-loading');
    xhr.onload = function(evt) {
      var reqestObj = evt.target;
      var response = reqestObj.response;
      var loadedData = JSON.parse(response);
      callback(loadedData);
      reviewsBlock.classList.remove('reviews-list-loading');
    };

    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.send();
  };

  var reviewRender = function(reviewArr) {
    reviewArr.forEach(function(data) {
      var review = new Review(data);
      reviewArrHash.push(review);
      reviewsList.appendChild(review.element);
      console.dir(reviewArrHash);
    });
  };

  reviewGet(function(reviewLoaded) {
    reviews = reviewLoaded;
    sortingTest(filterChecked);
  });



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
      clear();
      sortingTest(filterChecked);
    }
  });

  reviewsControl.addEventListener('click', function() {
    pageCount++;
    sortingTest(filterChecked);
  });


  reviewsFilter.classList.remove('invisible');

})();
