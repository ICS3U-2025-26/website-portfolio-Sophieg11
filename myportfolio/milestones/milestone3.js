function setup(){
// Creates a canvas that is 400 by 400
createCanvas(400,400);
translate(width/2,height/2);
fill(255,0,0);
textAlign(CENTER,CENTER);


for(let i = 0; i < 360; i+= 10) {
    rotate(radians(10));
    text("Fly, You Fools!",150,0);
}
}