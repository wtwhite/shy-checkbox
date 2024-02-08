console.log("Hello world from shy-checkbox.js!");

const zeroVector = { x: 0, y: 0 };

checkbox = document.getElementById("chkbox");
console.log(`checkbox=${checkbox}.`);   //DEBUG
body = document.getElementById("body");
console.log(`body=${body}.`);   //DEBUG
coordInfoElement = document.getElementById("coordInfo");
console.log(`coordInfoElement=${coordInfoElement}.`);   //DEBUG

moveCentreTo(checkbox, { x: 100, y: 100 });

// body.addEventListener("mousemove", moveCheckboxToCursor);
body.addEventListener("mousemove", moveCheckboxAwayFromCursor);

function doSomething(e) {
    moveTo(e, { screenX: 250, screenY: 150 });
}

function moveCheckboxToCursor(e) {
    moveCentreTo(checkbox, clientPosition(e));
    coordInfoElement.innerText = `client: (${e.clientX}, ${e.clientY}); offset: (${e.offsetX}, ${e.offsetY})`;
}

function moveCheckboxAwayFromCursor(e) {
    const cursor = clientPosition(e);
    let target = positionOf(checkbox);
    let delta = computeForce(cursor, target);
    let newPos = addVector(target, delta);
    coordInfoElement.innerText = `cursor: (${cursor.x}, ${cursor.y}); target: (${target.x}, ${target.y}); delta: (${delta.x}, ${delta.y}); newPos: (${newPos.x}, ${newPos.y}).`;
    // moveCentreTo(checkbox, newPos);
    moveTo(checkbox, newPos);
}

function moveCentreTo(o, v) {
    moveTo(o, addVector(v, scalarMultiplyVector(elementSize(o), -0.5)));
}

function clientPosition(e) {
    return { x: e.clientX, y: e.clientY };
}

function moveTo(o, v) {
    o.style.position = 'fixed';
    o.style.left = v.x + "px";
    o.style.top = v.y + "px";
}

//HACK: This only "works" for elements that have had their CSS left and top properties explicitly set!
function positionOf(o) {
    return { x: parseInt(o.style.left || '0'), y: parseInt(o.style.top || '0') };
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

function elementSize(o) {
    return { x: o.offsetWidth, y: o.offsetHeight };
}

function distanceSquared(u, v) {
    return vectorLengthSquared(subtractVector(u, v));
}

function distance(u, v) {
    return vectorLength(subtractVector(u, v));
}

function vectorLength(v) {
    return Math.sqrt(vectorLengthSquared(v));
}

function vectorLengthSquared(v) {
    return dotProduct(v, v);
}

function clampVector(v, m) {
    const d = vectorLength(v);      //HACK: Could be cleverer and avoid a sqrt() here
    if (d > m) {
        return scalarMultiplyVector(v, m / d);
    } else {
        return v;
    }
}

function computeForce(cursor, target) {
    const diff = subtractVector(target, cursor);
    const d = vectorLength(diff);

    if (d > 200) {
        return zeroVector;
    }

    const intensity = 200 / (d + 3);
    return clampVector(scalarMultiplyVector(diff, intensity / (d + 1)), 10);
}
