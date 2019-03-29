"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var menu = new Image();
var gameOver = new Image();

//score images
var zero = new Image();
var one = new Image();
var two = new Image();
var three = new Image();
var four = new Image();
var five = new Image();
var six = new Image();
var seven = new Image();
var eight = new Image();
var nine = new Image();

zero.src = "img/0.png";
one.src = "img/1.png";
two.src = "img/2.png";
three.src = "img/3.png";
four.src = "img/4.png";
five.src = "img/5.png";
six.src = "img/6.png";
seven.src = "img/7.png";
eight.src = "img/8.png";
nine.src = "img/9.png";

var isStarted = false;
var pointsCount = 0;

bird.src = "img/bird.png";
bg.src = "img/background-day.png";
fg.src = "img/base.png";
pipeUp.src = "img/pipe-green.png";
pipeDown.src = "img/pipe-green-down.png";
menu.src = "img/message.png";
gameOver.src = "img/gameover.png";

var gap = 90;

var move = 1.5;

//pipes

var pipe = [];

pipe[0] = {
  x: canvas.width,
  y: -100
};

//click

document.addEventListener("keydown", moveUp);
document.addEventListener("click", checkDrawing);

function moveUp() {
  bY -= 25;
}

//bird position

var bX = 10;
var bY = 150;

function draw() {
  isStarted = true;

  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y + pipeDown.height + gap);

    pipe[i].x--;
    if (pipe[i].x == 100) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
      });
    }

    if (pipe[i].x == 5) {
      increaseCount();
    }

    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeDown.width &&
        (bY <= pipe[i].y + pipeDown.height || bY + bird.height >= pipe[i].y + pipeDown.height + gap)) ||
      bY + bird.height >= canvas.height - fg.height
    ) {
      return endGame();
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, bX, bY);

  bY += move;

  var showScore = 130;
  const scoreNums = [...(pointsCount + "")];

  scoreNums.forEach(num => {
    if (num === "0") {
      ctx.drawImage(zero, showScore, 40);
    } else if (num === "1") {
      ctx.drawImage(one, showScore, 40);
    } else if (num === "2") {
      ctx.drawImage(two, showScore, 40);
    } else if (num === "3") {
      ctx.drawImage(three, showScore, 40);
    } else if (num === "4") {
      ctx.drawImage(four, showScore, 40);
    } else if (num === "5") {
      ctx.drawImage(five, showScore, 40);
    } else if (num === "6") {
      ctx.drawImage(six, showScore, 40);
    } else if (num === "7") {
      ctx.drawImage(seven, showScore, 40);
    } else if (num === "8") {
      ctx.drawImage(eight, showScore, 40);
    } else if (num === "9") {
      ctx.drawImage(nine, showScore, 40);
    }

    showScore += 20;

});


  requestAnimationFrame(draw);
}

function showMenu() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(menu, 48, 100);
}

function checkDrawing() {
  if (!isStarted) {
    draw();
  } else {
    location.reload();
  }
}

function endGame() {
  ctx.drawImage(bg, 0, 0);

  ctx.drawImage(gameOver, 48, 100);
  const finalScoreNums = [...(pointsCount + "")];
  var leftIndent = 130;

  finalScoreNums.forEach(num => {
    if (num === "0") {
      ctx.drawImage(zero, leftIndent, 200);
    } else if (num === "1") {
      ctx.drawImage(one, leftIndent, 200);
    } else if (num === "2") {
      ctx.drawImage(two, leftIndent, 200);
    } else if (num === "3") {
      ctx.drawImage(three, leftIndent, 200);
    } else if (num === "4") {
      ctx.drawImage(four, leftIndent, 200);
    } else if (num === "5") {
      ctx.drawImage(five, leftIndent, 200);
    } else if (num === "6") {
      ctx.drawImage(six, leftIndent, 200);
    } else if (num === "7") {
      ctx.drawImage(seven, leftIndent, 200);
    } else if (num === "8") {
      ctx.drawImage(eight, leftIndent, 200);
    } else if (num === "9") {
      ctx.drawImage(nine, leftIndent, 200);
    }

    leftIndent += 20;
  });

  pointsCount = 0;
}

function increaseCount() {
  pointsCount++;
}

pipeDown.onload = showMenu;
