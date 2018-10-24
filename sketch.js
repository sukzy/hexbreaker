/*
 * Zul Hilmi
 * github.com/hilmizul
 * twitter.com/hilmi_zul
 * 22 Oktober 2018
 *
 * inspired by Yining Shi. Thanks :D
 */
var paddle;
var ball;
var bricks = [];
var brick;

var skor = 0;
var ding, fail, jump, edges, shrink;
var gamePaused = false;
var gameEnd = false;
let timer = 60;

function preload() {
	ding = loadSound("assets/ding.mp3");
	fail = loadSound("assets/fail.mp3");
	edges = loadSound("assets/edges.mp3");
	jump = loadSound("assets/jump.mp3");
	shrink = loadSound("assets/shrink.mp3");
	gameover = loadSound("assets/gameover.mp3");
	win = loadSound("assets/win.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	paddle = new Paddle();
	ball = new Ball();
	for (let i = 0; i < 20; i++) {
		bricks.push(new Brick());
	}
}

function draw() {
	background(200);

	paddle.show();
	paddle.move(15);
	paddle.checkEdges();

	ball.show();
	ball.update();
	ball.checkEdges(paddle);
	ball.hitPaddle(paddle);

	for (var j = 0; j < bricks.length; j++) {
		if (ball.hitBrick(bricks[j])) {
			if (bricks[j].s > 30) {
				shrink.play();
				bricks[j].s = bricks[j].s / 2;
				ball.moveY *= -1;
			} else {
				ding.play();
				bricks.splice(j, 1);
				skor++;
				paddle.paddleWidth += 10;
			}
		}
	}
	for (var index = 0; index < bricks.length; index++) {
		bricks[index].show();
	}

	// LABEL SKOR
	push();
	fill(50, 50, 250, 150);
	noStroke();
	textSize(100);
	textAlign(CENTER);
	text(skor, 70, 100);
	pop();

	// BRICKS HABIS SEBELUM WAKTU HABIS
	// A.K.A MENANG :D
	if (bricks.length == 0) {
		let hiSkor = skor;
		push();
		fill(250, 50, 100, 150);
		textSize(100);
		textAlign(CENTER);
		text("YEY MENANG 😄", width / 2, height / 2);
		win.play();
		pop();
		gameEnd = true;
	}

	//  LABEL REHAT
	if (gamePaused) {
		push();
		fill(250, 50, 100, 150);
		textSize(100);
		textAlign(CENTER);
		text("BENTAR... 🙄", width / 2, height / 2);
		pop();
	}

	// HABIS PADDLE, GAME BERAKHIR
	if (gameEnd) {
		noLoop();
	}
	if (paddle.paddleWidth == 0) {
		gameover.play();
		push();
		fill(250, 50, 100, 150);
		textSize(100);
		textAlign(CENTER);
		text("YAH KALAH 😭", width / 2, height / 2);
		pop();
		noLoop();
	}


	// TIMER
	if (frameCount % 60 == 0 && timer > 0) {
		timer--;
	}
	if (timer == 0) {
		gameover.play();
		push();
		fill(250, 50, 100, 150);
		textSize(100);
		textAlign(CENTER);
		text("YAAH WAKTUNYA ABIS 😭", width / 2, height / 2);
		pop();
		noLoop();
	}
	push();
	fill(250, 50, 100, 150);
	textSize(100);
	textAlign(CENTER);
	text(timer, width - 70, 100);
	pop();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		paddle.moveLeft = true;
	} else if (keyCode === RIGHT_ARROW) {
		paddle.moveRight = true;
	} else if (keyCode === ESCAPE) {
		gamePaused = true;
		noLoop();
	} else if (keyCode === RETURN) {
		gamePaused = false;
		gameEnd = false;
		loop();
	}
}

function keyReleased() {
	paddle.moveRight = false;
	paddle.moveLeft = false;
}