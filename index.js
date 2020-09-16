var buttonsArray = ["one", "two", "three", "four"];
for (var i = 0; i < buttonsArray.length; i++) {
    key = buttonsArray[i];
    switch (key) {
        case "one":
            var audioOne = new Audio("sounds/" + key + ".mp3");
            break;
        case "two":
            var audioTwo = new Audio("sounds/" + key + ".mp3");
            break;
        case "three":
            var audioThree = new Audio("sounds/" + key + ".mp3");
            break;
        case "four":
            var audioFour = new Audio("sounds/" + key + ".mp3");
            break;
    }
}

var audioButtons = [audioOne, audioTwo, audioThree, audioFour];
var audioWrong = new Audio("sounds/wrong.mp3");

var level = 0;
var randomPattern = [];
var randomNumber = 0;
var currentLevel = 0;
var chosenPattern = [];
var chosenButton = "";
var chosenNumber = 0;
var newArray = [];

function gameReset() {
    // start game whenever a key is pressed
    level = 0;
    randomPattern = [];
    randomNumber = 0;
    chosenPattern = [];
    chosenButton = "";
    chosenNumber = 0;

    $(".start-instruction").css("color", "black");
    $(".start-instruction").text("Press start.");
    $(".btn-reset").toggleClass("hidden");
    $(".btn-start").toggleClass("hidden");
}

$(".btn-start").on("click", () => {
    $(".btn-start").toggleClass("hidden");
    $(".btn-reset").toggleClass("hidden");
    gamePlay();
});

// reset game if Reset button is pressed
$(".btn-reset").on("click", gameReset);


//animations when a button is pressed
function buttonPress(key) {
    $("#" + key).addClass("pressed");
    setTimeout(() => {
        $("#" + key).removeClass("pressed");
    }, 1000)
}

//once game starts start showing pattern
//1. create an empty array. 
//2. keep saving new random generated number in this array
function gamePlay() {
    level++;
    chosenPattern = [];
    $(".start-instruction").text("Wait...");
    $(".start-instruction").css("color", "red");
    $(".current-level").text(level);
    randomNumber = Math.floor(Math.random() * 4);
    randomPattern.push(buttonsArray[randomNumber]);
    $("#" + buttonsArray[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
    // buttonPress(buttonsArray[randomNumber]);//animate random button
    audioButtons[randomNumber].play(); //get sound for random button
    //3. Ask user to enter the pattern
    setTimeout(() => {
        $(".start-instruction").text("Go...");
        $(".start-instruction").css("color", "green");
    }, 1000)
}


// take a user input
$(".btn").on("click", (event) => {
    chosenButton = event.target.id;
    chosenNumber = buttonsArray.indexOf(chosenButton);
    chosenPattern.push(chosenButton);
    //find index of chosen number in buttonsArray to play sound
    buttonPress(chosenButton);
    audioButtons[chosenNumber].play();
    checkPattern(chosenPattern.length-1);
})

//To compare and check patterns
function checkPattern(level) {
    if (chosenPattern[level] === randomPattern[level]) {
        if (chosenPattern.length === randomPattern.length) {
            setTimeout (() => {
                gamePlay();
            }, 1500)
        }
    } else {
        audioWrong.play();
        $(".start-instruction").css("color", "black");
        $(".start-instruction").text("Game over!!!");
    }
}