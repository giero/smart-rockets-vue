import p5 from 'p5';
import Rocket from '@/rocket';
import RocketPopulation from '@/rocket-population';

export default class RocketDrawer {
  sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  draw(rocket: Rocket) {
    const { sketch: s } = this;

    s.push();
    s.noStroke();
    if (rocket.leader) {
      s.fill(204, 102, 0);
    } else {
      s.fill(255, 150);
    }
    s.translate(rocket.position.x, rocket.position.y);
    s.rotate(rocket.velocity.heading());
    s.rectMode(s.CENTER);
    s.rect(0, 0, 25, 5);
    s.pop();
  }

  drawPopulation(population: RocketPopulation) {
    population.rockets.forEach((rocket) => this.draw(rocket));
  }
}
