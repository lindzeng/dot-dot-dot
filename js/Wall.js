class Wall {
  constructor(color, rect, pos) {
    this.color = color ? color : 0xFFFFFF;

    this.wall = new PIXI.Graphics();
    this.wall.lineStyle(4, this.color, 1);
    this.wall.drawRect(rect[0], rect[1], rect[2], rect[3]);
    this.wall.endFill();
    this.wall.x =pos[0];
    this.wall.y = pos[1];

  }

  step() {
  }

  getGraphics() {
    return this.wall;
  }

}

export default Wall;
