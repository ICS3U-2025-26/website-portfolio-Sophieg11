// This setup function is called once when the program starts.
function setup() {
  createCanvas(400, 400); // Create a canvas of width 400 pixels and height 400 pixels.
}

// The draw fucntion runs 60 times per second
function draw() {
  background(220); // clears the screen with a light grey background 

  //Draw a red circle
  fill(255,0,0);
  ellipse(200,200,50,50);

  //Draw a blue rectangle
  fill(0,0,255);
  rect(mouseX-15,mouseY-15,30); // follows mouse, subtracting 15 makes it centred

}