const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again")
const word = "magnolia";


//Adding placeholders
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
            placeholderLetters.push("●");
    }

progress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = textInput.value;
    console.log(guess);
    textInput.value = "";
});

//Accept & Validate Player Guesses
let playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    const match = regex.exec(word);

console.log(input);
}


    /*while (match) {
        const guess = match[1];
        console.log(guess);
    }   match = regex.exec(word);
    
};*/