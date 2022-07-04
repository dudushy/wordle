//* Vars
var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");
var guessButton = document.getElementById("guessButton");
var gameDiv = document.getElementById("gameDiv");
var setupDiv = document.getElementById("setupDiv");

var gameWord = null;

//* Functions
function setupGame() {
    console.log("setupGame");

    setupDiv.style.display = "none"; // hide setup
    gameDiv.style.display = "block"; // show game

    gameWord = document.getElementById("gameWord").value;
    console.log("gameWord: " + gameWord);
}

function resetGame() {
    console.log("resetGame");

    setupDiv.style.display = "block"; // show setup
    gameDiv.style.display = "none"; // hide game

    gameWord = null
    document.getElementById("gameWord").value = null;
}

//? Main
resetGame();
// console.log(startButton);
startButton.addEventListener("click", setupGame);

// console.log(resetButton);
resetButton.addEventListener("click", resetGame);
