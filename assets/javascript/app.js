// data format:
//         "999": {
//             "question": "Freebie:  The answer is zero.",
//             "choices": ["0", "1", "2", "3"],
//             "answer": 0,
//             "fact": "Freebies are fun!"
//         }

$(document).ready(function() {
    var count, numCorrect;
    //establish variables; values set later
    var seenQuestions = [];
    var data;

    var playerAnswer = -1;
    var quizNo = -1;
    getTrivia();

    setupGame();


});

function getTrivia() {
    // Only needs to run once on load.
    var queryurl = "assets/data/trivia.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        window.data = jsonData;
    });

}

function setupGame() {
    seenQuestions = [];
    numCorrect = 0;
    count = -1;
    quizNo = -1;
    playButton(newGame = true);
}

function gameOver() {
    console.log(numCorrect);

    //game over - re-set game
    setupGame();
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

    //Possible optimization:  Find a way to eliminate repeated index values in the random choice.
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

function showChoices(triviaID, trivia) {

    var table = $("<table>");
    table.append(buildChoices(triviaID, trivia.choices));

    var button = $("<button>").text("Answer");
    // button.id("submit");
    button.on("click", function() {
        var playerAnswer = $("input[name='" + triviaID + "']:checked").val();
        if (typeof playerAnswer !== 'undefined') {
            checkAnswer(playerAnswer, trivia)
        }
    });

    $("#answer").append(table).append(button);

    seenQuestions.push(triviaID);
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