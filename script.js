import { easy, medium, hard} from "./data/data.js";

 


const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timer = document.getElementById("timer");
// research how to get user selection from user !!!!
const userDifficultyInput = document.getElementById("userSelect"); 
///which ever one they chose 
quoteInput.addEventListener("input", () => {
    const arrayQuote = quoteDisplay.querySelectorAll("span");
    const arrayValue = quoteInput.value.split("");
    const userSelction = '';
    
    console.log(userDifficultyInput.value);
  // research how to get userDifficultyInput from user !!!!
// create a varible that can store userSelection
/*  if (userDifficultyInput.value === 'easy') {
        userSelection = easy <= imported data
} else if (userDifficultyInput.value === 'medium) {
        userSelection = medium <= imported data
*/

// option to add and delete scores 
// [{}] using amount of letters as 100% / time

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    //following is for quote to not have correct or incorrect values if user hasn't typed yet
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    }
    //following is checking if user input matches quote
    else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    }
    //following checks if user input is wrong
    else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) getNextQuote();
});

function getQuote(quotes) {
  // following gets random quote from array
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  console.log(randomQuote);
  return randomQuote;
}

function getNextQuote() {
    console.log(userSelection);
    
  const quote = getQuote(userSelection);
  //following is empty for usser input
  quoteDisplay.innerHTML = "";
  //following is splitting each letter from quote and creating a new span so we can check user input in the future(correct or incorrect)
  console.log(quote);

  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  timer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

// const RANDOM_QUOTE_API_URL = 'https://zenquotes.io/api/random';

// function getQuote() {
//     return fetch(RANDOM_QUOTE_API_URL)
//     .then(response => response.json())
//     .then(data => data.content)
// }

// async function getNextQuote() {
//     const quote = await getQuote()
//     console.log(quote)

// }

// getNextQuote();
