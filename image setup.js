let appaPicture;

function preload() {
  appaPicture = loadImage("Appavectorart.png");
}

function draw() {
  background(220);
  image(appaPicture, mouseX, mouseY, 100, 50);
}
