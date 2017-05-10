var type = "WebGL"

if(!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

var width = 512;
var height = 512;
var numDots = 50;

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
    Graphics = PIXI.Graphics;

// Create a stage and renderer and add to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(width, height, 
        {antialias: false, transparent: false, resolution: 1});
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0xffffff;
document.body.appendChild(renderer.view);

// Bump object to detect collisions
b = new Bump(PIXI);

// Walls
var wallTop = new Graphics();
wallTop.lineStyle(4, 0xffffff, 1);
wallTop.beginFill(0x000000);
wallTop.drawRect(0, 0, window.innerWidth, 1);
wallTop.endFill();
wallTop.x = 0;
wallTop.y = 0;
stage.addChild(wallTop);

var wallLeft = new Graphics();
wallLeft.lineStyle(4, 0xffffff, 1);
wallLeft.beginFill(0x000000);
wallLeft.drawRect(0, 0, 1, window.innerHeight);
wallLeft.endFill();
wallLeft.x = 0;
wallLeft.y = 0;
stage.addChild(wallLeft);

var wallBottom = new Graphics();
wallBottom.lineStyle(4, 0xffffff, 1);
wallBottom.beginFill(0x000000);
wallBottom.drawRect(0, 0, window.innerWidth, 1);
wallBottom.endFill();
wallBottom.x = 0;
wallBottom.y = window.innerHeight;
stage.addChild(wallBottom);

var wallRight = new Graphics();
wallRight.lineStyle(4, 0xffffff, 1);
wallRight.beginFill(0x000000);
wallRight.drawRect(0, 0, 1, window.innerHeight);
wallRight.endFill();
wallRight.x = window.innerWidth;
wallRight.y = 0;
stage.addChild(wallRight);

// About the dots
var dots = [];
var dotColors = [0x9966FF, 0xFF0000, 0x00FF00, 0x0000FF];
setup();

function setup() {
  console.log("setup"); 

    // Create the dot sprites
    for (var i = 0; i < numDots; i++) {
        var d = new Graphics();
        d.beginFill(dotColors[Math.floor(Math.random() * dotColors.length)]);
        d.drawCircle(0, 0, 15);
        d.endFill();
        d.x = Math.random() * window.innerWidth;
        d.y = Math.random() * window.innerHeight;
        d.vx = Math.random() * 10;
        d.vy = Math.random() * 10;
        d.circular = true;
        dots.push(d);
        stage.addChild(d);
    }

    // Start the game loop
    gameLoop();
}

function gameLoop(){
    // Loop this function 60 times per second
    requestAnimationFrame(gameLoop);
  
    // Detect collision and move the dots
    for (var i = 0; i < numDots; i++) {
        b.hit(dots[i], wallTop, true, true);
        b.hit(dots[i], wallLeft, true, true);
        b.hit(dots[i], wallBottom, true, true);
        b.hit(dots[i], wallRight, true, true);
        for (var j = 0; j < numDots; j++) {
            if (i === j) continue;
            b.hit(dots[i], dots[j], true, true);
        }
        dots[i].x += dots[i].vx;
        dots[i].y += dots[i].vy;
    }

    // Render the stage
    renderer.render(stage);
}

