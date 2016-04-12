'use strict';

(function() {
  var reviews = [];
  var reviewsBlock = document.querySelector('.reviews');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var IMAGE_LOAD_TIMEOUT = 10000;
  var reviewsList = document.querySelector('.reviews-list');
  var reviewTemplate = document.querySelector('#review-template');
  var reviewClone;

  var filterAll = document.querySelector('label[for="reviews-all"]');
  var filterRecent = document.querySelector('label[for="reviews-recent"]');
  var filterGood = document.querySelector('label[for="reviews-good"]');
  var filterBad = document.querySelector('label[for="reviews-bad"]');
  var filterPopular = document.querySelector('label[for="reviews-popular"]');

  reviewsFilter.classList.add('invisible');

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

    reviewAuthor.onerror = function() {
      review.classList.add('review-load-failure');
    };

    reviewAuthor.onload = function() {
      clearTimeout(reviewAuthorLoadTimeout);
    };


    reviewAuthor.src = data.author.picture;
    reviewAuthor.alt = data.author.name;
    reviewAuthor.title = data.author.name;
    reviewText.textContent = data.description;
    reviewsList.appendChild(review);
    return review;
  };

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
    reviewArr.forEach(reviewCreate);
  };

  reviewGet(function(reviewLoaded) {
    reviews = reviewLoaded;
    reviewRender(reviews);
  });

  var sortingRecent = function(a, b) {
    return a.date - b.date;
  };
  var sortingRating = function(a, b) {
    return b.rating - a.rating;
  };
  var sortingPopular = function(a, b) {
    return a.review_usefulness - b.review_usefulness;
  };


  filterAll.onclick = function() {
    reviewsList.innerHTML = '';
    reviewRender(reviews);
  };
  filterRecent.onclick = function() {
    reviewsList.innerHTML = '';
    var newReviewArr = reviews.slice();
    newReviewArr.sort(sortingRecent);
    reviewRender(newReviewArr);
  };
  filterGood.onclick = function() {
    reviewsList.innerHTML = '';
    var newReviewArr = reviews.slice();
    newReviewArr.sort(sortingRating);
    var newReviewArrFilter = newReviewArr.filter(function(element) {
      if (element.rating > 2) {
        return true;
      } else{
        return false;
      }
    });
    reviewRender(newReviewArrFilter);
  };
  filterBad.onclick = function() {
    reviewsList.innerHTML = '';
    var newReviewArr = reviews.slice();
    newReviewArr.sort(sortingRating).reverse();
    var newReviewArrFilter = newReviewArr.filter(function(element) {
      if (element.rating < 3) {
        return true;
      } else{
        return false;
      }
    });
    reviewRender(newReviewArrFilter);
  };
  filterPopular.onclick = function() {
    reviewsList.innerHTML = '';
    var newReviewArr = reviews.slice();
    newReviewArr.sort(sortingPopular);

    reviewRender(newReviewArr);
  };

  reviewsFilter.classList.remove('invisible');

})();
