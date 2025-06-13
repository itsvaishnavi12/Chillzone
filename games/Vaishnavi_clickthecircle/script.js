const boxes = [
  document.getElementById('box1'),
  document.getElementById('box2'),
  document.getElementById('box3'),
  document.getElementById('box4'),
  document.getElementById('box5'),
  document.getElementById('box6'),
  document.getElementById('box7'),
  document.getElementById('box8'),
  document.getElementById('box9')
];

let score = 0;
let timeLeft = 30;
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

const circle = document.createElement('div');
circle.classList.add('circle');

function moveCircle() {
  boxes.forEach(box => box.innerHTML = '');
  const randomIndex = Math.floor(Math.random() * boxes.length);
  boxes[randomIndex].appendChild(circle);
}

circle.addEventListener('click', function(){
  if (timeLeft > 0) {
    score++;
    scoreDisplay.textContent = score;
    moveCircle();
  }
});

function startTimer() {
  const timer = setInterval(function(){
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      boxes.forEach(box => box.innerHTML = '');
      alert("Time's up! Your final score is: " + score);
    }
  }, 1000);
}

moveCircle();
startTimer();