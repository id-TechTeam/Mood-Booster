var headerHeight = document.getElementsByClassName("partial-bg")[0].offsetHeight;
var wrapToMoveDown = document.getElementsByClassName("moveDown")[0];

console.log(document.getElementsByClassName("partial-bg"));

console.log(document.getElementsByClassName("partial-bg")[0])

wrapToMoveDown.style.marginTop = headerHeight + "px";