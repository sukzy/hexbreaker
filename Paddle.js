class Paddle {
  constructor() {
    this.paddleWidth = 150;
    this.paddleHeight = 30;
    this.x = width / 2;
    this.y = height - this.paddleHeight * 2;

    this.moveLeft = false;
    this.moveRight = false;
  }

  show() {
    fill(250, 50, 150, 150);
    // stroke(0, 100);
    // strokeWeight(2);
    noStroke();
    rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
  }

  move(step) {
    if (this.moveLeft) {
      this.x -= step;
    }
    if (this.moveRight) {
      this.x += step;
    }
  }

  checkEdges() {
    if (this.x > width - this.paddleWidth) {
      this.x = width - this.paddleWidth;
    }
    else if (this.x < 0 + this.paddleWidth - this.paddleWidth) {
      this.x = 0 + this.paddleWidth - this.paddleWidth;
    }
  }
}