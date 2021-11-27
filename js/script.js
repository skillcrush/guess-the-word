//the unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//the button with the text "Guess"
const guessButton = document.querySelector(".guess");
//the text input where the player will guess a letter
const guessedLetterElement = document.querySelector(".letter");
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

//global variable with empty array, to contain all letters guessed by player
const guessedLetters = [];

//function to add placeholder dots for each letter of the hidden word
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

//event listener/handler for Guess button
//- prevents reloading 
//- captures value of input
//- calls oneLetter function to validate input
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //stop form reloading
    guessMessage.innerText = ""; //clear message text, ready for a new message
    // letter entered into input
    const letterGuess = guessedLetterElement.value;
    // validate entered letter is only one letter
    const correctGuess = oneLetter(letterGuess);
    console.log(correctGuess);
    // call make Guess function if correctGuess has a valid result
    if (correctGuess) {
        makeGuess(correctGuess);
    } 
    //clear inputted letter
    guessedLetterElement.value = "";
});

//function to check the input is one letter only
//-displays message if input is invalid
const oneLetter = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        guessMessage.innerText = "Enter a letter";
    } else if (input.length > 1) {
        guessMessage.innerText = "Enter one letter only";
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Enter a letter between A and Z";
    } else {
        //input is one letter between A and Z
        const letter = input;
        return letter;
    }
};

//function that accepts the one letter output from OneLetter function as a parameter
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        guessMessage.innerText = "You've already entered that letter. Try again.";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
    }
}
