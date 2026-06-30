const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

const image = new Image();
image.src = '/images/map.png'

const player = new Image();
player.src = '/images/florist-idle.png'

let cameraX = -2100;
let cameraY = -1600;

const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

const speed = 2;

const animate = () => {
  requestAnimationFrame(animate);

  if (keys.w) cameraY += speed;
  if (keys.s) cameraY -= speed;
  if (keys.a) cameraX += speed;
  if (keys.d) cameraX -= speed;

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  canvasContext.drawImage(image, cameraX, cameraY);

  canvasContext.drawImage(
    player,
    0,
    0,
    player.width / 2,
    player.height,
    canvas.width / 2 - (player.width / 2) / 2,
    canvas.height / 2 -player.width / 2,
    player.width / 2,
    player.height
  );
};
animate()