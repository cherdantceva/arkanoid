import Advantages from './advantages';

export default class Model {
  constructor({ kind = null } = {}) {
    this.kind = kind;
    this.destroyed = false;
    this.advantages = new Advantages();
  }

  destroy() {
    this.destroyed = true;
  }
}
