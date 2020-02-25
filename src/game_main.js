var canvas;
var ctx; // !!! context 2D (drawing)

var engine;
var widthScreen = window.innerWidth;
var heightScreen = window.innerHeight;
var ratio = window.devicePixelRatio;
var step = 0;

var score;


window.addEventListener("load",main);
window.addEventListener('keydown', keyDownHandle);
window.addEventListener('keyup', keyUpHandle);


function main() {
    engine = new Engine();
    canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    canvas.width = widthScreen * ratio;
    canvas.height = heightScreen * ratio;
    canvas.style.width = widthScreen + "px";
    canvas.style.height = heightScreen + "px";
    ctx.scale(ratio,ratio);
    ctx.imageSmoothingEnabled = false; //pour la clarite de l'image
    var startButton = document.getElementById("start");
    score = document.getElementById("score");
    startButton.addEventListener('click', startGame);
}

function startGame(event) {
    var start = document.getElementById("start");
    start.style.display = "none";
    engine.start();
}


function keyDownHandle(event) {
    switch(event.keyCode) {
    case 38 :
        engine.jump();
        break;
    case 39 :
        engine.goRight();
        break;
    case 37 :
        engine.goLeft();
        break;
    case 32 :
        engine.fire();
    default :
        break;
    }
}

function keyUpHandle(event) {
    switch(event.keyCode) {
    case 39 :
        engine.stopX();
        break;
    case 37 :
        engine.stopX();
        break;
    default :
        break;
    }
}

