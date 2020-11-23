
//select the location of the picture and the button to trigger it
const cats = document.querySelector('#cats');
const button = document.querySelector('button');

// async function to add a new picture to the html in a div. Includes attribution text displayed with pictures

const addNewCat = async () => {
    //clear the screen from old cats
    cats.innerHTML = "";
    const cat = await getCat();
    const img = document.createElement("img");
    const credits = document.createElement('div');

    const author = "https://unsplash.com/@" + cat.data.user.username + "?utm_source=Cute_Cat_Pics&utm_medium=referral";
    credits.innerHTML = "Photo by " + "<a href = " + author + ">" + cat.data.user.name + "</a>" + " on " + "<a href = 'https://unsplash.com/?utm_source=Cute_Cat_Pics&utm_medium=referral'>" + "Unsplash" + "</a>";
    img.setAttribute('class', "rounded");
    img.src = cat.data.urls.small;
    cats.append(img);
    cats.append(credits);

}

//async function to fetch the cat from the Unsplash API - needs sign up but is free up to 50 calls per hour. Can be customized more for size and query
const getCat = async () => {
    try {
        const config = {
            headers: {
                'Accept-Version': 'v1',
                Authorization: PIC_API_KEY
            }
        }
        const res = await axios.get('https://api.unsplash.com/photos/random?query=kitten', config)
        return res;
    } catch (e) {
        return "NO CATS AVAILABLE! SORRY :("
    }

}

addNewCat();
//add listener to the button to trigger the adding function
// cats.addEventListener('click', addNewCat);
// button.addEventListener('click', addNewCat)






