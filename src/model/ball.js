import { BALL_R, PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH } from '../defs';
import Model from './model';

const { min, max } = Math;

export default class Ball extends Model {
  constructor({ x, y }) {
    super({ kind: 'ball' });
    this.x = x;
    this.y = y;
    this.x1 = x + BALL_R;
    this.y1 = y + BALL_R;
    this.speed = { x: 12, y: 18 };
  }

  update() {
      if (this.destroyed) {
          return;
      }
    const collision = this.advantages.getByName('collision');

      function collisions (rect1, rect2) {
          return (
              rect1.x < rect2.x1 &&
              rect1.x1 > rect2.x &&
              rect1.y < rect2.y1 &&
              rect1.y1 > rect2.y
          );
      }


      const prev = { x: this.x, y: this.y };

    this.x += this.speed.x;
    this.y += this.speed.y;

    const airs = collision.model.filter(({ kind }) => kind === 'air');


    const collisionAirIndex = airs.findIndex( (air) => {
      return collisions( this, air );
    } );

    if(collisionAirIndex > -1) {
      airs[collisionAirIndex]
        console.log(airs[collisionAirIndex])
    }


    this.x = max(0, min(this.x, PLAYGROUND_WIDTH - BALL_R));
    this.y = max(0, min(this.y, PLAYGROUND_HEIGHT - BALL_R));

    if (this.x === PLAYGROUND_WIDTH - BALL_R || this.x === 0) {
      this.speed = { ...this.speed, x: -this.speed.x };
    }
    if (this.y === PLAYGROUND_HEIGHT - BALL_R || this.y === 0) {
      this.speed = { ...this.speed, y: -this.speed.y };
    }
    const air = collision.model.find(({ kind }) => kind === 'air');
  }
}

