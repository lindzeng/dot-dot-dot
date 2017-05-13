import Dot from './Dot'
import Wall from './Wall'
import {bgColor, dotColors, numDots, distMult, pathBonusLength} from './Helpers';

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
    this.isPolygon = false;

    this.numDots = 25;
    this.dotColors = dotColors;

    this.score = 0;
    this.scoreMultiplier = 1;

    this.dragLengthRemaining = 100;
    this.tempLengthRemaining = 100;
    this.lengthRemaining = 100;
    this.prevDist = 0;

    this.initWalls();
    this.initDots();
  }

  getScore() {
    return this.score;
  }

  killAll() {
      this.dots.forEach(d => d.kill());
  }

  initDots() {
    // distribute dots in a grid to ensure no overlap
    let dim = Math.floor(Math.sqrt(this.numDots));
    let countWidth = Math.floor((window.innerWidth - 50)/(dim+3));
    let countHeight = Math.floor((window.innerHeight - 50)/(dim+3));

    for (let i = 50; i < window.innerWidth-50; i+=countWidth) {
      for (let j = 50; j < window.innerHeight-50; j+=countHeight) {
        // always guarantees that two dots will be made
        if ((i == 50 && j == 50) || (i == 50 && j == 50+countHeight)) {
          let d1 = new Dot(this.dotColors[Math.floor(Math.random() * this.dotColors.length)], [i, j], Math.random()*20+15);
          this.dots.push(d1);
          d1.getGraphics().forEach(e => this.stage.addChild(e));
        }
        else{
          let r = Math.random();
          if (r >= 0.5) {
            let d = new Dot(this.dotColors[Math.floor(Math.random() * this.dotColors.length)], [i, j], Math.random()*20+15);
            this.dots.push(d);
            d.getGraphics().forEach(e => this.stage.addChild(e));
          }
        }
        
        

      }
    }
    console.log(this.dots);
    /*for (let i = 0; i < this.numDots; i++) {
      let d = new Dot(this.dotColors[Math.floor(Math.random() * this.dotColors.length)]);
      this.dots.push(d);
      d.getGraphics().forEach(e => this.stage.addChild(e));
    } */
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
    this.renderDots();

    // Render line graphics
    this.renderLine();
    this.updateScoreMultiplier();

    this.renderDragLine();
  }

  checkEndGame() {
    // Check if # of dots of each color are all 1 or 0
    let colorCount = [];
    for (let i = 0; i < dotColors.length; i++) {
      colorCount.push(0);
    }

    this.dots.forEach((d) => {
      let cIdx = dotColors.indexOf(d.color);
      colorCount[cIdx]++;
    });

    // console.log(this.dots);
    // console.log(colorCount);

    let counter = 0;
    colorCount.forEach((e) => {
      if (e <= 1) counter++;
    });

    if (counter === dotColors.length) return true;

    // OR no line left
    if (this.lengthRemaining <= 0) return true;

    // OR all dots killed
    if (this.numDots === 0) return true;

    return false;
  }

  getColorIdx(color) {
      for (let i = 0; i < this.dotColors.length; i++) {
          if (color === this.dotColors[i]) return i;
      }
      return -1;
  }

  renderDots() {
    this.dots.forEach((d, i) => {
      let dot = d.getGraphics()[0];

      for (let j = 0; j < this.walls.length; j++) {
        this.b.hit(dot, this.walls[j].getGraphics(), true, true);
      }

      for (let j = 0; j < this.numDots; j++) {
        if (i === j) continue;
        //console.log(this.dots[j].getGraphics()[0])
        this.b.hit(dot, this.dots[j].getGraphics()[0], true, true);
      }

      d.step();

      if (d.dead) {
        d.getGraphics().forEach(e => this.stage.removeChild(e));
        this.dots.splice(i, 1);
        this.numDots -= 1;
      }

    });
  }

  renderLine() {
    this.stage.removeChild(this.lineGraphics);
    this.lineGraphics = new PIXI.Graphics();
    this.lineGraphics.lineStyle(.5, 0x000000);
    for (let i = 0; i < this.lineDots.length - 1; i++) {
        this.lineGraphics.moveTo(this.lineDots[i].d.x, this.lineDots[i].d.y);
        this.lineGraphics.lineTo(this.lineDots[i+1].d.x, this.lineDots[i+1].d.y);
    }
    this.lineGraphics.endFill();
    this.stage.addChild(this.lineGraphics);
  }

  renderDragLine() {
    if (this.dragging) {
      this.stage.removeChild(this.dragLine);
      this.dragLine = new PIXI.Graphics();
      this.dragLine.lineStyle(.5, 0x000000);
      this.dragLine.moveTo(this.lineDots[this.lineDots.length-1].d.x, this.lineDots[this.lineDots.length-1].d.y);
      this.dragLine.lineTo(this.pos.x, this.pos.y);
      this.stage.addChild(this.dragLine);
      this.gameBar.setPercentRemaining(this.dragLengthRemaining);
    } else {
      this.stage.removeChild(this.dragLine);
      this.gameBar.setPercentRemaining(this.tempLengthRemaining);
    }
  }

  updateScoreMultiplier() {
    if (this.lineDots.length >= 1) {
      let frac = this.lineDots.length/pathBonusLength;
      this.scoreMultiplier = 1 + frac*2;
      this.gameBar.fillBar(this.lineColor, frac*100.0);
    } else {
      this.scoreMultiplier = 1;
      this.gameBar.fillBar(this.lineColor, 0);
    }
  }

  onDragStart(event) {
      this.lineDots = [];
      this.dragging = true;
      this.isPolygon = false;
      this.pos = event.data.getLocalPosition(this.stage);
      let start = this.findDot(this.pos);
      if (start) {
        this.lineDots.push(start);
        this.lineColor = start.color;
      }
  }

  onDragEnd() {
      this.dragging = false;
      this.isPolygon = false;
      if (this.lineDots.length > 1) {
        let toAdd = 0;
        this.lineDots.forEach((d) => {
          toAdd += d.kill();
        });

        this.score += toAdd*this.scoreMultiplier;
        this.gameBar.setScore(this.score);
        this.lengthRemaining = this.tempLengthRemaining;
      }
      this.lineDots = [];
  }

  onDragMove(event) {
      if (this.dragging) {
          this.pos = event.data.getLocalPosition(this.stage);
          let dragDist = (this.pos.x - this.lineDots[this.lineDots.length - 1].d.x)*(this.pos.x - this.lineDots[this.lineDots.length - 1].d.x)
                        + (this.pos.y - this.lineDots[this.lineDots.length - 1].d.y)*(this.pos.y - this.lineDots[this.lineDots.length - 1].d.y);
          this.dragLengthRemaining = this.tempLengthRemaining - Math.floor(distMult * Math.sqrt(dragDist));
          let mid = this.findDot(this.pos);
          if (mid !== undefined) {
              // Connect dots of the same color
              if (mid.color === this.lineColor) {
                  // If going backward, remove line
                  if (mid === this.lineDots[this.lineDots.length - 2]) {
                      this.isPolygon = false;
                      this.lineDots.splice(this.lineDots.length - 1, 1);
                      this.tempLengthRemaining += this.prevDist;
                  } else {
                      // If polygon, can't connect
                      if (this.isPolygon) return;
                      // Connect to new dot or to first dot (creating polygon)
                      let idx = this.findLineDot(mid);
                      if (idx === 0 || idx === -1) {
                          if (idx === 0) this.isPolygon = true;
                          let dist = (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x)*(mid.d.x - this.lineDots[this.lineDots.length - 1].d.x)
                                     + (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y)*(mid.d.y - this.lineDots[this.lineDots.length - 1].d.y);
                          this.prevDist = Math.floor(distMult * Math.sqrt(dist));
                          this.tempLengthRemaining -= this.prevDist;
                          this.lineDots.push(mid);
                      }
                  }
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

  findLineDot(dot) {
      for (let i = 0; i < this.lineDots.length; i++) {
          if (this.lineDots[i] === dot) {
              return i;
          }
      }
      return -1;
  }
}

export default Game;
