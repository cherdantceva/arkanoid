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

    const collisionAdvantage = this.advantages.getByName('collision');

    const ball = collisionAdvantage.model.find(({ kind }) => kind === 'ball');

    if(collision(ball, this)) {

      this.destroy();
    }

  }
}


function collision (rect1, rect2) {
  return (
    rect1.x <= rect2.x1 &&
    rect1.x1 >= rect2.x &&
    rect1.y <= rect2.y1 &&
    rect1.y1 >= rect2.y
  );
}
