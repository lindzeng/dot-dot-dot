var type = "WebGL"

if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}

PIXI.utils.sayHello(type);

var width = 512;
var height = 512;

//Create the renderer
var renderer = PIXI.autoDetectRenderer(width, height);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

// Detect whether to use canvas drawing API or WebGL
// Third options arguments {} is optional
renderer = PIXI.autoDetectRenderer(
    width, height,
    {antialias: false, transparent: false, resolution: 1}
);