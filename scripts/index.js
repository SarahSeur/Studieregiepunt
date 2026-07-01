const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

const tileSize = 64;
const mapWidth = 70;
const walls = [];
const collisionGrid = [];

for (let i = 0; i < collisions.length; i += mapWidth) {
  collisionGrid.push(collisions.slice(i, i + mapWidth));
}

collisionGrid.forEach((row, y) => {
  row.forEach((tile, x) => {
    if (tile === 2049) {
      walls.push({
        x: x * tileSize,
        y: y * tileSize - (tileSize/2),
        width: tileSize,
        height: tileSize
      });
    }
  });
});

const image = new Image();
image.src = './images/map.png'

const playerSprites = {
  idle: new Image(),
  up: new Image(),
  down: new Image(),
  left: new Image(),
  right: new Image()
};

playerSprites.idle.src = './images/florist-idle.png';
playerSprites.up.src = './images/florist-up.png';
playerSprites.down.src = './images/florist-down.png';
playerSprites.left.src = './images/florist-left.png';
playerSprites.right.src = './images/florist-right.png';

let currentDirection = 'idle';
let cameraX = -2100;
let cameraY = -1600;
let animationFrame = 0;
let frameCounter = 0;

const spriteFrames = {
  idle: 2,
  up: 2,
  down: 2,
  left: 4,
  right: 4
};

const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

const speed = 1.5;

const playerBox = {
  x: canvas.width / 2 - 16,
  y: canvas.height / 2 - 32,
  width: 32,
  height: 32
};

const isColliding = () => {
  return walls.some(w => {
    return (
      playerBox.x < w.x + cameraX + w.width &&
      playerBox.x + playerBox.width > w.x + cameraX &&
      playerBox.y < w.y + cameraY + w.height &&
      playerBox.y + playerBox.height > w.y + cameraY
    );
  });
};

const animate = () => {
  requestAnimationFrame(animate);

  let newDirection = currentDirection;

  if (keys.w) {
    cameraY += speed;
    if (isColliding()) cameraY -= speed;
    else newDirection = 'up';
  } else if (keys.s) {
    cameraY -= speed;
    if (isColliding()) cameraY += speed;
    else newDirection = 'down';
  } else if (keys.a) {
    cameraX += speed;
    if (isColliding()) cameraX -= speed;
    else newDirection = 'left';
  } else if (keys.d) {
    cameraX -= speed;
    if (isColliding()) cameraX += speed;
    else newDirection = 'right';
  } else {
    newDirection = 'idle';
  }

  if (newDirection !== currentDirection) {
    animationFrame = 0;
    currentDirection = newDirection;
  }

  frameCounter++;
  const frameDelay = currentDirection === 'idle' ? 80 : 40;
  if (frameCounter > frameDelay) {
    frameCounter = 0;
    animationFrame = (animationFrame + 1) % spriteFrames[currentDirection];
  }

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  canvasContext.drawImage(image, cameraX, cameraY);

  const currentSprite = playerSprites[currentDirection];
  const frameWidth = currentSprite.width / spriteFrames[currentDirection];
   
  canvasContext.drawImage(
    currentSprite,
    animationFrame * frameWidth,
    0,
    frameWidth,
    currentSprite.height,
    canvas.width / 2 - frameWidth / 2,
    canvas.height / 2 - currentSprite.height / 2,
    frameWidth,
    currentSprite.height
  );
};
animate()