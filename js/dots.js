// DO NOT USE
// DO NOT USE
// DO NOT USE
// DO NOT USE
// DO NOT USE


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
    Text = PIXI.Text;

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

// Starting message
var gameStart = false;
var about = new Text(
    "dot-dot-dot\na game by eric li, lindy zeng, and kaijia tian\ncos 426 spring 2017",
    {fontFamily: "Consolas", fontSize: 18, fill: "gray", align: "center"}
);
about.anchor.x = 0.5;
about.position.set(window.innerWidth/2, window.innerHeight/2 - 100);
var message = new Text(
  "click to start",
  {fontFamily: "Consolas", fontSize: 32, fill: "gray", align: "center"}
);
message.anchor.x = 0.5;
message.interactive = true;
message.mouseover = function() {
    message.alpha = 0.5;
}
message.mouseout = function() {
    message.alpha = 1;
}
message.click = function() {
    message = null;
    gameStart = true;
    for (var i = stage.children.length - 1; i >= 3; i--) {
        dots = [];
        stage.removeChild(stage.children[i]);
    };
    setup();
}
message.position.set(window.innerWidth/2, window.innerHeight/2);
stage.addChild(about, message);

// Draw lines
var dragLine = {
    graphics:new Graphics(),
    length:0,
    prevPos:{x:-1,y:-1}
};

function setup() {
  console.log("setup");
  console.log(gameStart);

    // Create the dot sprites
    for (var i = 0; i < numDots; i++) {
        var d = new Graphics();
        d.beginFill(dotColors[Math.floor(Math.random() * dotColors.length)]);
        d.drawCircle(0, 0, 15);
        d.endFill();
        d.r = 15;
        d.x = Math.random() * window.innerWidth;
        d.y = Math.random() * window.innerHeight;
        d.vx = Math.random() * 3;
        d.vy = Math.random() * 3;
        d.circular = true;

        if (gameStart) {
            d.interactive = true;
            d.buttonMode = true;
            d.on('pointerdown', onDragStart)
             .on('pointerup', onDragEnd)
             .on('pointerupoutside', onDragEnd)
             .on('pointermove', onDragMove);
         }

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

// Pointer events
function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;

    //dragLine.prevPos = { x: this.x, y: this.y };
    //dragLine.graphics = new Graphics();
    //stage.addChild(dragLine.graphics);
    //dragLine.graphics.lineStyle(5, 0xffd900, 1);
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    dragLine.graphics.endFill();
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        var snapPosition = snapTo(this, newPosition);
        if (snapPosition !== undefined) {
            dragLine.graphics.moveTo(dragLine.prevPos.x, dragLine.prevPos.y);
            dragLine.graphics.lineTo(snapPosition.x, snapPosition.y);
            dragLine.prevPos = newPosition;
        }
    }
}

function snapTo(dot, position) {
    for (var i = 0; i < numDots; i++) {
        if (dots[i] === dot) continue;
        var snapPosition = { x:dots[i].x, y:dots[i].y };
        var rad = dots[i].r;
        var dist = (position.x-snapPosition.x)*(position.x-snapPosition.x) +
                   (position.y-snapPosition.y)*(position.y-snapPosition.y)
        if (dist <= rad*rad) {
            return snapPosition;
        }
    }
    return undefined;
}
