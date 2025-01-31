let score = 0;
let isJumping = false;
let gameInterval;
let obstacles = document.querySelectorAll('.obstacle');
let helloKitty = document.getElementById('helloKitty');
let scoreDisplay = document.getElementById('score');
let startBtn = document.getElementById('startBtn');

function jump() {
  if (isJumping) return;
  isJumping = true;

  helloKitty.style.transition = 'none'; // Remove transition for immediate jump effect
  helloKitty.style.bottom = '150px'; // Move Hello Kitty up

  setTimeout(() => {
    helloKitty.style.transition = 'bottom 0.3s';
    helloKitty.style.bottom = '0'; // Move Hello Kitty back down
    isJumping = false;
  }, 300);
}

function moveObstacles() {
  obstacles.forEach(obstacle => {
    let obstaclePosition = obstacle.getBoundingClientRect();
    let kittyPosition = helloKitty.getBoundingClientRect();

    if (obstaclePosition.left < kittyPosition.right &&
      obstaclePosition.right > kittyPosition.left &&
      obstaclePosition.top < kittyPosition.bottom) {
        alert('Game Over! Your score: ' + score);
        clearInterval(gameInterval);
        return;
    }

    if (obstaclePosition.left <= 0) {
      obstacle.style.left = '800px'; // Reset obstacle position to the right
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
    }
  });
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = 'Score: 0';
  obstacles.forEach(obstacle => {
    obstacle.style.animation = 'moveObstacle 2s linear infinite';
  });
  gameInterval = setInterval(moveObstacles, 20);
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
});
