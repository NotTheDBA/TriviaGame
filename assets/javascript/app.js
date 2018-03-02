var data = {
    "trivia": {
        "1": {
            "question": "Which of these movies is NOT based on a board game?",
            "choices": ["Ouija",
                "Jumanji",
                "Battleship",
                "Clue"
            ],
            "answer": 1,
            "fact": "Jumanju is about a boardgame of the same name, and there was a Jumanji game released in 1995 around the same time as the movie, but it was actually based on a 1981 novel by Chris Van Allsburg."
        },
        "2": {
            "question": "Which of these is the cheapest group of properties in Monopoly?",
            "choices": ["Dark Purple", "Light Purple", "Red", "Light Blue", "Dark Blue"],
            "answer": 0,
            "fact": "The Dark Purple properties - Mediterranean and Baltic Ave. - are the cheapest properties in Monopoly; they only cost $120 to buy.  The other colors, in order, are:  Light Blue - $320; Light Purple (Maroon/Pink) - $440; Orange - $560; Red - $700; Dark Blue - $750; Yellow - $800; Green- $920."
        },
        "3": {
            "question": "Three of the following are different names for the same game:  Which one is a different game?",
            "choices": ["Shogun", "Samurai Swords", "Ikusa", "James Clavell's Shogun"],
            "answer": 3,
            "fact": "Although there is a boardgame called James 'Clavell's Shogun', it is a different game.   The original name for Ikusa was 'Shogun', but it was later changed to Samurai Swords due to copyright issues with James Clavell's novel of the same name, then later changed to it's current name of Ikusa. "
        },
        "4": {
            "question": "Which of these is NOT a common characteristic of 'Euro' style board games?",
            "choices": ["Tile Placement", "Set Collection", "Player Elimination", "Area Control", "Worker Placement"],
            "answer": 2,
            "fact": "A Eurogame, also called a German-style or Euro-style board game, generally have indirect player interaction and abstract physical components. Euro-style games emphasize strategy while downplaying luck and conflict. They tend to have economic themes rather than military and usually keep all the players in the game until it ends."
        },
        "5": {
            "question": "Which of these games features dice drafting as a game mechanic?",
            "choices": ["Seasons", "7 Wonders", "Dominion", "Button Men"],
            "answer": 0,
            "fact": "In Seasons, the first player rolls a number of dice.  Each player in turn then selects one of the rolled values, and passes the rest of the dice along to the next player.  This is known as dice drafting."
        },
        "999": {
            "question": "Freebie:  The answer is zero.",
            "choices": ["0", "1", "2", "3"],
            "answer": 0,
            "fact": "Freebies are fun!"
        }
    }
};


var count = Object.keys(data.trivia).length;
var trivia, answers;
var answered = false;
var correct = null;
var playerAnswer = -1;
var quizNo = -1;

$(document).ready(function() {

    quizNo = 1; // get random quiz item

    setQuestion(quizNo, data.trivia[quizNo]);

    if (playerAnswer === data.trivia[quizNo].answer) {
        answered = true;
        correct = true;
    }

    if (answered) {
        $("#fun-fact").html("<p>" + data.trivia[quizNo].fact + "</p>")
    }

});

function setQuestion(quizNo, trivia) {
    console.log(quizNo);
    console.log(trivia.fact);

    $("#question").html("<p>" + trivia.question + "</p>")
    setChoices(quizNo, data.trivia[quizNo].choices);


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