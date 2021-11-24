//the unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
//the button with the text "Guess"
const guessButton = document.querySelector(".guess");
//the text input where the player will guess a letter
const guessedLetter = document.querySelector(".letter");
//the empty paragrph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//the paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
//the span inside the paragraph where the remaining guesses will display
const numberGuesses = document.querySelector(".remaining span");
//the empty paragraph where messages will appear when the player guesses a letter
const guessMessage = document.querySelector(".message");
//the hidden button that will appear to prompt to player to play again
const playAgainButton = document.querySelector(".play-again");
//starting word
const word = "magnolia";

//function to add placeholders for each letter

const addDots = function() {
    var dotArray = [];
    const splitWord = word.split("");
    //console.log(splitWord);
    for (let _l of splitWord) {
        dotArray.push("●")
    }
    
    return dotArray.join("");
};

const dots = addDots();

wordInProgress.innerText = dots;
