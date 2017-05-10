var type = "WebGL"

if(!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

var width = 512;
var height = 512;
var numDots = 20;

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
    Graphics = PIXI.Graphics;

//Create a Pixi stage and renderer and add the renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(width, height, 
        {antialias: false, transparent: false, resolution: 1});
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0xffffff;
document.body.appendChild(renderer.view);

var dots = [];
setup();

function setup() {
  console.log("setup"); 
  //Create the sprites
    // cat = new Sprite(resources["images/cat.png"].texture),
    //     blob = new Sprite(resources["images/blob.png"].texture),
    //     explorer = new Sprite(resources["images/explorer.png"].texture);

    for (var i = 0; i < numDots; i++) {
        var d = new Graphics();
        d.beginFill(0x9966FF);
        d.drawCircle(0, 0, 15);
        d.endFill();
        d.x = Math.random() * window.innerWidth;
        d.y = Math.random() * window.innerHeight;
        d.vx = Math.random() * 1;
        d.vy = Math.random() * 1;
        dots.push(d);
        stage.addChild(d);
    }

    //Start the game loop
    gameLoop();
}

function gameLoop(){
  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);
  
  // Move the dots
  for (var i = 0; i < numDots; i++) {
    dots[i].x += dots[i].vx;
    dots[i].y += dots[i].vy;
  }
  
  //Render the stage
  renderer.render(stage);
}

