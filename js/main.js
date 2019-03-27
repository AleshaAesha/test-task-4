'use strict'

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "img/bird.png";
bg.src = "img/background-day.png";
fg.src = "img/base.png";
pipeUp.src = "img/pipe-green.png";
pipeDown.src = "img/pipe-green-down.png";

var gap = 90;

//pipes

var pipe = [];

pipe[0] = {
	x : canvas.wigth,
	y : 0
}



//click
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 20;
}



//bird position

var xPos = 10;
var yPos = 150;
var move = 1;


function draw() {
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y);
	// ctx.drawImage(pipeUp, 100, 0 pipeDown.height + gap);

	pipe[i].x--;

	if(pipe[i].x == 125) {
		pipe.push({
			x : cvs.wigth,
			y : Math.floor(Math.random()* pipeDown.height) -
			pipeDown.height
			});
		}

		if(xPos + bird.wigth >= pipe[i].x
			&& xPos <= pipe[i].x + pipeDown.wigth
			&& (yPos <= pipe[i].y + pipeDown.height
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
					|| yPos + bird.height >= canvas.height - fg.height) {
			location.reload();
		}
	}

		
	

	ctx.drawImage(fg, 0, canvas.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += move;
	requestAnimationFrame(draw);
}

pipeDown.onload = draw;