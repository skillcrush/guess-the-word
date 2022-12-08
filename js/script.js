//Create global variables to select the following elements
const guessedLetterButton = document.querySelector(".guess");
const guessedLetterElement = document.querySelector("guess-letter");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement= document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const PlayAgainButton = document.querySelector(".play-again hide");

//Near the top of your file, under the word, guessedLetters, and remainingGuesses global variables, add an async function called getWord() to fetch data from a file at this address: “https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt”. Hint: You also retrieved data from a file in the school field trip exercise in a previous lesson. The difference here is that you’re fetching data from a text file instead of a JSON file. In the second await statement, use .text() instead of .json(). 
const remainingGuesses = document.querySelector(".remaining-guesses");
const guessedLetters = document.querySelector(".guessed-letters");
    
const getWord = async function () {
    const response = await fetch(“https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae3);
    const words = await response.text ();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
// Fire off the game 
    getWord();
    
    const wordArray = words.split("\n");
    console.log(wordArray.split(/\s+/));

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses  = 8;




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
    if (input.length === 0) {
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
};
//Call your new shiny new function at the bottom of the else statement inside the makeGuess function and pass it guessedLetters as an argument.
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
console.log(revealWord);
//Check if the wordArray contains any letters from the guessedLetters array. If it does contain any of the letters, update the circle symbol with the correct letter. Hint: You’ll want to create a new array with the updated characters and then use join() to update the empty paragraph where the word in progress will appear.
//console.log(revealWord);
wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

//Create and name a new function that will accept the guess input as a parameter. In the code, place this function before the function that checks if the player won.
//In the function, grab the word and make it uppercase. Because the player’s guess is uppercase, making the word they’re guessing uppercase will compare letters with the same casing.
//Find out if the word contains the guess. If it doesn’t include the letter from guess, let the player know that the word doesn’t contain the letter and subtract 1 from their remainingGuesses. If it does contain a letter, let the player know the letter is in the word.
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        //womp womp - bad guess, lose a chance
        message.innerText = `Sorry, the word has no ${guess}.`;  
        remainingGuesses -= 1;
        message.innerText = `Good guess! The word has the letter ${guess}.`;
}
//Still in the function and below the conditional statement, determine if the remainingGuesses is a value of 0. If they have no guesses remaining, update the message to say the game is over and what the word is. If they have 1 guess, update the span inside the paragraph where the remaining guesses will display to tell the player they have one guess remaining. If they have more than one guess, update the same span element to tell them the number of guesses remaining.
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    }   else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }   else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses;`
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerText = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};

//Create a global variable called remainingGuesses and set it to a value of 8. The value 8 is the maximum number of guesses the player can make. You can decrease or increase this value to make the game harder or easier for the player! Hint: The value of the remainingGuesses variable will change over time.
*DECLARE A GLOBAL VARIABLE FOR THE NUMBER OF GUESSES**
See above line 89


//You know how to grab a random element from an array, now you’ll grab a random word. To select a random word, you’ll need first to transform the data you fetched into an array. Each word is separated by a newline (line break), so this is the delimiter you’ll use to create the array: const wordArray = words.split("\n");. Log out your wordArray to see the data.

    

  










  

    

    