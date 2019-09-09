import Model from './model';
import { SHIP_WIDTH, SHIP_HEIGHT } from '../defs';

export default class Ship extends Model {
  constructor({ x, y }) {
     super({ kind: 'ship' });
    this.x = x;
    this.y = y;
    this.x1 = x + SHIP_WIDTH;
    this.y1 = y + SHIP_HEIGHT;
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
    const collision = this.advantages.getByName('collision');

    const ball = collision.model.find(({ kind }) => kind === 'ball');

    this.x1 = this.x + SHIP_WIDTH;

    if (this.move.direction === 'left' && this.x >= this.container.min) {
      this.x -= this.speed;
    } else if (this.move.direction === 'right' && this.x <= this.container.max) {
      this.x += this.speed;
    }

  }
}
