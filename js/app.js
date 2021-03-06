import Game from './Game';
import StartMessage from './StartMessage';
import EndMessage from './EndMessage';
import GameBar from './GameBar';
import {bgColor} from './Helpers';

(() => {
  // Begin stats
  let stats = new Stats();
  stats.showPanel( 0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // console.log(stats);
  let dom = stats.domElement;
  dom.setAttribute('id', 'statsDiv');
  $(dom).css('display', 'none');
  document.body.appendChild( dom );

  // Begin audio
  let background = new Howl({
    src: ['audio/riley.mp3'],
    autoplay: true,
    loop: true,
    volume: 1,
    onend: function() {

    }
  });

  // Begin render
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

  let gameBar = new GameBar();
  let g = new Game(stage, gameBar);

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
          g = new Game(stage, gameBar);
          end = null;
          restart = false;
        }
      }

      renderer.render(stage);
      stats.end();
  }

  render();

  $('body').keypress(function( event ) {
    if ( event.key === 't' ) {
      // T
      $('#statsDiv').toggle();
    } else if (event.key === 'r') {
      // R
      restartGame();
    } else if (event.key === 'm') {
      // M
      if (background.volume() === 0.0)
        background.volume(1.0);
      else
        background.volume(0.0);
    }
  });
})();
