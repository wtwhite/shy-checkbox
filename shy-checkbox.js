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
    moveTo(checkbox, clientPosition(e));
}

function clientPosition(e) {
    return { x: e.clientX, y: e.clientY };
}

function moveTo(o, pos) {
    o.style.position = 'fixed';
    o.style.left = pos.x + "px";
    o.style.top = pos.y + "px";
}

function addVector(u, v) {
    return { x: u.x + v.x, y: u.y + v.y };
}

function scalarMultiplyVector(v, c) {
    return { x: c * v.x, y: c * v.y };
}

function subtractVector(u, v) {
    return addVector(u, scalarMultiplyVector(v, -1));
}

function dotProduct(u, v) {
    return u.x * v.x + u.y * v.y;
}
