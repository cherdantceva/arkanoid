export default class Ship {
  constructor({ x, y }) {
      this.x = x;
      this.y = y;
      console.log(y);
    this.speed = 20;
    this.worldCounter = 0;
    this.move = {
      direction: 'none',
    };
    this.container = {
      max: 1655,
      min: 25,
    };
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        this.move = {
          direction: 'right',
        };
      } else if (e.key === 'ArrowLeft') {
        this.move = {
          direction: 'left',
        };
      }
    });
    document.addEventListener('keyup', e => {
      this.move = {
        direction: 'none',
      };
    });
  }

  update() {
    if (this.move.direction === 'left' && this.x >= this.container.min) {
      this.x -= this.speed;
    } else if (this.move.direction === 'right' && this.x <= this.container.max) {
      this.x += this.speed;
    }
  }
}
