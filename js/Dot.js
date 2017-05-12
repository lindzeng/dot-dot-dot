class Dot {
  constructor(color, pos, rad) {
    this.color = color ? color : 0xFF0000;
    this.rad = rad ? rad : Math.random()*20+15;
    let p = pos ? pos : [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

    this.d = new PIXI.Graphics();
    this.d.beginFill(this.color);
    this.d.drawCircle(0, 0, this.rad);
    this.d.endFill();
    this.d.x = p[0];
    this.d.y = p[1];
    this.d.vx = (Math.random() * 2) - 1;
    this.d.vy = (Math.random() * 2) - 1;
    this.d.circular = true;

    this.o = new PIXI.Graphics();
    this.o.lineStyle(.5, 0x000000);  // (thickness, color)
    this.o.drawCircle(0, 0, this.rad);
    this.o.endFill();
    this.o.x = p[0] - this.d.vx*2;
    this.o.y = p[1] - this.d.vy*2;
    this.o.circular = true;
  }

  step() {
    this.d.x += this.d.vx;
    this.d.y += this.d.vy;

    this.o.x = this.d.x - this.d.vx*2;
    this.o.y = this.d.y - this.d.vy*2;
  }

  getGraphics() {
    return [this.d, this.o];
  }
}

export default Dot;
