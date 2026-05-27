// All of these statements set general settings that are consistent throughout levels

let state = "home";
let level = 1;

let player;
let crates = [];
let targets = [];
let walls = [];

let moves = 0;
let recommended = 0;
let stars = 0;

let t = 60;

// SETUP - creates the size of canvas and alignment for all text
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
}

// DRAW 
// Draws different screens based on what game state the game is currently in
function draw() {
  background(20, 40, 80);

  if (state === "home") home();
  if (state === "how") how();
  if (state === "game") game();
  if (state === "win") win();
}

// SCREENS
// This function draws the homescreen
function home() {
  textSize(30);
  fill(255);
  textSize(48);
  text("Blocked In", 300, 150);

  textSize(28);
  button("PLAY", 300, 300, );
  button("HOW", 300, 380);
}
// This function draws the how to play screen
function how() {
  textSize(16);
  fill(255);
  text(
    "Use arrow keys to move.\nPush crates onto matching coloured targets.\nOnly pushes count as moves.",
    300, 250
  );
  button("BACK", 300, 450);
}
// This function draws the screen that displays user's score after each level
function win() {
  fill(255);
  textSize(25);
  text("Level Complete", 300, 200);
  text("Stars: " + "⭐".repeat(stars), 300, 260);
// The above line uses the variable stars, the code that determines the amount of stars is down below.
  if (level < 3) button("NEXT", 300, 350);
  button("HOME", 300, 430);
}

// GAME
// This function draws the screen that is constant for the entire game, regardless of levels
function game() {
  
  // This draws the boundaries of the level
  for (let w of walls) rect(w.x*t, w.y*t, t, t);

  // This draws the target squares
  for (let tar of targets) {
    fill(tar.c);
    rect(tar.x*t, tar.y*t, t, t);
  }
// This draws the crates
  for (let c of crates) {
    fill(c.c);
    rect(c.x*t+10, c.y*t+10, t-20, t-20);
  }
// This draws the player
  fill(255,180,200);
  noStroke();
  ellipse(player.x*t+t/2, player.y*t+t/2, t*0.6);

  // These count moves and keeps track of recommended amount of moves. 
  fill(255);
  textSize(14);
  text("Moves: "+moves, 90, 20);
  text("Rec: "+recommended, 210, 20);

  button("RESTART", 500, 30);

  //checkWin is established down below
  checkWin();
}

//INPUT 
function keyPressed() {
  // This connects key pressed to player movement, when in game state
  if (state !== "game") return;

  let dx=0, dy=0;
  if (keyCode===LEFT_ARROW) dx=-1;
  if (keyCode===RIGHT_ARROW) dx=1;
  if (keyCode===UP_ARROW) dy=-1;
  if (keyCode===DOWN_ARROW) dy=1;

  move(dx,dy);
}

// This controls button usage and state switches 
function mousePressed() {
  if (state==="home") {
    if (over(300,300)) { level=1; loadLevel(); state="game"; }
    if (over(300,380)) state="how";
  }
  else if (state==="how") {
    if (over(300,450)) state="home";
  }
  else if (state==="win") {
    if (over(300,350) && level<3) { level++; loadLevel(); state="game"; }
    if (over(300,430)) state="home";
  }
  else if (state==="game") {
    if (over(500,30)) loadLevel();
  }
}

// MOVEMENT 
// This function is used to help define player movement and also set constraints for the player and crates
function move(dx,dy) {
  let nx = player.x+dx;
  let ny = player.y+dy;
// This uses the function hitWalls which is established below
  if (hitWall(nx,ny)) return;

  let crate = crateAt(nx,ny);
  if (crate) {
    let nx2 = crate.x+dx;
    let ny2 = crate.y+dy;
// It also uses crateAt which is also established below
    if (hitWall(nx2,ny2) || crateAt(nx2,ny2)) return;

    // This counts each push of a crate as a move
    crate.x = nx2;
    crate.y = ny2;
    moves++; 
  }

  player.x = nx;
  player.y = ny;
}
// This constrains users within wall boundaries
function hitWall(x,y){
  return walls.some(w=>w.x===x&&w.y===y);
}
// This allows users to push crates
function crateAt(x,y){
  return crates.find(c=>c.x===x&&c.y===y);
}

// WIN 
// This establishes when a level is over/ there is a crate on each target
function checkWin() {
  let done = true;

  for (let c of crates) {
    let match = targets.find(t=>t.x===c.x&&t.y===c.y&&t.c===c.c);
    if (!match) done=false;
  }
// This finds the amount of stars awareded based on move count
  if (done) {
    if (moves<=recommended) stars=3;
    else if (moves<=recommended+2) stars=2;
    else if (moves<=recommended+4) stars=1;
    else stars=0;

    state="win";
  }
}

// LEVELS 
// This loads all levels with general foundations, each individual level puts crates, targets and player in specific spots
function loadLevel() {
  crates=[]; targets=[]; walls=[];
  moves=0;

  // This creates level 1
  if (level===1) {
    recommended=2;
    player={x:2,y:2};

    walls.push({x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1});
    walls.push({x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5});
    walls.push({x:1,y:2},{x:1,y:3},{x:1,y:4});
    walls.push({x:5,y:2},{x:5,y:3},{x:5,y:4});

    crates.push({x:2,y:3,c:"blue"});
    crates.push({x:4,y:3,c:"lightblue"});

    targets.push({x:2,y:4,c:"blue"});
    targets.push({x:4,y:4,c:"lightblue"});
  }

// This creates level 2
if (level===2) {
  recommended=9;
  player={x:5,y:5};


  for (let x=0; x<10; x++){
    for (let y=0; y<10; y++){
      walls.push({x:x,y:y});
    }
  }

  let open = [
    {x:5,y:2},{x:5,y:3},{x:5,y:4},{x:5,y:5},{x:5,y:6},{x:5,y:7},{x:5,y:8},
    {x:2,y:5},{x:3,y:5},{x:4,y:5},{x:6,y:5},{x:7,y:5},{x:8,y:5}
  ];

  walls = walls.filter(w => 
    !open.some(o => o.x===w.x && o.y===w.y)
  );

  crates.push({x:5,y:5,c:"blue"});
  crates.push({x:5,y:4,c:"blue"});
  crates.push({x:4,y:5,c:"blue"});
  crates.push({x:6,y:5,c:"blue"});

  targets.push({x:5,y:2,c:"blue"});
  targets.push({x:5,y:8,c:"blue"});
  targets.push({x:2,y:5,c:"blue"});
  targets.push({x:8,y:5,c:"blue"});
}

// This creates level 3
 if (level === 3) {
  recommended = 12;

  walls = [];
  crates = [];
  targets = [];

//OUTER BORDER 
  for (let x = 1; x <= 8; x++) {
    walls.push({ x, y: 1 });
    walls.push({ x, y: 5 });
  }
  for (let y = 1; y <= 5; y++) {
    walls.push({ x: 1, y });
    walls.push({ x: 8, y });
  }

  walls.push({ x: 4, y: 1 });
  walls.push({ x: 4, y: 2 });
  walls.push({ x: 4, y: 4 });
  walls.push({ x: 4, y: 5 });



  crates.push({ x: 2, y: 3, c: "blue" });
  crates.push({ x: 7, y: 3, c: "lightblue" });


  targets.push({ x: 2, y: 4, c: "blue" });
  targets.push({ x: 7, y: 2, c: "lightblue" });

  player = { x: 3, y: 3 };
}
}

// HELPERS
// This creates the restart button
function button(txt,x,y){
  fill(200);
  rect(x-80,y-25,160,50);
  fill(0);
  text(txt,x,y);
}
// This makes buttons work
function over(x,y){
  return mouseX>x-80&&mouseX<x+80&&mouseY>y-25&&mouseY<y+25;
}