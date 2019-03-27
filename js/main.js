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
var xPos = 150;


var move = 1;

//pipes

var pipe = [];

pipe[0] = {
	x : 200,
	y : 0
}



//click
document.addEventListener("keydown", moveUp);

function moveUp() {
	bY -= 20;
}



//bird position

var bX = 10;
var bY = 150;




function draw() {
	ctx.drawImage(bg, 0, 0);
	
	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y + pipeDown.height + gap);

		pipe[i].x--;
		if(pipe[i].x == 100) {
			pipe.push({
				x : canvas.width,
				y : Math.floor(Math.random()*pipeDown.height) - 
				pipeDown.height
			});
		}
	} 


		

	ctx.drawImage(fg, 0, bg.height - fg.height);
	ctx.drawImage(bird, bX, bY);

	bY += move;
	requestAnimationFrame(draw);
	

}

pipeDown.onload = draw;