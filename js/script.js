const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess"); 
const inputLetterGuess = document.querySelector(".letter");
const wordBeingGuessed = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numGuessesLeftDisplay = document.querySelector(".remaining span");
const message= document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";


const lettersUnknown = function (word) {
    const lettersNotKnown = [];
    for(let letter of word){
        console.log(letter);
        lettersNotKnown.push("●")
    }

    wordBeingGuessed.innerText  = lettersNotKnown.join("");
};

lettersUnknown(word);

button.addEventListener("click", function (e) {
    e.preventDefault();
    const letterGuessed = inputLetterGuess.value; 
    console.log(letterGuessed);
    inputLetterGuess.value = "";
}); 

