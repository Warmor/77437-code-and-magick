'use strict';

define('review', ['./review-create'], function(reviewCreate) {

  function Review(data) {
    this.data = data;
    this.element = reviewCreate(this.data);
    this.quiz = this.element.querySelector('.review-quiz');
    this.onQuizClick = this.onQuizClick.bind(this);
    this.remove = this.remove.bind(this);
    this.quiz.addEventListener('click', this.onQuizClick);
  };

  Review.prototype.onQuizClick = function(evt) {
    var quizActive = this.quiz.querySelector('.review-quiz-answer-active');

    if (evt.target.classList.contains('review-quiz-answer')) {
      if (quizActive) {
        quizActive.classList.remove('review-quiz-answer-active');
      }
      evt.target.classList.add('review-quiz-answer-active');
    }
  };

  Review.prototype.remove = function() {
    this.quiz.removeEventListener('click', this.onQuizClick);
    this.element.parentNode.removeChild(this.element);
  };
  return Review;
});
