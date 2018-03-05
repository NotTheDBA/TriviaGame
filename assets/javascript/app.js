var numCorrect = 0;
$(document).ready(function() {
    var trivia, answers;
    // var answered = false;
    // var correct = null;
    var playerAnswer = -1;
    var quizNo = -1;

    var count = 0;

    playButton(newGame = true);
});

function getQuestion() {
    $("#answer").empty();
    $("#fun-fact").empty();
    var queryurl = "assets/data/trivia.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(data) {

        count = Object.keys(data.trivia).length;
        quizNo = 1; // TODO get random quiz item

        $("#question").html("<p>" + data.trivia[quizNo].question + "</p>")

        showQuestion(quizNo, data.trivia[quizNo]);

    });

}

function playButton(newGame) {

    var button = $("<button>");
    if (newGame === true) {
        button.text("Play");
    } else {
        button.text("Next");
    }
    button.on("click", function() {
        getQuestion();
    });

    $("#answer").append(button);
}

function checkAnswer(playerAnswer, trivia) {

    if (playerAnswer == trivia.answer) {
        numCorrect++;
        $("#answer").html("<p>Correct! '" + trivia.choices[trivia.answer] + "' is the answer!</p>")
    } else {

        $("#answer").html("<p>Sorry... the correct answer was:" + trivia.choices[trivia.answer] + "</p>")
    }
    playButton(newGame = false);
    $("#fun-fact").html("<p>" + trivia.fact + "</p>")


}


function showQuestion(quizNo, trivia) {

    var table = $("<table>");
    table.append(buildChoices(quizNo, trivia.choices));

    var button = $("<button>");
    button.text("Answer");
    button.id = "submit";
    button.on("click", function() {
        var playerAnswer = $("input[name='" + quizNo + "']:checked").val();
        if (typeof playerAnswer !== 'undefined') {
            checkAnswer(playerAnswer, trivia)
        }
    });

    $("#answer").empty().append(table).append(button);

}

function buildChoices(id, choices) {

    var row = $("<tr>");

    for (i = 0; i < choices.length; i++) {
        var triviaChoice = "<input type='radio' name='" + id + "' value='" + i + "'> " + choices[i] + "";

        var item = $("<td>");

        item.append(triviaChoice);
        row.append(item);
    }

    return row;
}