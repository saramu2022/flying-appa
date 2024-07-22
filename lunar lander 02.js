/////Screens
const WELCOME_SCREEN = 0;
const INTERMEDIATE_SCREEN = 1;
const GAMEOVER_SCREEN = 2;
const GAME_WON = 1.5;

let currentScreen = WELCOME_SCREEN;

/////adjustable canvas
//should I adjust all varibles so eversthing will be in
//proportion to canvas size?
const canvasWidth = 600;
const canvasHeight = 500;

//everthing my protag, appa needs
let appaX;
let appaY;
let appaWidth = canvasHeight * 0.2;
let appaHeight = canvasHeight * 0.1;
let appaScale;
//let appaRotation;
let fallSpeed;
let jumpPower;

//background stuff
let mountainX;
let mountainY;

let waterHeight = canvasHeight * 0.2;
let waterLine = canvasHeight - waterHeight;

let statusMessage = 0;

//Game controls and physics

// Return a value between min and max. minimum and maximum are included
// in the range.
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} // ->basically makes the jump a random height, cuz that makes total
//   sense for appa

//end game controls

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

// Setup the variables of appas position to the starting point.
// This way we can play more than once.
function setupVars() {
  appaX = 150;
  appaY = 125;
  fallSpeed = 1;
  jumpPower = 20;
  // If the game is over, the statusMessage gets set to 1.
  // Thus, the console log is displayed only once until the next time,
  // the game is lost.
  if (statusMessage === 1) {
    console.log("Game Variables resetted.");
    statusMessage = 0;
  }
}

//Protagonist
function appa(appaX, appaY, appaWidth, appaHeight, appaScale, appaRotation) {
  push();
  translate(appaX, appaY);
  scale(appaScale);
  //rotation(appaRotation);
  rectMode(CENTER, CENTER);
  fill(255);
  noStroke();
  fill(0);
  rect(0, 0, appaWidth, appaHeight); //basically the hit box
  textAlign(CENTER);
  fill(255);
  textSize(15);
  text("Appa", 0, 0);
  pop();
} //close protagonist

/////Background
function water(waterLine, waterHeight) {
  fill(0, 77, 128);
  noStroke();
  rectMode(TOP);
  rect(0, waterLine, canvasWidth, waterHeight);
}

function mountain() {
  push();
  fill(77, 77, 77);
  stroke(77, 77, 77);
  rectMode(CENTER);
  rect(
    appaX,
    waterLine - canvasHeight/4,
    appaWidth,
    0.5 * canvasHeight
  );
  pop();
  push();
  translate(0, 0);
  fill(77, 77, 77);
  noStroke();
  triangle(-150, waterLine, appaX - appaWidth/2, appaY + appaHeight/2, appaX - appaWidth/2, waterLine);
  triangle(appaX + appaWidth/2, waterLine, appaX + appaWidth/2, appaY + appaHeight/2, 250, waterLine);
  pop();
} //close background

/////actual game
function draw() {
  if (currentScreen === WELCOME_SCREEN) {
    // Welcome screen

    background(179, 224, 255);
    water(waterLine, waterHeight);
    mountain();

    textSize(30);
    text(
      "Press space to start and to keep Appa in the air. Land him safely on the water!",
      250,
      50
    );

    setupVars();
    appa(appaX, appaY, appaWidth, appaHeight, 1, 0);
  } else if (currentScreen === INTERMEDIATE_SCREEN) {
    // Running actual game

    background(179, 224, 255);
    water(waterLine, waterHeight);

    if (fallSpeed > 1.8) {
    text("You're falling too fast!", 300, 150);
    }  

    // mountain();
    if (appaY >= waterLine) {
      currentScreen = GAMEOVER_SCREEN;
      if (fallSpeed > 1.9) {
        currentScreen = GAMEOVER_SCREEN;
        appaScale = 4;
      } else {
        currentScreen = GAME_WON;
        console.log("Congratulations, you won the game! :)");
      }
    }

    appa(appaX, appaY, appaWidth, appaHeight, 1);

    console.log(
      "AppaY: " +
        appaY +
        " | waterLine: " +
        waterLine +
        " | fallSpeed: " +
        fallSpeed
    );

    if (appaY < waterLine) {
      appaY = appaY + fallSpeed; //fall
    }

    // Limit Fallspeed
    if (fallSpeed < 2) {
      fallSpeed = fallSpeed * 1.03;
    }
    text("Screen two.", 20, 20);
  } else if (currentScreen === GAME_WON) {
    // game won
    background(179, 224, 255);
    fill(0, 77, 128);
    water(waterLine, canvasHeight * 0.5);
    // Set statusMessage to 1 only at the end of the round, so that
    // the initial screen shows the console log once.
    statusMessage = 1;

    appa(canvasWidth / 2, waterLine + appaWidth/2, appaWidth, appaHeight, 4);

    push();
    translate(0, 0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("CONGRATULATIONS, YOU WON!", canvasWidth / 2, canvasHeight / 2);
    //textAlign(CENTER, CENTER);
    textSize(20);
    text("You landed Appa safely :D", canvasWidth / 2, waterLine);
    pop();
  } else if (currentScreen === GAMEOVER_SCREEN) {
    // Game over
    background(179, 224, 255);
    water(waterLine, canvasHeight * 0.8);
    // Set statusMessage to 1 only at the end of the round, so that
    // the initial screen shows the console log once.
    statusMessage = 1;

    appa(
      canvasWidth / 2,
      canvasHeight / 2,
      appaWidth,
      appaHeight,
      appaScale
      //,appaRotation
    );
    if (appaScale > 0) {
      appaScale = appaScale - 0.1;
    }
    /*appaRotation = appaRotation + 0.1;*/ 
 
    //Appa is becoming smaller as he drowns

    push();
    translate(0, 0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("GAME OVER", canvasWidth / 2, canvasHeight/2);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("You lost.", canvasWidth / 2, canvasHeight - 0.35 * canvasHeight);
    text(
      "Appa is drowning :(",
      canvasWidth / 2,
      canvasHeight - 0.1 * canvasHeight
    );
    pop();
  }
}

/////Game controls
function gameControl() {
  if (currentScreen === WELCOME_SCREEN) {
    currentScreen = INTERMEDIATE_SCREEN;
  } else if (currentScreen === INTERMEDIATE_SCREEN) {
    // currentScreen = GAMEOVER_SCREEN;
    fallSpeed = 1;
    jumpPower = randomNumber(7, 75);
    if (appaY > 0) {
      appaY = appaY - jumpPower;
    }
  } else if (currentScreen === GAMEOVER_SCREEN) {
    currentScreen = WELCOME_SCREEN;
  }
}
/////Screen switching
function keyPressed() {
  gameControl();
}

function mouseClicked() {
  gameControl();
}

/*
to do list:
*fix waterHeight
*add some spacey game font
*smooth out animation, game controls
  >>remove that goddamn random function
*fix weird variables in the mountain
*maybe insert image for background, can I animate it with a loop?
--game is lost, if appa falls too fast into the water 
--if game is lost, game over screen
*edit text on intro screen, make it look nice
*mountain range in the background
--make appa fall
*make appa rise with space bar
--make appa drown (game over)
*center game over text
--drowning appa on the last screen
    >>first his face is in close up
    >>then he gets smaller until you can't see him
--design appa
*animation, if that one doesn't work out, change the
 welcome screen
*/
