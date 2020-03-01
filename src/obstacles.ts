import { Vector } from 'p5';

interface Obstacle {
  rx: number;
  ry: number;
  rw: number;
  rh: number;
}

export default class Obstacles {
  obstacles: Array<Obstacle>;

  constructor(obstacles: Array<Obstacle>) {
    this.obstacles = obstacles;
  }

  collideAny(position: Vector) {
    return this.obstacles.some((obstacle) => Obstacles.collide(position, obstacle));
  }

  static collide(position: Vector, obstacle: Obstacle) {
    return position.x > obstacle.rx
      && position.x < obstacle.rx + obstacle.rw
      && position.y > obstacle.ry
      && position.y < obstacle.ry + obstacle.rh;
  }
}
