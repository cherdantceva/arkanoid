import Model from './model';
import { AIR_HEIGHT, AIR_WIDTH } from '../defs';
import { collision } from "./math"

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
