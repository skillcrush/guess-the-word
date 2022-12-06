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
// IF/Else Statement
    if (goodGuess) {
// `We've got a letter! Let's guess!`
        makeGuess(guess);
    }

    letterInput.value = "";
});
  
 const validateInput = function (input ) {
// Inputs
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
    showGuessedLetter();
    updateWordInProgress(guessedLetters);
    }
  const showGuessedLetters = function () {
//Clear the list first
guessedLettersElement.innerHTML = "";
for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

//Create and name a function to update the word in progress that accepts the guessedLetters array as a parameter. This function will replace the circle symbols with the correct letters guessed.
const updateWordInProgress = function (guessedLetters) {
     = ();
}

const wordInProgress = [a-z];

//Create a variable called wordUpper to change the word variable to uppercase. On the following line, create a variable to split the word string into an array so that the letter can appear in the guessedLetters array: const wordArray = wordUpper.split("");. Then, log out wordArray to see what this does!
const wordUpper = word.toUpperCase();
const wordArray = wordUpper.split("");
const revealWord = [];
for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
    } else {
        revealWord.push("circle symbol");
    }
}
//console.log(revealWord);
wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerText = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};



//Check if the wordArray contains any letters from the guessedLetters array. If it does contain any of the letters, update the circle symbol with the correct letter. Hint: You’ll want to create a new array with the updated characters and then use join() to update the empty paragraph where the word in progress will appear.

//Call your new shiny new function at the bottom of the else statement inside the makeGuess function and pass it guessedLetters as an argument.
    

  










  

    

    