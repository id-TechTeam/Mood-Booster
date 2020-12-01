const quotes = document.querySelector('#quote');
const authors = document.querySelector('#author');


//async function to add a new joke to the html in a div.

const addNewQuote = async () => {
    //clear the screen from old jokes
    quotes.innerHTML = "";
    authors.innerHTML = "";
    const quote = await getQuote();
    const quoteText = quote.data.contents.quotes[0].quote;
    const quoteAuthor = quote.data.contents.quotes[0].author;
    quotes.append(quoteText);
    authors.append(quoteAuthor);

}


//async function to get the joke from the joke API
const getQuote = async () => {
    try {
        const res = await axios.get("https://quotes.rest/qod?category=inspire&language=en");
        return res;
    } catch (e) {
        return "NO QUOTES AVAILABLE! SORRY :(" + e;
    }

}

addNewQuote();