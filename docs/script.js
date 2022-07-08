//* Vars
var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");
var guessButton = document.getElementById("guessButton");
var gameDiv = document.getElementById("gameDiv");
var setupDiv = document.getElementById("setupDiv");
var gameWordInput = document.getElementById("gameWordInput");

var gameWord = [];
var regex = "qwertyuiopasdfghjklzxcvbnm";

//* Functions
function setupGame() {
    console.log("setupGame");

    console.log("gameWord.length", gameWord.length);
    console.log("gameWordInput.value.length", gameWordInput.value.length);
    console.log("gameWordInput.value", gameWordInput.value);
    console.log("regex.includes(gameWordInput.value.toLowerCase())", regex.includes(gameWordInput.value.toLowerCase()));

    if (gameWordInput.value.length == 5) {
        gameWord = [];

        for (const char of gameWordInput.value) {
            console.log("char", char);
            if (regex.includes(char.toLowerCase())) {
                gameWord.push(char.toUpperCase());
                console.log("gameWord.push", gameWord);
            }
        }
    }

    if (gameWord.length == 5) {
        setupDiv.style.display = "none"; // hide setup
        gameDiv.style.display = "block"; // show game

        console.log("gameWord: " + gameWord);
    }
}

function resetGame() {
    console.log("resetGame");

    setupDiv.style.display = "block"; // show setup
    gameDiv.style.display = "none"; // hide game

    for (var i = 0; i < gameWord.length; i++) {
        wordTableColumnSpan = document.querySelector("#wordBox" + (i + 1) + " > span");
        console.log("wordTableColumnSpan", wordTableColumnSpan);
        wordTableColumnSpan.innerHTML = "&nbsp;";
    }

    gameWordInput.value = null;
    gameWord = [];

}

function addCharToGameWord(char) {
    console.log("gameWord", gameWord);
    console.log("char", char);

    if (gameWord.length < 5 && regex.includes(char.toLowerCase())) {
        gameWord.push(char.toUpperCase());

        wordTableColumnSpan = document.querySelector("#wordBox" + gameWord.length + " > span");
        console.log("wordTableColumnSpan", wordTableColumnSpan);

        wordTableColumnSpan.innerHTML = char.toUpperCase();

        console.log("gameWord", gameWord);
    }
}

document.onkeypress = function (e) {
    e = e || window.event;
    console.log("key pressed: ", e);

    if (gameWord.length != 5) {
        addCharToGameWord(e.key.substring(0));
    }
};

// document.addEventListener('keypress', (event) => {
//     const keyName = event.key;
//     alert('keypress event \ n \ n' + 'chave:' + nome da chave);
// });

//? Main
resetGame();
// console.log(startButton);
startButton.addEventListener("click", setupGame);

// console.log(resetButton);
resetButton.addEventListener("click", resetGame);
