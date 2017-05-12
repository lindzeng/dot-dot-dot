import Dot from './Dot'
import Wall from './Wall'
import {bgColor, dotColors, numDots} from './Helpers';

class Game {
  constructor(stage,b) {
    this.stage = stage;
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
    }

    // Render line graphics
    this.stage.removeChild(this.lineGraphics);
    this.lineGraphics = new PIXI.Graphics();
    // this.lineGraphics.lineStyle(5, this.lineColor, 1);
    this.lineGraphics.lineStyle(.5, 0x000000);
    for (let i = 0; i < this.lineDots.length - 1; i++) {
        this.lineGraphics.moveTo(this.lineDots[i].x, this.lineDots[i].y);
        this.lineGraphics.lineTo(this.lineDots[i+1].x, this.lineDots[i+1].y);
    }
    this.lineGraphics.endFill();
    // this.stage.addChildAt(this.lineGraphics, this.stage.children.length -1);
    this.stage.addChild(this.lineGraphics);
  }

  onDragStart(event) {
      this.lineDots = [];
      console.log("in drag start");
      this.dragging = true;
      let start = this.findDot(event.data.getLocalPosition(this.stage));
      this.lineDots.push(start.d);
      this.lineColor = start.color;
  }

  onDragEnd() {
      console.log("in drag end");
      this.dragging = false;
      console.log(this.lineDots);
  }

  onDragMove(event) {
      if (this.dragging) {
          console.log("in drag move");
          let pos = event.data.getLocalPosition(this.stage);
          let mid = this.findDot({ x: pos.x, y:pos.y });
          if (mid !== undefined) {
              if (mid.color === this.lineColor) {
                  this.lineDots.push(mid.d);
              }
          }
          let graphics = new PIXI.Graphics();
          graphics.lineStyle(1, 0x000000);
          let lineTrail = new PIXI.Container();
          lineTrail.addChild(graphics);
          graphics.drawCircle(0, 0, 7);

          TweenMax.set(lineTrail.position, { x:pos.x, y:pos.y });
          TweenMax.set(lineTrail, { alpha:0 });
          TweenMax.set(lineTrail.scale, { x:0.5, y:0.5 });

          TweenMax.to(lineTrail, 1, {  alpha:Math.random() * 0.5 + 0.5, ease:Expo.easeOut } );
          TweenMax.to(lineTrail.scale, 3, { x:0, y:0, ease:Expo.easeOut, delay:1.5, onComplete:this.remove.bind(this), onCompleteParams:[graphics, lineTrail]});

          this.stage.addChild(lineTrail);
      }
  }

  findDot(pos) {
      for (let i = 0; i < this.numDots; i++) {
          let snapPos = { x:this.dots[i].d.x, y:this.dots[i].d.y };
          let rad = this.dots[i].rad;
          var dist = (pos.x-snapPos.x)*(pos.x-snapPos.x) +
                     (pos.y-snapPos.y)*(pos.y-snapPos.y);
          if (dist <= rad*rad) {
              if (this.dots[i].d !== this.lineDots[this.lineDots.length - 1]) {
                   return this.dots[i];
              }
          }
      }
      return undefined;
  }

  remove(graphics, lineTrail) {
      if (graphics !== null && lineTrail !== null) lineTrail.removeChild(graphics);
      graphics.clear();
      graphics = null;
      this.stage.removeChild(lineTrail);
      lineTrail = null;
    }
}

export default Game;
