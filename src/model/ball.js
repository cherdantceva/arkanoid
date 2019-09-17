import { BALL_R, PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH } from '../defs';
import Model from './model';
import { collision } from "./math"

const { min, max, abs } = Math;

export default class Ball extends Model {
  constructor({ x, y }) {
    super({ kind: 'ball' });
    this.x = 700;
    this.y = 200;
    this.x1 = x + BALL_R;
    this.y1 = y + BALL_R;
    this.speed = { x: 5, y: -18 };
  }

  update() {
      if (this.destroyed) {
          return;
      }

    const current = { x: this.x, y: this.y };

    const supposedPosition = {
      x: current.x + this.speed.x,
      y: current.y + this.speed.y,
    };
    supposedPosition.x1 = supposedPosition.x + BALL_R;
    supposedPosition.y1 = supposedPosition.y + BALL_R;


    const collisionAdvantage = this.advantages.getByName('collision');
    const airs = collisionAdvantage.model.filter(({ kind }) => kind === 'air' || kind === "ship");

    const collisionAirIndex = airs.findIndex( (air) => {
      return !air.destroyed && collision( supposedPosition, air );
    } );


    if(collisionAirIndex > -1) {

      //debugger;

      const air = airs[collisionAirIndex];

      let deltaX = 0;
      if(this.speed.x > 0) {
        deltaX = abs(this.x1 - air.x);
      }
      else {
        deltaX = abs(this.x - air.x1);
      }

      let deltaY = 0;
      if(this.speed.y > 0) {
        deltaY = abs(this.y1 - air.y);
      }
      else {
        deltaY = abs(this.y - air.y1);
      }

      const timeX = abs(deltaX / this.speed.x);
      const timeY = abs(deltaY / this.speed.y);

      if(timeX < timeY) {
        if(this.speed.x > 0) {
          supposedPosition.x1 = air.x;
          supposedPosition.x = supposedPosition.x1 - BALL_R;
        }
        else {
          supposedPosition.x = air.x1;
          supposedPosition.x1 = supposedPosition.x + BALL_R;
        }
      }
      else {
        if(this.speed.y > 0) {
          supposedPosition.y1 = air.y;
          supposedPosition.y = supposedPosition.y1 - BALL_R;
        }
        else {
          supposedPosition.y = air.y1;
          supposedPosition.y1 = supposedPosition.y + BALL_R;
        }
      }

      if(timeX < timeY) {
        this.speed.x = - this.speed.x;
      }
      else {
        this.speed.y = - this.speed.y;
      }

    }


    this.x = supposedPosition.x;
    this.y = supposedPosition.y;
    this.x1 = supposedPosition.x1;
    this.y1 = supposedPosition.y1;






/*
    const collisionAirIndex = airs.findIndex( (air) => {
      return collisions( this, air );
    } );

    if(collisionAirIndex > -1) {
      airs[collisionAirIndex]
        console.log(airs[collisionAirIndex])
    }*/




    this.x = max(0, min(this.x, PLAYGROUND_WIDTH - BALL_R));
    this.y = max(0, min(this.y, PLAYGROUND_HEIGHT - BALL_R));

    if (this.x === PLAYGROUND_WIDTH - BALL_R || this.x === 0) {
      this.speed = { ...this.speed, x: -this.speed.x };
    }
    if (this.y === PLAYGROUND_HEIGHT - BALL_R || this.y === 0) {
      this.speed = { ...this.speed, y: -this.speed.y };
    }

  }
}
