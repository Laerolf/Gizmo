function Giz(id, name, description, category, timeLimited, timeLimit) {

  this.id = id;
  this.name = name;
  this.description = description;
  this.category = category;

  this.timeLimited = timeLimited;
  this.timeLimit = timeLimit;

  this.questions = [];

  //GETTERS OF GIZ

  this.getId = function() {
    return this.id;
  }

  this.getName = function() {
    return this.name;
  }

  this.getDescription = function() {
    return this.description;
  }

  this.getCategory = function() {
    return this.category;
  }

  this.getTimeLimited = function() {
    return this.timeLimited;
  }

  this.getTimeLimit = function() {
    return this.timeLimit;
  }

  this.getQuestions = function() {
    return this.questions;
  }

  //FUNCTIONS OF GIZ

  this.addAnotherQuestion = function(newQuestion) {
    this.questions.push(newQuestion);
  }

  this.removeQuestionByNumber = function(questionNr) {
    this.question.splice(questionNr - 1, 1);
  }

  this.gizQuestionToHTML = function() {

    let gizQuestionsHTML = "";

    if (this.getQuestions().length === 0) {

      this.addAnotherQuestion(new Question(1));
    }

    this.getQuestions().forEach(function(question) {

      gizQuestionsHTML += question.toHTML();

    })

    return gizQuestionsHTML;
  }

}
