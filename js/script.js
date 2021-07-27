//Targeting the unordered list
const guessedLetters = document.querySelector("ul");
//Targeting the button
const button = document.querySelector(".guess");
//Targeting the text input
const textInput = "";
//Targeting empty paragraph
const progress = document.querySelector(".word-in-progress");
//Targeting remaining guesses
const remaining = document.querySelector(".remaining");
//Targeting span
const span = document.querySelector("span");
//Targeting empty paragraph for player guesses
const message = document.querySelector(".guessed-letters");
//Targeting hide button element
const hide = document.querySelector(".hide");
const word = ["m", "a", "g", "n", "o", "l", "i", "a"];


//Adding placeholders
const placeholder = [];
for(const letter of word) {
    placeholder.push("●")
};

wordInProgress.innerText = placeholder.join("");

placeholder(word);

button.addEventListener("click", function (e) {
    e.preventDeafult();
    console.log(guess);
    textInput.value = "";
});