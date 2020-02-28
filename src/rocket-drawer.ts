import p5 from 'p5';
import Rocket from '@/rocket';

export default class RocketDrawer {
  sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  draw(rocket: Rocket) {
    const { sketch } = this;

    sketch.push();
    sketch.translate(rocket.position.x, rocket.position.y);
    sketch.rotate(rocket.velocity.heading());
    sketch.rectMode(sketch.CENTER);
    sketch.rect(0, 0, 50, 10);
    sketch.pop();
  }
}
