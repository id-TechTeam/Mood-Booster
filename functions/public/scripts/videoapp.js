
//select the location of the picture and the button to trigger it
const pictures = document.querySelector('#picture');
const btn = document.querySelector('#btn');


//async function to add a new picture to the html in a div.Includes attribution text displayed with pictures

const addNewPicture = async () => {
    //clear the screen from old pictures
    pictures.innerHTML = "";
    const picture = await getPicture();
    const img = document.createElement("img");
    const credits = document.createElement('div');

    const author = "https://unsplash.com/@" + picture.data.user.username + "?utm_source=Mood_Booster&utm_medium=referral";
    credits.innerHTML = "Photo by " + "<a href = " + author + ">" + picture.data.user.name + "</a>" + " on " + "<a href = 'https://unsplash.com/?utm_source=Mood_Booster&utm_medium=referral'>" + "Unsplash" + "</a>";
    img.setAttribute('class', "rounded");
    img.src = picture.data.urls.raw + "&fit=fill&fill=blur&w=400&h=400";
    credits.setAttribute('class', 'mt-3');
    pictures.append(img);
    pictures.append(credits);

}

//async function to fetch the cat from the Unsplash API - needs sign up but is free up to 50 calls per hour.Can be customized more for size and query
function getPicture() {
    return new Promise(async resolve => {
        var result = await axios.get("/getPicture/" + getSelected())
        resolve(axios.get("/getPicture/" + getSelected()));
    });
}

// function to handle selection of different type of picture
const getSelected = function () {
    const selections = document.querySelectorAll('input[name="selection"]');
    let selectedValue;
    for (const selection of selections) {
        if (selection.checked) {
            selectedValue = selection.value;
            break;
        }
    }
    return selectedValue;
};

btn.addEventListener('click', addNewPicture);
addNewPicture();
