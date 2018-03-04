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

        var count = Object.keys(data).length;
        quizNo = 1; // TODO get random quiz item

        // console.log(data);0
        // console.log(data.trivia[quizNo].question);
        // console.log(quizNo);
        // console.log(data.trivia[quizNo].fact);

        setQuestion(quizNo, data.trivia[quizNo]);

        if (playerAnswer === data.trivia[quizNo].answer) {
            answered = true;
            correct = true;
        }

        if (answered) {
            $("#fun-fact").html("<p>" + data.trivia[quizNo].fact + "</p>")
        }

    });

});

function setQuestion(quizNo, trivia) {
    console.log(quizNo);
    console.log(trivia.fact);

    $("#question").html("<p>" + trivia.question + "</p>")
    setChoices(quizNo, trivia.choices);


}

function setChoices(id, choices) {

    var row = $("<tr>");

    for (i = 0; i < choices.length; i++) {
        var triviaChoice = "<input type='radio' name='" + id + "' value='" + i + "'> " + choices[i] + "";

        var item = $("<td>");

        item.append(triviaChoice);
        row.append(item);
    }

    var table = $("<table>");
    table.append(row);

    var button = $("<button>");
    button.text("Answer");
    button.id = "submit";

    var form = $("<form>");
    form.append(table);
    form.append(button);

    $("#choices").append(form);


}