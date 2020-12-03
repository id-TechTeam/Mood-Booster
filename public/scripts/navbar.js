
//preload class on body to stop all animations on loading so there is no glitch with the navbar (may not be necessary?)
window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
// move the sidebar in and out from right side
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");

    document.querySelector("#btnNav").addEventListener("click", () => {
        nav.classList.add("nav--open");
    });
    document.querySelector(".nav__overlay").addEventListener("click", () => {
        nav.classList.remove("nav--open");
    });
});
// toggle dropdowns open and close so that only one can be opened at a time
const angry = document.getElementById("angry");
const anxious = document.getElementById("anxious");
const lonely = document.getElementById("lonely");
const sad = document.getElementById("sad");

angry.addEventListener('click', function () {
    document.getElementById("angry_dropdown").classList.toggle("show");
    document.getElementById("anxious_dropdown").classList.remove("show");
    document.getElementById("lonely_dropdown").classList.remove("show");
    document.getElementById("sad_dropdown").classList.remove("show");
})

anxious.addEventListener('click', function () {
    document.getElementById("angry_dropdown").classList.remove("show");
    document.getElementById("anxious_dropdown").classList.toggle("show");
    document.getElementById("lonely_dropdown").classList.remove("show");
    document.getElementById("sad_dropdown").classList.remove("show");
})

lonely.addEventListener('click', function () {
    document.getElementById("angry_dropdown").classList.remove("show");
    document.getElementById("anxious_dropdown").classList.remove("show");
    document.getElementById("lonely_dropdown").classList.toggle("show");
    document.getElementById("sad_dropdown").classList.remove("show");
})

sad.addEventListener('click', function () {
    document.getElementById("angry_dropdown").classList.remove("show");
    document.getElementById("anxious_dropdown").classList.remove("show");
    document.getElementById("lonely_dropdown").classList.remove("show");
    document.getElementById("sad_dropdown").classList.toggle("show");
})
// Close all the dropdowns if the user clicks outside of them
window.onclick = function (e) {
    if (!e.target.matches('.dropdown-btn')) {
        var myDropdown = document.getElementsByClassName("dropdown__container");
        var i;

        for (i = 0; i < myDropdown.length; i++) {
            if (myDropdown[i].classList.contains('show')) {
                myDropdown[i].classList.remove('show');
            }
        }
    }
}
