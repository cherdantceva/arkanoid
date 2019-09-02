import Model from './model';
import { AIR_HEIGHT, AIR_WIDTH } from '../defs';

export default class Air extends Model {
  constructor({ x, y }) {
    super({ kind: 'air' });
    this.x = x;
    this.y = y;
    this.x1 = x + AIR_WIDTH;
    this.y1 = y + AIR_HEIGHT;
    this.worldCounter = 0;
  }

  update() {
    if (this.destroyed) {
      return;
    }

    const collision = this.advantages.getByName('collision');

    const ball = collision.model.find(({ kind }) => kind === 'ball');

    const axisY = (ball.y > this.y && ball.y < this.y1) || (ball.y1 > this.y && ball.y1 < this.y1);
    const axisX = (ball.x > this.x && ball.x < this.x1) || (ball.x1 > this.x && ball.x1 < this.x1);

    const bottom = ball.y > this.y && ball.y < this.y1;
    const top = ball.y1 > this.y && ball.y1 < this.y1;
    const right = ball.x > this.x && ball.x < this.x1;
    const left = ball.x1 > this.x && ball.x1 < this.x1;

    if ((top || bottom) && (left || right)) {
        if (top && left) {
            console.log('top left');
            if ((ball.y1 - this.y) > (ball.x1 - this.x)) {
                console.log('меняем x');
                ball.speed = { ...ball.speed, x: -ball.speed.x };
            } else {
                console.log('меняем y');
                ball.speed = { ...ball.speed, y: -ball.speed.y };
            }
            this.destroy();
            return;
        }
        if (top && right) {
            console.log('top right');
            if ((ball.y1 - this.y) > (ball.x - this.x1)) {
                console.log('меняем x');
                ball.speed = { ...ball.speed, x: -ball.speed.x };
            } else if ((ball.y1 - this.y) < (ball.x - this.x1)){
                console.log('меняем y');
                ball.speed = { ...ball.speed, y: -ball.speed.y };
            }
            this.destroy();
            return;
        }

        if(bottom && left) {
            console.log('bottom left');
            if ((this.y1 - ball.y) > (ball.x1 - this.x)) {
                console.log('меняем x');
                ball.speed = { ...ball.speed, x: -ball.speed.x };
            } else {
                console.log('меняем y');
                ball.speed = { ...ball.speed, y: -ball.speed.y };
            }
            this.destroy();
            return;
        }

        if (bottom && right) {
            console.log('bottom right');
            if ((this.y1 - ball.y) > (this.x1 - ball.x)) {
                console.log('меняем x');
                ball.speed = { ...ball.speed, x: -ball.speed.x };
            } else {
                console.log('меняем y');
                ball.speed = { ...ball.speed, y: -ball.speed.y };

            }
            this.destroy();
            return;
        }

    }

  }
}


function collision (rect1, rect2) {
  return (
    rect1.x <= rect2.x + rect2.width &&
    rect1.x + rect1.width >= rect2.x &&
    rect1.y <= rect2.y + rect2.height &&
    rect1.y + rect1.height >= rect2.y
  );
}
