/////Screens
let WELCOME_SCREEN = 0;
let INTERMEDIATE_SCREEN = 1;
let GAMEOVER_SCREEN = 2;

let currentScreen = WELCOME_SCREEN;

/////adjustable canvas
//should I adjust all varibles so eversthing will be in
//proportion to canvas size?
let canvasWidth = 600;
let canvasHeight = 500;

/////everthing my protag, appa needs
let appaX;
let appaY;
let appaWidth = canvasWidth * 0.167;
let appaHeight = canvasHeight * 0.1;
let appaScale;

/////background stuff
let mountainX;
let mountainY;

let waterHeight;

//Game controls and physics

//end game controls

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

//Protagonist
function appa(appaX, appaY, appaWidth, appaHeight, appaScale) {
  push();
  translate(appaX, appaY);
  scale(appaScale);
  rectMode(CENTER);
  fill(255);
  stroke(0);
  fill(0);
  rect(0, 0, appaWidth, appaHeight); //basically the hit box
  textAlign(CENTER);
  fill(255);
  textSize(15);
  text("Appa", 0, 0);
  pop();
}

//Background
function water(waterHeight) {
  fill(0, 77, 128);
  rect(0, canvasHeight - 0.2 * canvasHeight, canvasWidth, waterHeight);
}

function mountain() {
  fill(77, 77, 77);
  noStroke();
  rect(
    50,
    0 + (canvasHeight - 0.7 * canvasHeight),
    appaWidth,
    0.5 * canvasHeight
  );
  triangle(-150, 400, 50, 150, 50, 400);
  triangle(150, 400, 150, 150, 250, 400);
}

function draw() {
  if (currentScreen === WELCOME_SCREEN) {
    background(179, 224, 255);
    water(0.2 * canvasHeight);
    mountain();

    textSize(30);
    text(
      "Press space to start and to keep Appa in the air. Land him safely on the water!",
      250,
      50
    );

    appa(100, 125, appaWidth, appaHeight, 1);
  } else if (currentScreen === INTERMEDIATE_SCREEN) {
    background(179, 224, 255);
    water(0.2 * canvasHeight);
    mountain();
    appa(100, 125, appaWidth, appaHeight, 1);
    text("Screen two.", 20, 20);
  } else if (currentScreen === GAMEOVER_SCREEN) {
    background(179, 224, 255);
    fill(0, 77, 128);
    rect(0, 0 + 0.2 * canvasHeight, canvasWidth, 0.8 * canvasHeight); //Water

    let appaScale = 4;
    appa(canvasWidth / 2, canvasHeight / 2, appaWidth, appaHeight, appaScale);
    appaScale = appaScale - 1;
    //he's supposed to become smaller :(

    push();
    translate(-150, -50);
    fill(255);
    //textAlign(CENTER);
    textSize(60);
    text("GAME OVER", 300, 250);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("You lost.", canvasWidth / 2, canvasHeight - 0.35 * canvasHeight);
    text(
      "Appa is drowning :(",
      canvasWidth / 2,
      canvasHeight - 0.1 * canvasHeight
    );
    //textAlign(CENTER);
    pop();
  }
}

/////Game controls

/////Screen switching
function keyPressed() {
  if (currentScreen === WELCOME_SCREEN) {
    currentScreen = INTERMEDIATE_SCREEN;
  } else if (currentScreen === INTERMEDIATE_SCREEN) {
    currentScreen = GAMEOVER_SCREEN;
  } else if (currentScreen === GAMEOVER_SCREEN) {
    currentScreen = WELCOME_SCREEN;
  }
}

function mouseClicked() {
  if (currentScreen === WELCOME_SCREEN) {
    currentScreen = INTERMEDIATE_SCREEN;
  } else if (currentScreen === INTERMEDIATE_SCREEN) {
    currentScreen = GAMEOVER_SCREEN;
  } else if (currentScreen === GAMEOVER_SCREEN) {
    currentScreen = WELCOME_SCREEN;
  }
}

/*
to do list:
*maybe insert image for background
*game is lost, if appa falls to fast into the water
*if game is lost, game over screen
*edit text on intro screen, make it look nice
*mountain range in the background
*make appa fall
*make appa rise with space bar
*make appa drown (game over)
*center game over text
*drowning appa on the last screen
    >>first his face is in close up
    >>then he gets smaller until you can't see him
*design appa
*animation, if that one doesn't work out, change the
 welcome screen
*/
