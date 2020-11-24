const jokes = document.querySelector('#joke');


//async function to add a new joke to the html in a div.

const addNewJoke = async () => {
    //clear the screen from old jokes
    jokes.innerHTML = "";
    const jokeText = await getJoke();

    jokes.append(jokeText);

}


//async function to get the joke from the joke API
const getJoke = async () => {
    try {

        const config = {
            headers: {
                'x-rapidapi-key': JOKE_API_KEY,
                'x-rapidapi-host': 'joke3.p.rapidapi.com'
            }
        }
        const res = await axios.get('https://joke3.p.rapidapi.com/v1/joke', config)
        return res.data.content;
    } catch (e) {
        return "NO JOKES AVAILABLE! SORRY :("
    }

}

addNewJoke();