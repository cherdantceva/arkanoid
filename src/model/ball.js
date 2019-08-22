import { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, BALL_R } from '../defs';
export default class Ball {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.fly = false;
    this.directionY = 'top';
    this.directionX = 'left';
  }

  update() {
      if(this.directionY === 'top') {
          this.y -= 10
      }

      if(this.directionY === 'bottom') {
          this.y +=10
      }

      if(this.y <0) {
          this.directionY = 'bottom';
      }

      if(this.y > PLAYGROUND_HEIGHT - BALL_R) {
          this.directionY = 'top';
      }

      if(this.directionX === 'left') {
          this.x -=10
      }

      if(this.directionX === 'right') {
          this.x +=10
      }

      if(this.x < 0) {
          this.directionX = 'right';
      }

      if(this.x > PLAYGROUND_WIDTH - BALL_R) {
          this.directionX = 'left';
      }



  }
}
