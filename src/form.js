'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  /*--------------*/

  var BAD_RATING = 3;
  var reviewRating = document.querySelectorAll('input[name="review-mark"]');
  var reviewName = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');
  var reviewSubmit = document.querySelector('.review-submit');
  var tooltipName = document.querySelector('.review-fields-name');
  var tooltipText = document.querySelector('.review-fields-text');
  var tooltip = tooltipName.parentNode;
  var labelName = reviewName.parentNode.querySelector('.review-form-label');
  var labelText = reviewText.parentNode.querySelector('.review-form-label');
  labelName.classList.add('required');
  labelText.classList.add('required');
  reviewName.required = true;
  reviewText.required = true;
  reviewSubmit.disabled = true;

  /*Проверка на оценки*/
  var formValid = function() {
    var nameValid = reviewName.validity.valid;
    var textValid = reviewText.validity.valid;
    if (nameValid && textValid) {
      tooltip.classList.add('invisible');
      reviewSubmit.disabled = false;
      labelName.classList.remove('required');
      labelText.classList.remove('required');
    } else if (!nameValid && !textValid) {
      tooltipName.hidden = false;
      tooltipText.hidden = false;
      reviewSubmit.disabled = true;
      labelName.classList.add('required');
      labelText.classList.add('required');
      tooltip.classList.remove('invisible');
    } else if (!textValid && nameValid) {
      tooltipName.hidden = true;
      tooltipText.hidden = false;
      reviewSubmit.disabled = true;
      labelName.classList.remove('required');
      labelText.classList.add('required');
      tooltip.classList.remove('invisible');
    } else if (textValid && !nameValid) {
      tooltipName.hidden = false;
      tooltipText.hidden = true;
      reviewSubmit.disabled = true;
      labelName.classList.add('required');
      labelText.classList.remove('required');
      tooltip.classList.remove('invisible');
    }
  };

  /*Евенты*/
  for (var i = 0; i < reviewRating.length; i++) {
    reviewRating[i].onclick = function() {
      if (this.value > BAD_RATING) {
        reviewText.required = false;
        formValid();
      } else {
        reviewText.required = true;
        formValid();
      }
    };
  }
  reviewName.oninput = formValid;
  reviewText.oninput = formValid;
})();
