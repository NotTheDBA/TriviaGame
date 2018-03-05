$(document).ready(function() {
    var trivia, answers;
    var answered = false;
    var correct = null;
    var playerAnswer = -1;
    var quizNo = -1;
    var queryurl = "assets/data/trivia.json";

    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(data) {

        var count = Object.keys(data.trivia).length;
        quizNo = 1; // TODO get random quiz item

        $("#question").html("<p>" + data.trivia[quizNo].question + "</p>")

        setChoices(quizNo, data.trivia[quizNo]);

    });

});

function checkAnswer(playerAnswer, trivia) {

    answered = true;
    if (playerAnswer === trivia.answer) {
        correct = true;
    } else {
        correct = false
    }
    if (answered === true) {
        $("#fun-fact").html("<p>" + trivia.fact + "</p>")
    }

}


function setChoices(quizNo, trivia) {


    var table = $("<table>");
    table.append(makeChoices(quizNo, trivia.choices));

    var button = $("<button>");
    button.text("Answer");
    button.id = "submit";
    button.on("click", function() {
        var playerAnswer = $("input[name='" + quizNo + "']:checked").val();
        if (typeof playerAnswer !== 'undefined') {
            console.log(playerAnswer);
            // debugger;
            checkAnswer(playerAnswer, trivia)
        } else {
            console.log("Nope.")
                // debugger;
        }

    });

    // var form = $("<form>");
    // form.append(table);
    // form.append(button);

    // $("#choices").append(form);

    $("#choices").append(table).append(button);

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