const quotes = document.querySelector('#quote');
const authors = document.querySelector('#author');


//async function to add a new joke to the html in a div.

const addNewQuote = async () => {
    //clear the screen from old jokes
    quotes.innerHTML = "";
    authors.innerHTML = "";
    const quote = await getQuote();
    //we use a random number to display a random quote from the JSON array that is received from the API
    const quoteNumber = Math.floor(Math.random() * 1643);
    //console.log(quote.data[quoteNumber].text);
    const quoteText = quote.data[quoteNumber].text;
    let quoteAuthor = quote.data[quoteNumber].author;
    //change author to Anonymous if the value is null
    if (quoteAuthor == null) {
        quoteAuthor = "Anonymous";
    }
    quotes.append(quoteText);
    authors.append(quoteAuthor);

}


//async function to get the joke from the joke API
const getQuote = async () => {
    try {
        const res = await axios.get("https://type.fit/api/quotes");
        return res;
    } catch (e) {
        return "NO QUOTES AVAILABLE! SORRY :(" + e;
    }

}
btn.addEventListener('click', addNewQuote);
addNewQuote();