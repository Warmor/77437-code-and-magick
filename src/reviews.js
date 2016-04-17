'use strict';

(function() {
  var reviews = [];
  var IMAGE_LOAD_TIMEOUT = 10000;
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
    sortingTest(filterChecked);
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

  var sortingTest = function(filterCheck) {
    var start = pageCount * 3;
    var end = start + 3;
    newReviewArr = reviews.slice();
    if (filterCheck === 1) {
      newReviewArr = reviews.slice();
    }
    if (filterCheck === 2) {
      newReviewArr.sort(sortingRecent);
    }
    if (filterCheck === 3) {
      newReviewArr = newReviewArr.sort(sortingRating).filter(function(element) {
        if (element.rating > 2) {
          return true;
        } else{
          return false;
        }
      });
    }
    if (filterCheck === 4) {
      newReviewArr = newReviewArr.sort(sortingRating).reverse().filter(function(element) {
        if (element.rating < 3) {
          return true;
        } else{
          return false;
        }
      });
    }
    if (filterCheck === 5) {
      newReviewArr.sort(sortingPopular);
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
      filterChecked = evt.target.id;
      filterChecked = +filterChecked;
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
