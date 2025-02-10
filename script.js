const RANDOM_QUOTE_API_URL = 'https://thequoteshub.com/api/';

function getQuote() {
    fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getQuote();
    console.log(quote);
    
}

getNextQuote();