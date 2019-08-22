import * as PIXI from 'pixi.js';
import View from './view';
import shipImg from '../../res/ship.svg';

const Sprite = PIXI.Sprite,
  Texture = PIXI.Texture;

export default class Ship extends View {
  constructor(scene, model) {
    super(scene, model);
    this.sprite = new Sprite(Texture.from(shipImg));
    scene.addChild(this.sprite);
  }

  render() {
    this.sprite.y = this.model.y;
    this.sprite.x = this.model.x;
  }
}
