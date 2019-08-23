import { BALL_R, PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH } from '../defs';

const {min, max} = Math;

export default class Ball {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.speed = { x: 45, y: 52 };
  }

  update() {

    this.x +=this.speed.x;
    this.y +=this.speed.y;

    this.x = max(0, min( this.x, PLAYGROUND_WIDTH - BALL_R ));
    this.y = max(0, min( this.y, PLAYGROUND_HEIGHT - BALL_R ));

    if(this.x === PLAYGROUND_WIDTH - BALL_R || this.x === 0) {
      this.speed = { ...this.speed, x: -this.speed.x };
    }

    if(this.y === PLAYGROUND_HEIGHT - BALL_R || this.y === 0) {
      this.speed = { ...this.speed, y: -this.speed.y };
    }

  }
}
