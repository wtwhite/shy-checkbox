console.log("Hello world from shy-checkbox.js!");

checkbox = document.getElementById("chkbox");
console.log(`checkbox=${checkbox}.`);   //DEBUG
body = document.getElementById("body");
console.log(`body=${body}.`);   //DEBUG

body.addEventListener("mousemove", moveCheckboxToCursor);

function doSomething(e) {
    moveTo(e, { screenX: 250, screenY: 150 });
}

function moveCheckboxToCursor(e) {
    moveTo(checkbox, e);
}

function moveTo(o, event) {
    o.style.position = 'fixed';
    o.style.left = event.screenX + "px";
    o.style.top = event.screenY + "px";
}
