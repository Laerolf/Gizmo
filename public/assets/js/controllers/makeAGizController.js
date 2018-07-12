$(document).ready(function() {

  $("#giz-timeLimit-form").hide();

  const newGiz = new Giz();

  $("#questions").html(newGiz.gizQuestionToHTML());

  $(".multipleChoiceAnswers").hide();
  $(".addAnswerBtn").hide();

  $(".questionType").on("change", function() {

    const questionType = $(this).val();
    const questionNr = $(this).attr('id').split("-")[2];

    if (questionType === "openQuestion") {
      $("#question-" + questionNr + ".multipleChoiceAnswers").hide();
      $(".addAnswerBtn").hide();
    } else {
      $("#question-" + questionNr + ".multipleChoiceAnswers").show();
      $(".addAnswerBtn").show();
    }

  });

  $("#giz-limitTime").on("change", function() {

    const limitTimeValue = $(this).val();

    if (limitTimeValue === 'yes') {
      $("#giz-timeLimit-form").show();
    } else {
      $("#giz-timeLimit-form").hide();
    }

  });

  $(".addAnswerBtn").on("click", function(e) {

    e.preventDefault();

    const questionNr = eval($(this).attr('id').split("-")[2]) - 1;
    const question = newGiz.getQuestions()[questionNr];

    question.addAnotherAnswer(new Answer(question.getAnswers().length + 1));

    $("#question-" + $(this).attr('id').split("-")[2] + ".multipleChoiceAnswers").append(question.getAnswers()[question.getAnswers().length - 1].toHTML(question));

  });

});
