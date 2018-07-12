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
    questionHTML += "<label class='input-group-text' for='giz-question-" + this.getQuestionNr() + "-type'>Question type</label>";
    questionHTML += "</div>";
    questionHTML += "<select class='custom-select form-control questionType' id='giz-question-" + this.getQuestionNr() + "-type' aria-label='giz-question-" + this.getQuestionNr() + "-type' aria-describedby='giz-question-" + this.getQuestionNr() + "-type' name='giz-question-" + this.getQuestionNr() + "-type' required>";
    questionHTML += "<option value='openQuestion' selected>Open question</option>";
    questionHTML += "<option value='multipleChoice'>Multiple choice</option>";
    questionHTML += "</select></div>";

    questionHTML += "<div class='multipleChoiceAnswers' id='question-" + this.getQuestionNr() + "'>";
    questionHTML += "<h6 class='card-title'>Possible answers</h6>";

    if (this.getAnswers().length === 0) {
      this.addAnotherAnswer(new Answer(this.getAnswers().length + 1));
    }

    const question = this;

    this.getAnswers().forEach(function(answer) {
      questionHTML += answer.toHTML(question);
    });

    questionHTML += "</div>";

    questionHTML += "<button class='btn btn-success addAnswerBtn' id='giz-question-" + this.getQuestionNr() + "-addAnswer'>Add answer</button>";

    questionHTML += "<button class='btn btn-success saveQuestionBtn' id='giz-question-" + this.getQuestionNr() + "-save'>Save question</button>";

    return questionHTML;
  }

  this.buildNewAnswer = function() {

    let newAnswerHTML = "<div class='input-group mb-3'>";
    newAnswerHTML += "<div class='input-group-prepend'>";
    newAnswerHTML += "<span class='input-group-text' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "'>Answer " + this.getAnswers().length + "</span>";
    newAnswerHTML += "</div>";
    newAnswerHTML += "<input type='text' class='form-control' aria-label='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "' aria-describedby='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "' name='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "' required/>";
    newAnswerHTML += "</div>";

    newAnswerHTML += "<div class='input-group mb-3'>";
    newAnswerHTML += "<label for='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "-correct'>Correct answer?</label>";
    newAnswerHTML += "<input type='checkbox' value='correct' name='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "-correct' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "-correct'/>";
    newAnswerHTML += "</div>";

    newAnswerHTML += "<div class='input-group mb-3'>";
    newAnswerHTML += "<button class='btn btn-success saveAnswerBtn' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "-save'>Save answer</button>";

    newAnswerHTML += "<button class='btn btn-danger removeAnswerBtn' id='giz-question-" + this.getQuestionNr() + "-answer-" + this.getAnswers().length + "-remove'>Remove answer</button>";
    newAnswerHTML += "</div>";

    return newAnswerHTML;
  };

  this.save = function() {

    let answers = {};

    this.getAnswers().forEach(function(answer) {
      answers[answer.getAnswerNr()] = answer.save();
    });

    return {
      questionNr: this.getQuestionNr(),
      question: this.getQuestion(),
      questionType: this.getQuestionType(),
      answers: answers
    }
  }
}
