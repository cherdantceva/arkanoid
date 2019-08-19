import * as PIXI from 'pixi.js';

const Rectangle = PIXI.Rectangle;

export default class Ball {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.speed = 20 + Math.random() * 2;
    this.direction = Math.random() * Math.PI * 2;
    this.container = new Rectangle(-100, -100, 1920 + 100 * 2, 1080 + 100 * 2);
  }

  update() {
    this.x += Math.sin(this.direction) * this.speed;
    this.y += Math.cos(this.direction) * this.speed;

    if (this.x < this.container.x) {
      this.x += this.container.width;
    } else if (this.x > this.container.x + this.container.width) {
      this.x -= this.container.width;
    }

    if (this.y < this.container.y) {
      this.y += this.container.height;
    } else if (this.y > this.container.y + this.container.height) {
      this.y -= this.container.height;
    }
  }
}
