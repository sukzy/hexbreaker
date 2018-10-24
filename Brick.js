class Brick {
  constructor() {
    this.s = random(30, 70);
    this.x = random(0 + this.s, width);
    this.y = random(0 + this.s, height / 2);
    this.total = 4;
  }

  show() {
    push();
    fill(50, 90);
    stroke(0, 100);
    translate(this.x, this.y);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      var x = this.s * cos(angle);
      var y = this.s * sin(angle);

      var distance = dist(x, y, x * 2, y * 2);
      if (distance < this.s + this.s) {
        vertex(x, y);
      }
    }
    endShape(CLOSE);
    pop();
  }
}