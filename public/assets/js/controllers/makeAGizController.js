$(document).ready(function() {

  $("#giz-timeLimit-form").hide();

  $(".multipleChoiceAnswers").hide();

  $("#giz-limitTime").on("change", function() {

    const limitTimeValue = $(this).val();

    if (limitTimeValue === 'yes') {
      $("#giz-timeLimit-form").show();
    } else {
      $("#giz-timeLimit-form").hide();
    }

  });

  $(".giz-question-type").on("change", function(){

    const limitTimeValue = $(this).val();

  });

});
