var numCorrect = 0;
var count = -1;
quizNo = -1;
var seenQuestions = [];
var data;
// data format:
//         "999": {
//             "question": "Freebie:  The answer is zero.",
//             "choices": ["0", "1", "2", "3"],
//             "answer": 0,
//             "fact": "Freebies are fun!"
//         }

//TODO: Add timer, pause and start function.
//TODO: Add final scoring at end of game.
//TODO: fix re-play button at end of game.
$(document).ready(function() {
    var answers;
    // var answered = false;
    // var correct = null;
    var playerAnswer = -1;
    var quizNo = -1;
    getTrivia();


});

function getTrivia() {

    var queryurl = "assets/data/trivia.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //put this in our global space
        window.data = jsonData;
        //start game
        playButton(newGame = true);
    });

}

function gameOver() {

    //game over - re-set game
    playButton(newGame = true);
}

function clearScreen() {
    $("#answer").empty();
    $("#fun-fact").empty();
    $("#question").empty();
}

function getQuestion() {
    clearScreen();
    if (count === seenQuestions.length) {
        gameOver()
        return;
    }
    if (count === -1) {
        count = Object.keys(data.trivia).length;
    }

    while (quizNo === -1 || seenQuestions.indexOf(quizNo) > -1) {
        quizNo = Math.floor(Math.random() * count)
    }
    $("#question").html("<p>" + data.trivia[quizNo].question + "</p>")
    showChoices(quizNo, data.trivia[quizNo]);

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

function showChoices(quizNo, trivia) {

    var table = $("<table>");
    table.append(makeChoices(quizNo, trivia.choices));

    var button = $("<button>");
    button.text("Answer");
    button.id = "submit";
    button.on("click", function() {
        var playerAnswer = $("input[name='" + quizNo + "']:checked").val();
        if (typeof playerAnswer !== 'undefined') {
            checkAnswer(playerAnswer, trivia)
        }
    });

    $("#answer").append(table).append(button);

    seenQuestions.push(quizNo);
}

function makeChoices(id, choices) {

    var row = $("<tr>");

    for (i = 0; i < choices.length; i++) {
        var triviaChoice = "<input type='radio' name='" + id + "' value='" + i + "'> " + choices[i] + "";

        var item = $("<td>");

        item.append(triviaChoice);
        row.append(item);
    }

    return row;
}