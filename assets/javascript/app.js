// function readJsonFile(file) {

//     var response = "";
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             // callback(rawFile.responseText);
//             response = rawFile.responseText;

//         }
//     }
//     console.log(response);
//     rawFile.send(null);
//     var data = JSON.parse(response);
//     return data;
// }


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

$(document).ready(function() {
    var count = 0;
    var scene;
    // readTextFile("assets/data/data.json", function(text, count) {
    //     data = JSON.parse(text);
    //     count = Object.keys(data.trivia).length;
    //     console.log(data);
    // });

    // var trivia = readJsonFile("assets/data/data.json");

    // console.log(count);
    // console.log(Object.keys(trivia.trivia).length);
    // console.log(trivia.trivia[1].fact);
    $.getJSON("assets/data/trivia.json", function(data) {
        //     scene = data;
        console.log(data);
    });


    // console.log(scene);
});