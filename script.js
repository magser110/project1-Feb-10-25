const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timer = document.getElementById('timer');

quoteInput.addEventListener('input', () => {
    const arrayQuote =  quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        //following is for quote to not have correct or incorrect values if user hasn't typed yet
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        //following is checking if user input matches quote
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect');
        } 
        //following checks if user input is wrong
        else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    })
    if (correct) getNextQuote();
})


const quotes = [
    "teehee.",
    "testing.",
    "is this working."
]

function getQuote() {
    // following gets random quote from array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(randomQuote);

}

getQuote();


async function getNextQuote() {
    const quote = await getQuote();
            //following is empty for usser input
    quoteDisplay.innerHTML = '';
    //following is splitting each letter from quote and creating a new span so we can check user input in the future(correct or incorrect)
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplay.appendChild(characterSpan);
    })
    quoteInput.value = null;
    startTimer();
}
getNextQuote();

let startTime 
function startTimer() {
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
   return Math.floor((new Date() - startTime) / 1000)
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