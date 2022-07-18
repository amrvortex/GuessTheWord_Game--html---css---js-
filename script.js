const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hintSpan = document.querySelector(".hint span");
const typingInput = document.querySelector(".typing-input");
const wrongletters = document.querySelector(".wrong-letter span");
const remainingGuesses = document.querySelector(".guess-left span");

let ranObj;
let word;
let corrects = [];
let incorrects = [];
let guessesLeft;
function randomWord() {
  // getting random object from wordList
  ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word;
  let hint = ranObj.hint;
  guessesLeft = 8;
  corrects = [];
  incorrects = [];
  console.log(ranObj);
  hintSpan.innerText = hint;
  remainingGuesses.innerText = guessesLeft;
  wrongletters.innerText = incorrects;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled />
          `;
  }
  inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrects.includes(` ${key.toUpperCase()}`) &&
    !corrects.includes(key)
  ) {
    console.log(key);
    if (word.includes(key)) {
      //if user letter found in the word
      for (let i = 0; i < word.length; i++) {
        // showing matched letter in the input value
        if (word[i] === key) {
          corrects.push(key);
          inputs.children[i].value = key;
        }
      }
    } else {
      guessesLeft--; // Decrement guesses Left by 1
      incorrects.push(` ${key.toUpperCase()}`);
    }

    remainingGuesses.innerText = guessesLeft;
    wrongletters.innerText = incorrects;
  }
  typingInput.value = "";

  if (corrects.length === word.length) {
    show_pop_conformation();
    //alert("Horray! You are Awesome 🎉😍💓");
    //show all letters in the input
    for (let i = 0; i < word.length; i++) {
      // showing matched letter in the input value
      inputs.children[i].value = word[i];
    }
  } else if (guessesLeft < 1) {
    // if user couldn't find all the letters
    //alert("Game Over! You Suck Dude 😂");
    show_pop_warning();

    //show all letters in the input
    for (let i = 0; i < word.length; i++) {
      // showing matched letter in the input value
      inputs.children[i].value = word[i];
    }
  }
}
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());

/* pop up */

function show_pop_conformation() {
  document.querySelector(".pop-up-container").classList.add("open");
  document.querySelector(".card-confirmation").classList.add("open");
}

function hide_pop_conformation() {
  document.querySelector(".pop-up-container").classList.remove("open");
  document.querySelector(".card-confirmation").classList.remove("open");
}

function show_pop_warning() {
  document.querySelector(".pop-up-container").classList.add("open");
  document.querySelector(".card-warning").classList.add("open");
}

function hide_pop_warning() {
  document.querySelector(".pop-up-container").classList.remove("open");
  document.querySelector(".card-warning").classList.remove("open");
}
