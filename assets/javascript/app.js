// data format:
//         "999": {
//             "question": "Freebie:  The answer is zero.",
//             "choices": ["0", "1", "2", "3"],
//             "answer": 0,
//             "fact": "Freebies are fun!"
//         }

$(document).ready(function() {

    getTriviaData();
    // this option allows bonus time to read the fun facts.
    // stopwatch.allowPause = true;
    setupGame();

});

function getTriviaData() {
    // Only needs to run once on load.
    var queryurl = "assets/data/trivia.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        window.gameData = jsonData;
    });

}

function setupGame() {
    seenQuestions = [];
    numCorrect = 0;

    count = -1;
    quizNo = -1;
    stopwatch.reset();
    clearScreen();
    displayBanner("Get ready to play Trivia Quiz!");
    makePlayButton("Play");
}

function gameOver() {
    stopwatch.stop();

    var final = "<p>Number of questions: " + count + "</p>"
    final += "<p>Correct Answers: " + numCorrect + "</p>"
    final += "<p>Score: <em>" + Math.floor(numCorrect * 100 / count) + "</em></p>"
    displayFact(final);

    //game over - re-set game
    displayBanner("Ready to play again?");
    makeRestartButton();
}

function clearScreen() {
    $("#answer").empty();
    $("#fun-fact").empty();
    $("#question").empty();
}

function showQuestion() {
    clearScreen();
    if (count === seenQuestions.length) {
        gameOver()
        return;
    }

    if (count === -1) {
        count = Object.keys(gameData.trivia).length;
    }

    //Possible optimization:  Find a way to eliminate repeated index values in the random choice.
    while (quizNo === -1 || seenQuestions.indexOf(quizNo) > -1) {
        quizNo = Math.floor(Math.random() * count)
    }
    displayBanner(gameData.trivia[quizNo].question);
    showChoices(quizNo, gameData.trivia[quizNo]);

    stopwatch.start();
}

function displayBanner(label, style) {
    var p = $("<p>").text(label);
    switch (style) {
        case "failure":
            p.addClass("text-danger")
            break;
        case "success":
            p.addClass("text-success")
            break;
        default:
            p.addClass("text-primary")

    }
    $("#question").html(p);
}

function displayFact(label) {
    $("#fun-fact").html("<h5>" + label + "</h5>")
}

function makePlayButton(label) {

    var button = $("<button>").text(label).addClass("btn btn-primary btn-block");
    button.on("click", function() {
        showQuestion();
    });

    $("#answer").empty().append(button);
}

function makeRestartButton() {

    var button = $("<button>").text('New Game').addClass("btn btn-primary btn-block");
    button.on("click", function() {
        setupGame();
    });

    $("#answer").empty().append(button);
}

function checkAnswer(playerAnswer, trivia) {

    stopwatch.pause();

    if (parseInt(playerAnswer) == trivia.answer) {
        console.log(numCorrect);
        numCorrect += 1;
        console.log(numCorrect);

        displayBanner("Correct! '" + trivia.choices[trivia.answer] + "' is the answer!", "success");
    } else {
        displayBanner("Sorry... the correct answer was: " + trivia.choices[trivia.answer], "failure");
    }

    displayFact(trivia.fact);
    makePlayButton("Next");
}

function showChoices(triviaID, trivia) {

    var table = $("<table>");
    table.append(buildChoiceInput(triviaID, trivia.choices));

    // Adding click event listeners to all choice button elements
    $(document).off("click").on("click", ".choices", function() {
        var playerAnswer = $(this).val()
        if (typeof playerAnswer !== 'undefined') {
            checkAnswer(playerAnswer, trivia)
        }
    });

    $("#answer").append(table)
    seenQuestions.push(triviaID);
}

function buildChoiceInput(id, choices) {

    var tBody = $("<tbody>");

    for (i = 0; i < choices.length; i++) {

        var triviaChoice = "<button type='button' class='choices btn btn-primary btn-block ' name='" + id + "' value='" + i + "'> " + choices[i] + "</button>";

        var row = $("<tr>");
        var item = $("<td>");

        item.append(triviaChoice);
        row.append(item);
        tBody.append(row);
    }

    return tBody;
}

const SECONDS_BY_MILLISECOND = 1000;
const MINUTES_BY_SECOND = 60;
//  Our stopwatch object.
var stopwatch = {
    time: 0,
    lap: 1,
    laptime: 0,

    allowPause: false,
    clockRunning: false,
    timerID: null,

    reset: function() {

        stopwatch.clockRunning = false;

        //Two minute countdown 
        stopwatch.time = 2 * MINUTES_BY_SECOND;
        stopwatch.displayTime(stopwatch.time);
    },

    start: function() {

        if (!stopwatch.clockRunning) {
            timerID = setInterval(stopwatch.count, 1 * SECONDS_BY_MILLISECOND);
            stopwatch.clockRunning = true;
        }
    },

    stop: function() {
        if (stopwatch.clockRunning) {
            clearInterval(timerID);
            stopwatch.clockRunning = false;
        }
    },

    pause: function() {
        if (stopwatch.allowPause && stopwatch.clockRunning) {
            clearInterval(timerID);
            stopwatch.clockRunning = false;
        }
    },

    count: function() {
        // decrement time
        stopwatch.time--;
        stopwatch.displayTime(stopwatch.time);
        if (stopwatch.time === 0) {
            gameOver();
        }
    },

    displayTime: function(time) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(time / 60);
        var seconds = time - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        $("#timer").text(minutes + ":" + seconds);
    }
};