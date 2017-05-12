class Dot {
  constructor(color, pos, rad) {
    this.color = color ? color : 0xFF0000;
    this.rad = rad ? rad : Math.random()*20+15;
    let p = pos ? pos : [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

    this.scale = 0;

    this.d = new PIXI.Graphics();
    this.d.beginFill(this.color);
    this.d.drawCircle(0, 0, this.rad);
    this.d.endFill();
    this.d.x = p[0];
    this.d.y = p[1];
    this.d.vx = (Math.random() * 2) - 1;
    this.d.vy = (Math.random() * 2) - 1;
    this.d.scale.x = this.scale;
    this.d.scale.y = this.scale;
    this.d.circular = true;

    this.o = new PIXI.Graphics();
    this.o.lineStyle(.5, 0x000000);  // (thickness, color)
    this.o.drawCircle(0, 0, this.rad);
    this.o.endFill();
    this.o.x = p[0] - this.d.vx*2;
    this.o.y = p[1] - this.d.vy*2;
    this.o.scale.x = this.scale;
    this.o.scale.y = this.scale;
    this.o.circular = true;

    this.killed = false;
    this.dead = false;
    this.growing = true;
  }

  step() {
    if (this.dead) return;

    if (this.growing) {
      this.scale += .05;
      this.updateScales();

      if (this.scale > 1) {
        this.scale = 1;
        this.growing = false;
      }
    }

    this.d.x += this.d.vx;
    this.d.y += this.d.vy;

    this.o.x = this.d.x - this.d.vx*2;
    this.o.y = this.d.y - this.d.vy*2;

    if (this.killed) {
      this.scale -= .2;
      this.updateScales();
      if (this.scale < -.005) {
        this.scale = 0;
        this.dead = true;
      }
    }
  }

  updateScales() {
    this.d.scale.x = this.scale;
    this.d.scale.y = this.scale;

    this.o.scale.x = this.scale;
    this.o.scale.y = this.scale;
  }
  getGraphics() {
    return [this.d, this.o];
  }

  kill() {
    this.killed = true;
  }

}

export default Dot;
