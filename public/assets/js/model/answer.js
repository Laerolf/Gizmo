function Answer(answerNr, answer, correct) {

  this.answerNr = answerNr;
  this.answer = answer;
  this.correct = correct;

  //GETTERS OF ANSWER

  this.getAnswerNr = function() {
    return this.answerNr;
  }

  this.getAnswer = function() {
    return this.answer;
  }

  this.getCorrect = function() {
    return this.correct;
  }

  //FUNCTIONS OF ANSWER

  this.toHTML = function (question) {

    let answerHTML = "<div class='card answer-card' id='giz-question-"+question.getQuestionNr()+"-answer-"+this.getAnswerNr()+"'><div class='card-body'>";

    answerHTML += "<div class='input-group mb-3'>";
    answerHTML += "<div class='input-group-prepend'>";
    answerHTML += "<span class='input-group-text'>Answer " + this.getAnswerNr() + "</span>";
    answerHTML += "</div>";
    answerHTML += "<input type='text' class='form-control' aria-label='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr() + "' aria-describedby='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr() + "' name='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr()+"' id='giz-question-"+question.getQuestionNr()+"-answer-"+this.getAnswerNr()+"-answer' required/>";
    answerHTML += "</div>";

    id='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-answer'

    answerHTML += "<label for='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-correct'>Correct answer?</label>";
    answerHTML += "<input type='checkbox' value='correct' name='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-correct' id='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-correct'/>";

    answerHTML += "</div><div class='card-footer'>";

    answerHTML += "<button class='btn btn-danger removeAnswerBtn' id='giz-question-" + question.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-remove'>Remove answer</button>";

    answerHTML += "</div></div>";

    return answerHTML;
  };

  this.save = function() {
    return {
      answerNr: this.getAnswerNr(),
      answer: this.getAnswer(),
      correct: this.getCorrect()
    }
  };

}
