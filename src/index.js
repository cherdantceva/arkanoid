import * as PIXI from 'pixi.js';
import ShipModel from './model/ship';
import ShipView from './view/ship';
import AirModel from './model/air';
import AirView from './view/air';
import BallModel from './model/ball';
import BallView from './view/ball';

import bg from '../res/background.png';
import { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, AIR_WIDTH } from './defs';
import Collision from './model/collision';

const CreateApp = PIXI.Application,
  Container = PIXI.Container,
  Sprite = PIXI.Sprite,
  Loader = PIXI.Loader;

const application = new CreateApp({
  width: PLAYGROUND_WIDTH,
  height: PLAYGROUND_HEIGHT,
  antialias: true,
  transparent: false,
});

const container = new Container();
Loader.shared
  .add('bg', bg)
  .on('progress', loadProgressHandler)
  .load(setup);

application.stage.addChild(container);

function loadProgressHandler(loader, resource) {
  console.log('loading: ' + resource.url);
  console.log('progress: ' + loader.progress + '%');
}

function setup() {
  const texture = new Sprite(Loader.shared.resources.bg.texture);
  container.addChild(texture);
  document.body.appendChild(application.view);

  const enemy = [
      { x: AIR_WIDTH, y: 60 },

      { x: AIR_WIDTH * 4 + 30, y: 60 },

      { x: AIR_WIDTH * 7 + 60, y: 60 },

      { x: AIR_WIDTH * 9 + 80, y: 60 },


      { x: AIR_WIDTH, y: 560 },

      { x: AIR_WIDTH * 4 + 30, y: 560 },

      { x: AIR_WIDTH * 7 + 60, y: 560 },

      { x: AIR_WIDTH * 9 + 80, y: 560 },

  ];

  const UPS = 50;

  const models = [];

  const startttmp = window.performance.now();

  let worldCounter = 0;

  setInterval(function() {
    const current = window.performance.now();
    const count = ((current - startttmp) * UPS) / 1000 - worldCounter;
    for (let i = 0; i < count; i++) {
      worldCounter++;
      models.map(model => model.update());
    }
  }, 10);

  const ship = new ShipModel({ x: 500, y: 1000 });
  ship.advantages.add(new Collision(ship, models));
  models.push(ship);

  const ball = new BallModel({ x: container.width / 2, y: container.height / 2 });
  ball.advantages.add(new Collision(ball, models));
  models.push(ball);

  function createModel(data) {
    const res = new AirModel(data);
    res.advantages.add(new Collision(res, models));
    return res;
  }

  models.push(...enemy.map(createModel));

  const views = [];

  function create(model) {
    if (model instanceof ShipModel) {
      return new ShipView(container, model);
    } else if (model instanceof AirModel) {
      return new AirView(container, model);
    } else if (model instanceof BallModel) {
      return new BallView(container, model);
    }
  }

  function render() {
    requestAnimationFrame(() => {
      models.map(model => {
        if (!views.some(view => view.model === model)) {
          views.push(create(model));
        }
      });

      views.map(view => view.render());
      render();
    });
  }

  requestAnimationFrame(render);
}
