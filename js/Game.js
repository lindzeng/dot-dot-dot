import Dot from './Dot'
import Wall from './Wall'
import {bgColor, dotColors, numDots} from './Helpers';

class Game {
  constructor(stage,b, g) {
    this.stage = stage;
    this.gameBar = g;
    this.stage.interactive = true;
    this.stage.buttonMode = true;
    this.stage.on('pointerdown', this.onDragStart.bind(this))
         .on('pointerup', this.onDragEnd.bind(this))
         .on('pointerupoutside', this.onDragEnd.bind(this))
         .on('pointermove', this.onDragMove.bind(this));
    this.b = b;

    this.dots = [];
    this.walls = [];

    this.lineDots = [];
    this.lineColor = 0xffffff;
    this.lineGraphics = new PIXI.Graphics();

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
    // Render dot graphics
    for (let i = 0; i < this.numDots; i++) {
      let d = this.dots[i].getGraphics()[0];

      // Detect collisions
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

    }

    // Render line graphics
    this.stage.removeChild(this.lineGraphics);
    this.lineGraphics = new PIXI.Graphics();
    this.lineGraphics.lineStyle(.5, 0x000000);
    for (let i = 0; i < this.lineDots.length - 1; i++) {
        this.lineGraphics.moveTo(this.lineDots[i].d.x, this.lineDots[i].d.y);
        this.lineGraphics.lineTo(this.lineDots[i+1].d.x, this.lineDots[i+1].d.y);
    }
    this.lineGraphics.endFill();
    this.stage.addChild(this.lineGraphics);

    if (this.dragging) {
      this.stage.removeChild(this.dragLine);
      this.dragLine = new PIXI.Graphics();
      this.dragLine.lineStyle(.5, 0x000000);
      this.dragLine.moveTo(this.lineDots[this.lineDots.length-1].d.x, this.lineDots[this.lineDots.length-1].d.y);
      this.dragLine.lineTo(this.pos.x, this.pos.y);
      this.stage.addChild(this.dragLine);
    } else {
      this.stage.removeChild(this.dragLine);
    }

    this.gameBar.setPercentRemaining(this.lengthRemaining);
  }

  onDragStart(event) {
      this.lineDots = [];
      this.dragging = true;
      this.pos = event.data.getLocalPosition(this.stage);
      let start = this.findDot(this.pos);
      if (start) {
        this.lineDots.push(start);
        this.lineColor = start.color;
      }
  }

  onDragEnd() {
      this.dragging = false;
      if (this.lineDots.length > 1) {
        this.lineDots.forEach(d => d.kill());
      }
      this.lineDots = [];
  }

  onDragMove(event) {
      if (this.dragging) {
          this.pos = event.data.getLocalPosition(this.stage);
          let mid = this.findDot(this.pos);
          if (mid !== undefined) {
              if (mid.color === this.lineColor) {
                  let dist = (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x)*(mid.d.x - this.lineDots[this.lineDots.length - 1].d.x)
                             + (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y)*(mid.d.y - this.lineDots[this.lineDots.length - 1].d.y);
                  this.lengthRemaining -= Math.ceil(0.05 * Math.sqrt(dist));
                  console.log(this.lengthRemaining);
                  this.lineDots.push(mid);
              }
          }
      }
  }

  findDot(pos) {
      for (let i = 0; i < this.numDots; i++) {
          let snapPos = { x:this.dots[i].d.x, y:this.dots[i].d.y };
          let rad = this.dots[i].rad;
          let dist = (pos.x-snapPos.x)*(pos.x-snapPos.x) +
                     (pos.y-snapPos.y)*(pos.y-snapPos.y);
          if (dist <= rad*rad) {
              if (this.dots[i] !== this.lineDots[this.lineDots.length - 1]) {
                   return this.dots[i];
              }
          }
      }
      return undefined;
  }
}

export default Game;
