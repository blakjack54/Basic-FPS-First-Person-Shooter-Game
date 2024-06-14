const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  color: 'red',
  speed: 5
};

const bullets = [];

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  bullets.forEach((bullet, index) => {
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fillStyle = bullet.color;
    ctx.fill();
    ctx.closePath();

    // Remove bullets that go out of bounds
    if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
      bullets.splice(index, 1);
    }
  });

  requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    player.y -= player.speed;
  } else if (event.key === 's') {
    player.y += player.speed;
  } else if (event.key === 'a') {
    player.x -= player.speed;
  } else if (event.key === 'd') {
    player.x += player.speed;
  } else if (event.key === ' ') { // Spacebar to shoot
    const bullet = {
      x: player.x,
      y: player.y,
      radius: 3,
      color: 'yellow',
      dx: 10,
      dy: 0
    };
    bullets.push(bullet);
  }
});

updateGame();
