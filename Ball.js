class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 50;
    this.moveX = 7;
    this.moveY = 7;
    this.vel = 0;
    if (random(1) < 0.5) {
      this.moveX *= -1;
    }
  }

  show() {
    push();
    fill(50, 50, 250, 100);
    // stroke(100);
    noStroke()
    ellipse(this.x, this.y, this.r, this.r);
    pop();
  }

  update() {
    // this.vel += this.gravity;
    this.x += this.moveX;
    this.y += this.moveY;
  }

  checkEdges(paddle) {
    if (this.x > width - this.r / 2 || this.x < 0 + this.r / 2) {
      edges.play();
      this.moveX *= -1;
    }
    if (this.y < 0 + this.r / 2) {
      edges.play();
      this.moveY *= -1;
    }
    if (this.y > height + this.r / 2) {
      fail.play();
      this.reset();
      // skor--;
      paddle.paddleWidth -= 10;
    }
  }

  hitPaddle(paddle) {
    // if (this.x > paddle.x - this.r && this.x + this.r / 2 < paddle.x + paddle.paddleWidth) {
    if (this.x > paddle.x - this.r && this.x < paddle.x + paddle.paddleWidth) {
      if (this.y > paddle.y - this.r / 2 && this.y < paddle.y + this.r) {
        jump.play();
        // let diff = this.y - (paddle.y - paddle.paddleHeight / 2);
        // let rad = radians(45);
        // let angle = map(diff, 0, paddle.paddleHeight, -rad, rad);
        // this.moveX = 5 * cos(angle);
        // this.moveY = 5 * sin(angle);
        // this.x = paddle.x + paddle.paddleWidth / 2 + this.r;
        this.moveY *= -1;
      }
    }
  }

  hitBrick(brick) {
    var distance = dist(this.x, this.y, brick.x, brick.y);
    if (distance < this.r / 2 + brick.s / 2) {
      return true;
    } else {
      return false;
    }
  }
}