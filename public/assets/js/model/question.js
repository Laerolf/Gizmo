function Question(questionNr, question, questionType) {

  this.questionNr = questionNr;
  this.question = question;
  this.questionType = questionType;
  this.answers = [];

  //GETTERS OF QUESTION

  this.getQuestionNr = function() {
    return this.questionNr;
  }

  this.getQuestion = function() {
    return this.question;
  }

  this.getQuestionType = function() {
    return this.questionType;
  }

  this.getAnswers = function() {
    return this.answers;
  }

  //FUNCTIONS OF QUESTION

  this.addAnotherAnswer = function(newAnswer) {
    this.answers.push(newAnswer);
  }

  this.removeAnswerByNumber = function(answerNr) {
    this.answers.splice(answerNr - 1, 1);
  }

  this.toHTML = function() {
    let questionHTML = "<h6 class='card-title'>Question " + this.getQuestionNr() + "</h6>";

    questionHTML += "<div class='input-group mb-3'>";
    questionHTML += "<div class='input-group-prepend'>";
    questionHTML += "<span class='input-group-text' id='giz-question-" + this.getQuestionNr() + "-name'>Question</span>";
    questionHTML += "</div>";
    questionHTML += "<input type='text' class='form-control' aria-label='giz-question-" + this.getQuestionNr() + "-name' aria-describedby='giz-question-" + this.getQuestionNr() + "-name' name='giz-question-" + this.getQuestionNr() + "-name' required/>";
    questionHTML += "</div>";

    questionHTML += "<div class='input-group mb-3'>";
    questionHTML += "<div class='input-group-prepend'>";
    questionHTML += "<label class='input-group-text' for='giz-question-" + this.getQuestionNr() + "-type'>Question</label>";
    questionHTML += "</div>";
    questionHTML += "<select class='custom-select form-control' aria-label='giz-question-" + this.getQuestionNr() + "-type' aria-describedby='giz-question-" + this.getQuestionNr() + "-type' name='giz-question-" + this.getQuestionNr() + "-type' required>";
    questionHTML += "<option value='openQuestion' selected></option>";
    questionHTML += "<option value='multipleChoice'></option>";
    questionHTML += "</select></div>";

    questionHTML += "<div class='multipleChoiceAnswers' id='question-" + this.getQuestionNr() + "'>";

    if (this.getAnswers().length != 0) {
      this.getAnswers().forEach(function(answer) {
        questionHTML += answer.toHTML();
      });
    } else {
      questionHTML += this.buildNewAnswer();
    }

    questionHTML += "<button class='btn btn-success addAnswerBtn' id='question-" + this.getQuestionNr() + "'>+ Add answer</button>";

    questionHTML += "</div>";
  }

  return questionHTML;
}

this.buildNewAnswer() {

  let newAnswerHTML = "<div class='input-group mb-3'>";
  newAnswerHTML += "<div class='input-group-prepend'>";
  newAnswerHTML += "<span class='input-group-text' id='giz-question-" + this.getQuestionNr() + "-answer-1'>Answer 1</span>";
  newAnswerHTML += "</div>";
  newAnswerHTML += "<input type='text' class='form-control' aria-label='giz-question-" + this.getQuestionNr() + "-answer-1' aria-describedby='giz-question-" + this.getQuestionNr() + "-answer-1' name='giz-question-" + this.getQuestionNr() + "-answer-1' required/>";
  newAnswerHTML += "</div>";

  newAnswerHTML += "<label for='giz-question-" + this.getQuestionNr() + "-answer-1-correct'>Correct answer?</label>";
  newAnswerHTML += "<input type='checkbox' value='correct' name='giz-question-" + this.getQuestionNr() + "-answer-1-correct' id='giz-question-" + this.getQuestionNr() + "-answer-1-correct'"

  newAnswerHTML += "<button class='btn btn-success saveAnswerBtn' id='giz-question-" + this.getQuestionNr() + "-answer-1-save'>Save answer</button>";

  newAnswerHTML += "<button class='btn btn-danger removeAnswerBtn' id='giz-question-" + this.getQuestionNr() + "-answer-1-remove'>Remove answer</button>";

  return newAnswerHTML;
};
