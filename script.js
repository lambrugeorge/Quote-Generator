// Get references to HTML elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Array to store quotes from the API
let apiQuotes = [];

// Show Loading
function loading() {
    // Display the loader and hide the quote container
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    // Hide the loader and display the quote container
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Function to display a new quote
function newQuote() {
    loading();
    // Choose a random quote from the apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if the author of the quote is unknown and set the text accordingly
    if (!quote.author) {
        authorText.textContent = 'Necunoscut';
    } else {
        authorText.textContent = quote.author;
    }

    // Check the length of the quote to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote , hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Function to get quotes from the API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Handle the error here
        console.error('Eroare la preluarea citatelor:', error);
    } finally {
        // Call complete() to hide the loader once quotes are loaded
        complete();
    }
}

// Function to tweet the current quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Add event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On page load, show the loading state and get quotes from the API
loading();
getQuotes();
