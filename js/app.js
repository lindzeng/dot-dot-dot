import Game from './Game';
import StartMessage from './StartMessage';
import GameBar from './GameBar';
import {bgColor} from './Helpers';

(() => {

  let type = "WebGL";

  if(!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
  }

  // Create a stage and renderer and add to the DOM
  let stage = new PIXI.Container();
  let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {antialias: true, transparent: false, resolution: 1});
  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.autoResize = true;
  renderer.backgroundColor = bgColor;
  document.body.appendChild(renderer.view);

  let b = new Bump(PIXI);

  let gameBar = new GameBar();
  let g = new Game(stage, b, gameBar);

  let startGame = () => {
    gameBar.init();
    gameBar.fillBar('white', 0);
    gameBar.addScore(0);
    gameBar.setPercentRemaining(100);
  }
  let start = new StartMessage(startGame.bind(this));

  // let i = new Interface()

  let render = () => {
      requestAnimationFrame(render);
      g.step();
      renderer.render(stage);
  }

  render();
})();
