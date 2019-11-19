var startX = 0, startY = 0;
var rotX = 0, rotY = 0;
var w, h;

function setup() {
  responsiveCanvas();
  angleMode(DEGREES);

  start = createButton("RESET POSITION");
  start.mousePressed(startSet);
}

function draw() {
  background("#e3c9bc");
  noStroke();

  w = width;
  h = height;
  rotX = map(rotationX, -180, 180, -h/2.5, h/2.5);
  rotY = map(rotationY, -90, 90, -w/2.5, w/2.5);

  if (deviceOrientation==LANDSCAPE) {
    background("#e3c9bc");
    fill(0);
    textSize(w/20);
    textAlign(CENTER, CENTER);
    text("Turn your phone vertically.", w/2, h/2);
  }
  else {
    background(255);
    ellipseMode(CENTER);
    //iride
    push();
    fill("hsl(122, 63%, 23%)");
    stroke("hsl(122, 63%, 20%)");
    strokeWeight(w/35);
    ellipse(w/2 -startY -rotY, h/2 -startX -rotX, w*.4);
    pop();
    //pupilla
    fill(0);
    ellipse(w/2 -startY -rotY, h/2 -startX -rotX, w*.2);
    //riflessi
    fill(255, 255/2);
    ellipse(w*.44 -startY -rotY/2, h*.42 -startX -rotX/2, w*.1);
    fill(255, 255/4);
    ellipse(w*.4 -startY -rotY/2, h*.5 -startX -rotX/2, w*.05);
    //rosso
    push();
    noFill();
    strokeWeight(w/6);
    stroke("#d4a8a5");
    ellipse(w/2, h/2, w);
    pop();

    if (touches.length==0) {
      beginShape();
      fill("#e3c9bc");
      vertex(0, 0);
      vertex(w, 0);
      vertex(w, h);
      vertex(0, h);
      beginContour();
      quadraticVertex(w*.23, h*.25, w*.04, h/2);
      quadraticVertex(w*.23, h*.75, w/2, h*.75);
      quadraticVertex(w*.8, h*.75, w*.96, h/2);
      quadraticVertex(w*.8, h*.25, w/2, h*.25);
      endContour();
      endShape(CLOSE);
    }
    else {
      fill("#e3c9bc")
      rect(0, 0, w, h);
      stroke(0, 255/2);
      strokeWeight(4);
      bezier(w*.04, h/2, w*.2, h*.65, w*.8, h*.65, w*.96, h/2);
    }
  }
}

function startSet() {
  startX = -rotX;
  startY = -rotY;
}

function responsiveCanvas() {
  if (windowWidth > windowHeight) {createCanvas(windowHeight, windowHeight)}
  else if (windowHeight > windowWidth) {createCanvas(windowWidth, windowWidth)}
}

function windowResized() {
  responsiveCanvas();
}

function touchEnded(event) {
  DeviceOrientationEvent.requestPermission()
}
