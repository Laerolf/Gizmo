$(document).ready(function() {

  $("#giz-timeLimit-form").hide();

  const newGiz = new Giz();

  $("#questions").html(newGiz.gizQuestionToHTML());

  $(".multipleChoiceAnswers").hide();
  $(".addAnswerBtn").hide();

  $(".removeAnswerBtn").on("click", function(e) {
    e.preventDefault();

    const selectedAnswer = $(this).attr("id").substr(0, $(this).attr("id").length - 7);
    const selectedQuestion = eval($(this).attr("id").split("-")[2]);
    const answerNr = selectedAnswer.split("-")[selectedAnswer.split("-").length - 1];

    newGiz.getQuestions()[selectedQuestion - 1].removeAnswerByNumber(answerNr);
    $("#" + selectedAnswer).remove();

  });

  $(".questionType").on("change", function() {

    const questionType = $(this).val();
    const questionNr = $(this).attr('id').split("-")[2];

    if (questionType === "openQuestion") {
      $("#question-" + questionNr + "-answers").hide();
      $(".addAnswerBtn").hide();
    } else {
      $("#question-" + questionNr + "-answers").show();
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

    $("#question-" + $(this).attr('id').split("-")[2] + "-answers.multipleChoiceAnswers").append(question.getAnswers()[question.getAnswers().length - 1].toHTML(question));

    $(".removeAnswerBtn").on("click", function(e) {
      e.preventDefault();

      const selectedAnswer = $(this).attr("id").substr(0, $(this).attr("id").length - 7);
      const selectedQuestion = eval($(this).attr("id").split("-")[2]);
      const answerNr = selectedAnswer.split("-")[selectedAnswer.split("-").length - 1];

      console.log("SELECTED ANSWER", selectedAnswer);

      newGiz.getQuestions()[selectedQuestion - 1].removeAnswerByNumber(answerNr);
      $("#" + selectedAnswer).remove();

      console.log("NEW GIZ", newGiz.getQuestions());

    });

  });

  $("#giz-addAQuestionBtn").on("click", function(e) {

    e.preventDefault();

    let newQuestion = new Question(newGiz.getQuestions().length + 1);

    newGiz.addAnotherQuestion(newQuestion);

    $("#questions").append(newQuestion.toHTML());

    $(".removeQuestionBtn").on("click", function(e) {
      e.preventDefault();

      const questionNr = eval($(this).attr("id").split("-")[2]);

      let selectedQuestion = $(this).attr("id").split("-");
      selectedQuestion = selectedQuestion[0] + "-" + selectedQuestion[1] + "-" + selectedQuestion[2];

      newGiz.removeQuestionByNumber(questionNr);
      $("#" + selectedQuestion).remove();

      console.log("NEW GIZ", newGiz.getQuestions());

    });

    $(".questionType").on("change", function() {

      const questionType = $(this).val();
      const questionNr = $(this).attr('id').split("-")[2];

      if (questionType === "openQuestion") {
        $("#question-" + questionNr + "-answers").hide();
        $(".addAnswerBtn").hide();
      } else {
        $("#question-" + questionNr + "-answers").show();
        $(".addAnswerBtn").show();
      }

    });

  });

  $(".saveQuestionBtn").on("click", function(e) {
    e.preventDefault();

    let questionType = $(this).attr("id").split("-");
    questionType = questionType[0] + "-" + questionType[1] + "-" + questionType[2] + "-type";

    if ($("#" + questionType).val() != "openQuestion") {
      let questionId = $(this).attr("id").split("-");
      questionId = questionId[1] + "-" + questionId[2];

      let questionData = {
        question: $("#giz-" + questionId + "-name").val(),
        questionType: $("#giz-" + questionId + "-type").val(),
        answers: []
      };

      const answers = $("#" + questionId + "-answers").children(".answer-card");

      for (let answer in answers) {
        if (answers.hasOwnProperty(answer)) {

          if (answer != "prevObject" && answer != "length") {

            let selectedAnswer = answers[answer];

            const answerText = $("#" + selectedAnswer.id + "-answer").val();
            const correctAnswer = $("#" + selectedAnswer.id + "-correct").prop('checked');

            questionData.answers.push({
              answerNr: eval(answer) + 1,
              answer: answerText,
              correct: correctAnswer
            });

          }

        }
      }

      questionData.answers.forEach(function(answer) {

        let selectedAnswer = newGiz.getQuestions()[eval(questionId.split("-")[1]) - 1].getAnswers()[answer.answerNr - 1];

        selectedAnswer.answerNr = answer.answerNr;
        selectedAnswer.answer = answer.answer;
        selectedAnswer.correct = answer.correct;

      })

    }

  });

  $(".removeQuestionBtn").on("click", function(e) {
    e.preventDefault();

    const questionNr = eval($(this).attr("id").split("-")[2]);

    let selectedQuestion = $(this).attr("id").split("-");
    selectedQuestion = selectedQuestion[0] + "-" + selectedQuestion[1] + "-" + selectedQuestion[2];

    newGiz.removeQuestionByNumber(questionNr);
    $("#" + selectedQuestion).remove();

  });




});
