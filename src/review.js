'use strict';

define('review', ['./review-create'], function(reviewCreate) {

  function Review(data) {
    var quiz;

    this.data = data;
    this.element = reviewCreate(this.data);

    this.quiz = this.element.querySelector('.review-quiz');

    quiz = this.quiz;

    this.onQuizClick = function(evt) {
      var quizActive = quiz.querySelector('.review-quiz-answer-active');

      if (evt.target.classList.contains('review-quiz-answer')) {
        if (quizActive) {
          quizActive.classList.remove('review-quiz-answer-active');
        }

        evt.target.classList.add('review-quiz-answer-active');
      }
    };

    this.remove = function() {
      this.quiz.removeEventListener('click', this.onQuizClick);
      this.element.parentNode.removeChild(this.element);
    };

    this.quiz.addEventListener('click', this.onQuizClick);
  }


  return Review;
});
