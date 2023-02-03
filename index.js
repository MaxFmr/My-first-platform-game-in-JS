const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(ctx);
const gravity = 0.5;

class Player {
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.height = 100;
    this.width = 100;
  }

  draw() {
    ctx.fillStyle = 'red';

    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
  }
}

class Platform {
  constructor() {
    this.position = { x: 300, y: 100 };
    this.height = 20;
    this.width = 200;
  }
  draw() {
    ctx.fillStyle = 'blue';

    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
const platform = new Platform();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      platform.position.x -= 5;
    } else if (keys.left.pressed) {
      platform.position.x += 5;
    }
  }

  //platform detection

  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  )
    player.velocity.y = 0;
}
animate();

addEventListener('keydown', ({ key }) => {
  console.log(key);
  switch (key) {
    case 'ArrowLeft':
      console.log('l');
      keys.left.pressed = true;
      break;
    case 'ArrowRight':
      console.log('r');
      keys.right.pressed = true;
      break;
    case 'ArrowDown':
      console.log('D');
      break;
    case 'ArrowUp':
      console.log('u');
      player.velocity.y -= 30;
      break;
    case ' ':
      console.log('u');
      player.velocity.y -= 30;
      break;
  }
});
addEventListener('keyup', ({ key }) => {
  console.log(key);
  switch (key) {
    case 'ArrowLeft':
      console.log('l');
      keys.left.pressed = false;

      break;
    case 'ArrowRight':
      console.log('r');
      keys.right.pressed = false;

      break;
    case 'ArrowDown':
      console.log('D');
      break;
  }
});
