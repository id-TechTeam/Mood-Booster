const jokeSetup = document.querySelector('#jokeSetup');
const jokePunchline = document.querySelector('#jokePunchline');
const btn = document.querySelector('#btn');


//async function to add a new joke to the html in a div.

const addNewJoke = async () => {
    //clear the screen from old jokes
    jokeSetup.innerHTML = "";
    jokePunchline.innerHTML = "";
    const jokeJSON = await getJoke();
    const _jokeSetup = jokeJSON.data.setup;
    const _jokePunchline = jokeJSON.data.punchline;
    jokeSetup.append(_jokeSetup);
    jokePunchline.append(_jokePunchline);

}


//async function to get the joke from the joke API
// const getJoke = async () => {
//     try {

//         const config = {
//             headers: {
//                 'x-rapidapi-key': JOKE_API_KEY,
//                 'x-rapidapi-host': 'joke3.p.rapidapi.com'
//             }
//         }
//         const res = await axios.get('https://joke3.p.rapidapi.com/v1/joke', config)
//         return res.data.content;
//     } catch (e) {
//         return "NO JOKES AVAILABLE! SORRY :("
//     }

// }

function getJoke() {
    return new Promise(async resolve => {
        var result = await axios.get("/getJoke");
        resolve(axios.get("/getJoke"));
    });
}
btn.addEventListener('click', addNewJoke);
addNewJoke();