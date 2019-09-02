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
    this.centerX = x + BALL_R /2;
    this.centerY = y + BALL_R /2;
    this.speed = { x: 12, y: 18 };
  }

  update() {
    const collision = this.advantages.getByName('collision');

    this.x += this.speed.x;
    this.y += this.speed.y;

    this.x = max(0, min(this.x, PLAYGROUND_WIDTH - BALL_R));
    this.y = max(0, min(this.y, PLAYGROUND_HEIGHT - BALL_R));

    if (this.x === PLAYGROUND_WIDTH - BALL_R || this.x === 0) {
      this.speed = { ...this.speed, x: -this.speed.x };
    }
    if (this.y === PLAYGROUND_HEIGHT - BALL_R || this.y === 0) {
      this.speed = { ...this.speed, y: -this.speed.y };
    }

    this.x1 = this.x + BALL_R;
    this.y1 = this.y + BALL_R;
    const air = collision.model.find(({ kind }) => kind === 'air');
    const axisY = (this.y > air.y && this.y < air.y1) || (this.y1 > air.y && this.y1 < air.y1);
    const axisX = (this.x > air.x && this.x < air.x1) || (this.x1 > air.x && this.x1 < air.x1);


    // const leftBottom = (this.y > air.y && this.y < air.y1) && (this.x1 > air.x && this.x1 < air.x1);
    // const leftTop = (this.y1 > air.y && this.y1 < air.y1) && (this.x1 > air.x && this.x1 < air.x1);
    // const rightBottom = (this.y > air.y && this.y < air.y1) && (this.x > air.x && this.x < air.x1);
    // const rightTop = (this.y1 > air.y && this.y1 < air.y1) && (this.x > air.x && this.x < air.x1);
    //
    // if (leftBottom) {
    //     debugger;
    // }
  }
}
