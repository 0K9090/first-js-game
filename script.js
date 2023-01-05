var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var P1YPos = 0;
var P2YPos = 0;
var P1Score = 0;
var P2Score = 0;
var ball = {
  x: 0.0,
  y: 0.0,
  direction: -90,
  speed: 5,
};
function drawScreen() {
  context.fillStyle = "black";
  context.font = "70px Arial";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "white";
  context.lineWidth = 5;
  context.strokeRect(0, 0, canvas.width, canvas.height); // for BLACK background
  context.beginPath();
  context.setLineDash([9, 15]);
  context.moveTo(512, 0);
  context.lineTo(512, 512);
  context.stroke();
  context.setLineDash([]);
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(30, P1YPos + 220);
  context.lineTo(30, P1YPos + 290);
  context.stroke();
  context.beginPath();
  context.moveTo(994, P2YPos + 220);
  context.lineTo(994, P2YPos + 290);
  context.stroke();
  context.fillStyle = "white";
  context.fillRect(ball.x + 507, ball.y + 251, 10, 10);
  context.fillText(P1Score, 450, 80);
  context.fillText(P2Score, 534, 80);
}
function reflect() {
  // function to "reflect" the ball direction
  ball.direction += 180;
  var i = 0 - ball.direction;
  if (i > 180) {
    i -= 360;
  } else if (i < -180) {
    i += 360;
  }
  ball.direction = i;
}
function logic() {
  // Check if the ball touched the left paddle
  if (
    ball.x + 507 > 29 &&
    ball.x + 507 < 41 &&
    ball.y + 251 > P1YPos + 209 &&
    ball.y + 251 < P1YPos + 291
  ) {
    ball.direction =
      (Math.atan2(P1YPos - ball.y, 30 - (ball.x + 507)) * 180) / Math.PI - 90;
    ball.speed += 0.6;
    reflect();
  }
  // Check if the ball touched the right paddle
  if (
    ball.x + 507 > 983 &&
    ball.x + 507 < 995 &&
    ball.y + 251 > P2YPos + 209 &&
    ball.y + 251 < P2YPos + 291
  ) {
    ball.direction =
      (Math.atan2(P2YPos - ball.y, 994 - (ball.x + 507)) * 180) / Math.PI - 90;
    ball.speed += 0.6;
    reflect();
  }
  // Check if the ball is on the top or bottom edge
  if (ball.y < -255 || ball.y > 255) {
    reflect();
  }
  // move ball in that direction
  ball.x += ball.speed * Math.sin((ball.direction * Math.PI) / 180);
  ball.y += ball.speed * Math.cos((ball.direction * Math.PI) / 180);
  if (ball.y > P2YPos) {
    P2YPos += 8;
    if (ball.y < P2YPos) {
      P2YPos = ball.y;
    }
  } else if (ball.y < P2YPos) {
    P2YPos -= 8;
    if (ball.y > P2YPos) {
      P2YPos = ball.y;
    }
  }
  if (ball.x < -512) {
    ball = {
      x: 0.0,
      y: 0.0,
      direction: 90,
      speed: 5,
    };
    P2Score++;
  } else if (ball.x > 512) {
    ball = {
      x: 0.0,
      y: 0.0,
      direction: -90,
      speed: 5,
    };
    P1Score++;
  }
}
function gameLoop() {
  window.onmousemove = function (e) {
    P1YPos = e.clientY - 320;
    if (P1YPos > 250) {
      P1YPos = 250;
    } else if (P1YPos < -250) {
      P1YPos = -250;
    }
  };
  logic();
  drawScreen();
  window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
