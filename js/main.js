"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeDown = new Image();
const menu = new Image();
const gameOver = new Image();

//score images
const zero = new Image();
const one = new Image();
const two = new Image();
const three = new Image();
const four = new Image();
const five = new Image();
const six = new Image();
const seven = new Image();
const eight = new Image();
const nine = new Image();

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

bird.src = "img/bird.png";
bg.src = "img/background-day.png";
fg.src = "img/base.png";
pipeUp.src = "img/pipe-green.png";
pipeDown.src = "img/pipe-green-down.png";
menu.src = "img/message.png";
gameOver.src = "img/gameover.png";

var isStarted = false;
var pointsCount = 0;

const gap = 90;

const move = 1.5;

//pipes

const pipe = [];

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

  var paddingLeft = 130;
  const scoreNums = [...(pointsCount + "")];

  scoreNums.forEach(number => {
    drawScore(number, paddingLeft, 40);

    paddingLeft += 20;
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
  var paddingLeft = 130;

  finalScoreNums.forEach(number => {
    drawScore(number, paddingLeft, 200);

    paddingLeft += 20;
  });

  pointsCount = 0;
}

function drawScore(num, leftIndent, paddingTop) {
  if (num === "0") {
    ctx.drawImage(zero, leftIndent, paddingTop);
  } else if (num === "1") {
    ctx.drawImage(one, leftIndent, paddingTop);
  } else if (num === "2") {
    ctx.drawImage(two, leftIndent, paddingTop);
  } else if (num === "3") {
    ctx.drawImage(three, leftIndent, paddingTop);
  } else if (num === "4") {
    ctx.drawImage(four, leftIndent, paddingTop);
  } else if (num === "5") {
    ctx.drawImage(five, leftIndent, paddingTop);
  } else if (num === "6") {
    ctx.drawImage(six, leftIndent, paddingTop);
  } else if (num === "7") {
    ctx.drawImage(seven, leftIndent, paddingTop);
  } else if (num === "8") {
    ctx.drawImage(eight, leftIndent, paddingTop);
  } else if (num === "9") {
    ctx.drawImage(nine, leftIndent, paddingTop);
  }
}

function increaseCount() {
  pointsCount++;
}

pipeDown.onload = showMenu;

