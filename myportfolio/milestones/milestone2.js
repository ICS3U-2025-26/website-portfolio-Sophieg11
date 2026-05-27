let radius = 25; //Size of the ball
let x = 200; //Horizontal position of the ball
let y = 200; //Vertical position of the ball
let xSpeed = 5; //Horizontal velocity of the ball
let ySpeed = 4; //Vertical velocity of the ball

//use variables to set the R, G, B for the project
let r = 0;
let g = 240;
let b = 255;


function setup() {
    //auto creates width = 400, height = 400
    createCanvas(400,400);
}

//draw() function is called 60x per second
function draw() {
    background(40); //dark grey background

    //set the color, draw the circle
    fill(r,g,b);
    noStroke(); //removes the black outline
    ellipse(x,y,radius*2); //no height means it's the same as width -- same as "circle(x,y,radius*2);"
    
    x += xSpeed; //adds xSpeed to the x-coordinate of the ball
    y = y + ySpeed; //adds ySpeed to the y-coordinate of the ball

    //width & height constants are created automatically, so we can use them
    /* LOGIC:
        - if the x coordinate of the ball is greater than the width, then bounce back
        - but x > width doesn't bounce the ball early enough
            (the centre of the ball bounces off the wall rather than the edge of the ball)
        - which means the radius of the ball passes the right-boundary
        - we want to bounce 'radius' pixels earlier
        - so we check if x > width - radius
    */ //similar logic can be used for the left-boundary, and the y-values
    // use || for "OR" logic 
    if (x > width - radius || x < radius) { //if either the ball bounces off the left or right wall
        xSpeed *= -1; //change the sign of xSpeed
    }
    if (y > height - radius || y < radius) {
        ySpeed *= -1;
    }


    // //MANUAL CLICK DETECTION: Check if the mouse was pressed on the ball.
    // if (mouseIsPressed) {
    //     //finds the distance from the mouse click to the centre of the circle
    //     let d = dist(mouseX, mouseY, x, y);

    //     //if the distance from the mouse is less than the radius, we are inside the circle
    //     if (d < radius) {
    //         r = random(255);
    //         g = random(255);
    //         b = random(255);
    //     }
    // }
}

//This function is BUILT-IN to p5.js
//It only runs ONCE per click. 
function mousePressed() {
    if (mouseIsPressed) {
        //finds the distance from the mouse click to the centre of the circle
        let d = dist(mouseX, mouseY, x, y);

        //if the distance from the mouse is less than the radius, we are inside the circle
        if (d < radius) {
            r = random(255);
            g = random(255);
            b = random(255);
        }
    }
}


