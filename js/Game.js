import Dot from './Dot'
import Wall from './Wall'
import {bgColor, dotColors, numDots} from './Helpers';

class Game {
  constructor(stage,b) {
    this.stage = stage;
    this.b = b;

    this.dots = [];
    this.walls = [];

    this.numDots = numDots;
    this.dotColors = dotColors;

    this.score = 0;
    this.lengthRemaining = 100;

    this.initWalls();
    this.initDots();
  }

  initDots() {
    for (let i = 0; i < this.numDots; i++) {
      let d = new Dot(this.dotColors[Math.floor(Math.random() * this.dotColors.length)]);
      this.dots.push(d);
      d.getGraphics().forEach(e => this.stage.addChild(e));
    }
  }

  initWalls() {
    let wallColor = bgColor;

    let wallTop = new Wall(wallColor, [0, 0, window.innerWidth, 1], [0, 0]);
    this.stage.addChild(wallTop.getGraphics());

    let wallLeft = new Wall(wallColor, [0, 0, 1, window.innerHeight], [0, 0]);
    this.stage.addChild(wallLeft.getGraphics());

    let wallBottom = new Wall(wallColor, [0, 0, window.innerWidth, 1], [0, window.innerHeight-1]);
    this.stage.addChild(wallBottom.getGraphics());

    let wallRight = new Wall(wallColor, [0, 0, 1, window.innerHeight], [window.innerWidth-1, 0]);
    this.stage.addChild(wallRight.getGraphics());

    this.walls = [wallTop, wallLeft, wallBottom, wallRight];
  }

  step() {
    for (let i = 0; i < this.numDots; i++) {
      let d = this.dots[i].getGraphics()[0];

      for (let j = 0; j < this.walls.length; j++) {
        this.b.hit(d, this.walls[j].getGraphics(), true, true);
      }
      for (let j = 0; j < this.numDots; j++) {
        if (i === j) continue;
        this.b.hit(d, this.dots[j].getGraphics()[0], true, true);
      }
      this.dots[i].step();

      if (this.dots[i].dead) {
        this.dots[i].getGraphics().forEach(e => this.stage.removeChild(e));
      }

      if (Math.random() > .999) {
        this.dots[i].kill();
      }
    }
  }
}

export default Game;
