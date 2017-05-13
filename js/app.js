import Game from './Game';
import StartMessage from './StartMessage';
import EndMessage from './EndMessage';
import GameBar from './GameBar';
import {bgColor} from './Helpers';

(() => {
  let stats = new Stats();
  stats.showPanel( 0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // console.log(stats);
  document.body.appendChild( stats.domElement );

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
    gameBar.setScore(0);
    gameBar.setPercentRemaining(100);
  }

  let restart = false;
  let end = null;
  let restartGame = () => {
    g.killAll();
    restart = true;
  }

  let start = new StartMessage(startGame.bind(this));

  let render = () => {
      requestAnimationFrame(render);
      stats.begin();
      g.step();
      if(g.checkEndGame()) {
        if (!end) {
          end = new EndMessage(g.getScore(), restartGame.bind(this));
        }
      }

      if (restart) {
        if (g.numDots == 0) {
          gameBar.restart();
          stage = new PIXI.Container();
          g = new Game(stage, b, gameBar);
          end = null;
          restart = false;
        }
      }

      renderer.render(stage);
      stats.end();
  }

  render();
})();
