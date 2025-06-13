const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasSize = 400;
const rowCount = canvasSize / boxSize;

let snake = [{ x: 8 * boxSize, y: 8 * boxSize }];
let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * rowCount) * boxSize,
  y: Math.floor(Math.random() * rowCount) * boxSize
};

document.onkeydown = function(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
};

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }

 
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);


  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= boxSize;
  else if (direction === "UP") headY -= boxSize;
  else if (direction === "RIGHT") headX += boxSize;
  else if (direction === "DOWN") headY += boxSize;


  if (headX < 0 || headX >= canvasSize || headY < 0 || headY >= canvasSize) {
    alert("Game Over!");
    clearInterval(gameLoop);
    return;
  }


  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === headX && snake[i].y === headY) {
      alert("Game Over!");
      clearInterval(gameLoop);
      return;
    }
  }

  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);


  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * rowCount) * boxSize,
      y: Math.floor(Math.random() * rowCount) * boxSize
    };
  } else {
    snake.pop();
  }
}

const gameLoop = setInterval(drawGame, 200);
