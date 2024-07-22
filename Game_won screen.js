/////adjustable canvas
//should I adjust all varibles so eversthing will be in
//proportion to canvas size?
const canvasWidth = 600;
const canvasHeight = 500;

//everthing my protag, appa needs
let appaX;
let appaY;
let appaWidth = canvasWidth * 0.167;
let appaHeight = canvasHeight * 0.1;
let appaScale;
let fallSpeed;
let jumpPower;

//background stuff
let mountainX;
let mountainY;

let waterHeight = canvasHeight * 0.2;
let waterLine = canvasHeight - waterHeight;

//let statusMessage = 0;

//Game controls and physics

// Return a value between min and max. minimum and maximum are included
// in the range.
/*function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} // ->basically makes the jump a random height, cuz that makes total
//   sense for appa */

//end game controls

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

/*
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
}*/

//Protagonist
function appa(appaX, appaY, appaWidth, appaHeight, appaScale. appaRotation) {
  push();
  translate(appaX, appaY);
  scale(appaScale);
  rotation(appaRotation);
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
function water(waterLine, waterHeight) {
  fill(0, 77, 128);
  rect(0, waterLine, canvasWidth, waterHeight);
}

background(179, 224, 255);
fill(0, 77, 128);
water(waterLine, canvasHeight * 3);
// Set statusMessage to 1 only at the end of the round, so that
// the initial screen shows the console log once.
statusMessage = 1;

appaScale = 4;
appa(canvasWidth / 2, waterLine - appaHeight, appaWidth, appaHeight, appaScale, appaRotation);
appaRotation = appaRotation + 0.01;

push();
translate(0, 0);
fill(255);
textAlign(CENTER, CENTER);
textSize(60);
text("YOU WON!", canvasWidth / 2, canvasHeight / 2);
textAlign(CENTER, CENTER);
textSize(20);
text("You landed Appa safely :D", canvasWidth / 2, waterLine);
pop();
