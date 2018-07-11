functions Answer(answerNr, answer, correct) {

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

  this.toHTML() {

    let answerHTML = "<div class='input-group mb-3'>";
    answerHTML += "<div class='input-group-prepend'>";
    answerHTML += "<span class='input-group-text' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.ggetAnswerNr() + "'>Answer " + this.getAnswerNr() + "</span>";
    answerHTML += "</div>";
    answerHTML += "<input type='text' class='form-control' aria-label='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "' aria-describedby='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "' name='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "' required/>";
    answerHTML += "</div>";

    answerHTML += "<label for='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-correct'>Correct answer?</label>";
    answerHTML += "<input type='checkbox' value='correct' name='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-correct' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-correct'"

    answerHTML += "<button class='btn btn-success saveAnswerBtn' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-save'>Save answer</button>";

    answerHTML += "<button class='btn btn-danger removeAnswerBtn' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswerNr() + "-remove'>Remove answer</button>";

    return answerHTML;
  };

}
