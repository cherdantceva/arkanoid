import * as PIXI from 'pixi.js';
import airImg from '../../res/air.svg';
import View from './view';

const Sprite = PIXI.Sprite,
  Texture = PIXI.Texture;

export default class Air extends View {
  constructor(scene, model) {
    super(scene, model);
    this.sprite = new Sprite(Texture.from(airImg));
    scene.addChild(this.sprite);
    this.model = model;
  }

  render() {
    this.sprite.visible = !this.model.destroyed;
    this.sprite.y = this.model.y;
    this.sprite.x = this.model.x;
  }
}
