$(document).ready(function() {
  init();
})

function init(){
  console.log("The connection is looking good, superstar");
  loadResult();
};

function loadResult(){
  $("#submitButton").click(function(){
    var text = { message: $('#textArea').val() };

    $.ajax({
      type: 'POST',
      data: text,
      url: 'http://localhost:3000/formData',
      success: function (data) {
        console.log(data);
        var score = data.score;
        var positiveWords = data.positive.toString();
        positiveWords = positiveWords.replace(/,/g, ", ");
        var negativeWords = data.negative.toString();
        negativeWords = negativeWords.replace(/,/g, ", ");

        var responseText = `The sentiment score is: ${score}. This is based on the following positive words: ${positiveWords} and the following negative words: ${negativeWords}.`
        $("#result").text(responseText);
      },
      error: function(error) {
        console.log("something went wrong: " + error);
      }
    })
  });

}
