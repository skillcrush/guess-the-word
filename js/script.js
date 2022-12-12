const guessedLetterButton = document.querySelector(".guess");
const guessedLetterElement = document.querySelector("guess-letter");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement= document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide");

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
    getWord();
    
    const wordArray = words.split("\n");
    console.log(wordArray.split(/\s+/));

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses  = 8;

const  placeholder = function (word) {
   const placeholderLetters = [];
   for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
   }
wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


guessLetterButton.addEventListener("clicks", function(e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    console.log(guess);
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});
  
 const validateInput = function (input ) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
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

guessedLettersElement.innerHTML = "";
for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
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
//console.log(revealWord);
wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        //womp womp - bad guess, lose a chance
        message.innerText = `Sorry, the word has no ${guess}.`;  
        remainingGuesses -= 1;
        message.innerText = `Good guess! The word has the letter ${guess}.`;
}
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
    
    startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
 
    playAgainButton.classList.remove("hide");
};


const startOver = function() {
    if (player wins)
    return `play again`;
}   else (player loses)
    return `play again`;










  

    

    