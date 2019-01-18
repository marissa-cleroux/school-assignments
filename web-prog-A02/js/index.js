let $$ = function (id) {
    return document.getElementById(id)
};

function setUp() {

    if (localStorage.getItem('touchScreen'))
        localStorage.removeItem('touchScreen');

    let introBounds = $$('intro').getBoundingClientRect();
    let canvasEl = $$('bgCanvas');
    canvasEl.height = introBounds.height;
    canvasEl.width = introBounds.width;
    let context = canvasEl.getContext('2d');

    paintCanvas(context, canvasEl, introBounds);

    let personAway = setInterval(animatePersonMain, 50);
    let personWalking = setInterval(walkingPerson, 800);

    loudNoises();
    setTimeout(loudNoises, 2000);
    setTimeout(loudNoises, 3500);
    setTimeout(loudNoises, 4500);

    setTimeout(function () {
        clearInterval(personAway);
        clearInterval(personWalking);
    }, 9000);

    setTimeout(() => {
        $$('intro').removeChild($$('person'));
    }, 10000);

    setTimeout(() => {
        canvasAnimations(context, canvasEl, introBounds)
    }, 8000);
}

function paintCanvas(context, elCanvas, bounds) {
    let h = bounds.height;
    let w = bounds.width;
    context.lineWidth = 3;

    context.fillStyle = '#2F2F2F';
    context.beginPath();
    context.moveTo(w - w * 0.3, 0);
    context.lineTo(w - w * 0.1, h);
    context.lineTo(w, h);
    context.lineTo(w, 0);
    context.closePath();
    context.fill();
    context.stroke();

    context.fillStyle = '#000';
    context.beginPath();
    context.moveTo(w - w * 0.6, 0);
    context.lineTo(w - w * 0.9, h);
    context.lineTo(w - w * 0.8, h);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(w - w * 0.3, 0);
    context.lineTo(w - w * 0.2, h);
    context.lineTo(w - w * 0.1, h);
    context.closePath();
    context.fill();
    context.stroke();

    context.fillStyle = 'Green';
    context.beginPath();
    context.moveTo(w - w * 0.6, 0);
    context.lineTo(0, 0);
    context.lineTo(0, h);
    context.lineTo(w - w * 0.9, h);
    context.closePath();
    context.fill();
    context.stroke();

    let modifierXLeft = 0;
    let modifierXRight = 0;
    let modifierY = 0;

    const SIDEWALK_LINES = 12;
    for (let i = 0; i < SIDEWALK_LINES; i++) {
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(w - w * (0.30 - modifierXRight), h * (-0.02 + modifierY));
        context.lineTo(w - w * (0.60 + modifierXLeft), h * (-0.02 + modifierY));
        context.stroke();


        (modifierY == 0) ? modifierY += 0.05: modifierY *= 1.5;
        (modifierY <= 0.35) ? modifierXLeft += 0.01: modifierXLeft *= 1.6;
        (modifierY <= 0.5) ? modifierXRight += 0.005: modifierXRight += 0.03;
    }
}


function walkingPerson() {
    setTimeout(shakeLeft, 200);
    setTimeout(shakeDone, 400);
    setTimeout(shakeRight, 600);
    setTimeout(shakeDone, 800);
}

function shakeLeft() {
    $$('person').style.transform = 'rotate(-10deg)';
}

function shakeRight() {
    $$('person').style.transform = 'rotate(10deg)';
}

function shakeDone() {
    $$('person').style.transform = 'rotate(0deg)';
}

let personWalkingTop = 0;
let personWalkingSize = 0;
let personWalkingWidth = 0;

function animatePersonMain() {
    let introBounds = $$('intro').getBoundingClientRect();
    let person = $$('person');
    person.style.top = introBounds.height - personWalkingTop + 'px';
    person.style.left = introBounds.width / 4 + personWalkingWidth + 'px';
    person.width = introBounds.width * (0.5 - personWalkingSize);

    personWalkingTop += 5;
    personWalkingSize += 0.0015;
    personWalkingWidth += 0.45;
}

function getRandomPos(maxBounds) {
    var randomPos = Math.floor(Math.random() * maxBounds);
    return randomPos;
}

function loudNoises() {
    let introBounds = $$('intro').getBoundingClientRect();
    const BOOMS = 5;
    let loudImgs = [];
    let time = 0;

    for (let i = 0; i < BOOMS; i++) {
        loudImgs[i] = `images/boom${i + 1}.png`;

    }
    for (let i = 0; i < BOOMS; i++) {
        let img = new Image();
        img.src = loudImgs[i];
        img.id = `tempBoom${i}`;
        img.style.position = 'absolute';
        let tempLeft = getRandomPos(introBounds.width);
        let tempTop = getRandomPos(introBounds.height);
        time += 250;
        makeLoudNoises(img, tempLeft, tempTop, time);
    }

    for (let i = 0; i < BOOMS; i++) {
        time += 700;
        removeLoudNoises(`tempBoom${i}`, time);
    }
}

function removeLoudNoises(img, time) {
    setTimeout(() => {
        $$('intro').removeChild($$(img));
    }, time);
}

function makeLoudNoises(img, posLeft, posTop, time) {
    setTimeout(() => {
        $$('intro').appendChild(img);
        img.style.left = posLeft + 'px';
        img.style.top = posTop + 'px';
        img.style.zIndex = '10';
    }, time);

}

function canvasAnimations(context, canvas, bounds) {
    let curtainId = setInterval(() => {
        canvasCurtain(context, bounds)
    }, 20);
    let textId = undefined;
    setTimeout(function () {
        textId = setInterval(() => canvasTextOverwhelmed(context, bounds), 5);
    }, 2000);
    setTimeout(() => {
        $$('intro').style.backgroundColor = '#000'
    }, 2000);

    let fadeInId = undefined;
    setTimeout(() => {
        context.globalAlpha = 0;
        clearInterval(curtainId);
        clearInterval(textId);
        $$('intro').style.backgroundColor = '#000';
        fadeInId = setInterval(() => {
            canvasTextWelcomeFadeIn(context);
            canvasTextEnjoy(context, bounds);
        }, 200);
    }, 6000);

    setTimeout(function () {
        context.globalAlpha = 1;
        clearInterval(fadeInId);
        canvasTextEnjoy(context, bounds);
        canvasTextSolitaire(context, bounds);
    }, 8000);

    setTimeout(function () {
        setInterval(function () {
            canvasTextWelcomeFadeOut(context);
            canvasTextEnjoy(context, bounds);
            canvasTextSolitaire(context, bounds);
        }, 200);
    }, 10000);
    setTimeout(() => {
        location.href = 'intro.html'
    }, 12000);
}

let movingCurtain = 0;

function canvasCurtain(context, bounds) {
    context.fillStyle = '#000';
    context.fillRect(0, bounds.height - movingCurtain, bounds.width, 0 + movingCurtain);
    movingCurtain += 10;
}

let textSize = 12;

function canvasTextOverwhelmed(context, bounds) {
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.font = `normal ${textSize}pt Abel, sans-serif`;
    context.fillStyle = '#fff';
    context.fillText('Feeling overwhelmed', bounds.width * 0.1, bounds.height * 0.3);
    context.fillText('by your surroundings?', bounds.width * 0.3, bounds.height * 0.5);

    (textSize > bounds.width * 0.05) ? textSize: textSize += 0.05;
}

function canvasTextWelcomeFadeIn(context) {
    context.globalAlpha += 0.1;
}

function canvasTextWelcomeFadeOut(context) {
    context.globalAlpha -= 0.1;
    console.log('In function');
}

function canvasTextEnjoy(context, bounds) {
    context.fillStyle = '#FFF';
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.font = `normal ${bounds.width * 0.05}pt Lobster, sans-serif`;
    context.fillText('Enjoy your alone time', bounds.width * 0.1, bounds.height * 0.3);
    context.fillStyle = '#00FFFF';
    context.font = `normal ${bounds.width * 0.1}pt Abel, sans-serif`;
    context.fillText('(STURMFREI)', bounds.width * 0.1, bounds.height * 0.45);
}

function canvasTextSolitaire(context, bounds) {
    context.fillStyle = '#FFF';
    context.font = `normal ${bounds.width * 0.05}pt Lobster, sans-serif`;
    context.fillText('with some solitaire...', bounds.width * 0.3, bounds.height * 0.6);
}

addEventListener('load', setUp());

$$('skip').addEventListener('click', () => location.href = 'intro.html');