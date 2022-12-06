//Create global variables to select the following elements
const guessedLetters = document.querySelector(".guessed-letters");
const guessedLetterButton = document.querySelector(".guess");
const guessLetter = document.querySelector("guess-letter");
const remainingGuesses = document.querySelector(".remaining-guesses");
const wordProgress = document.querySelector(".word-in-progress");
const guessDisplaySpan = document.querySelector(".display");
const message = document.querySelector(".message");
const PlayAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";
const guessedLetters = [];



//Write a Function to Add Placeholders for Each Letter
const  placeholder = function (word) {
   const placeholderLetters = [];
   for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
   }
//Call the function and pass it the word variable as the argument.
wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


guessLetterButton.addEventListener("clicks", function(e) {
    e.preventDefault();
    //Empty message paragraph
    message.innerText = "";
    //Let's grab what was entered in the input
    const guess = letterInput.value;
    console.log(guess);
    //Let's make sure that it is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // `We've got a letter! Let's guess!`
        makeGuess(guess);
    }

    letterInput.value = "";
});
  
 const validateInput = function (input ) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length ===0) {
    // Is the input empty?
    message.innerText = "Please enter a letter.";
    }  else if (input.length > 1) {
    // Did you enter more than one letter?
    message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = "Please enter a letter from A to Z.";
    } else {
    // We finally got a single letter, omg yay
    return input;
    }
});

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

    
    

  










  

    

    