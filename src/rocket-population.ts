import Rocket from '@/rocket';

// TODO: move to separate file
interface Target {
  x: number;
  y: number;
  size: number;
}

interface Obstacle {
  rx: number;
  ry: number;
  rw: number;
  rh: number;
}

export default class RocketPopulation {
  rockets: Rocket[];

  readonly maxSize = 100;

  size: number;

  constructor(rockets: Rocket[] = []) {
    if (rockets.length >= this.maxSize) {
      throw new Error('Too much rockets');
    }

    this.rockets = rockets;
    this.size = rockets.length;
  }

  generate(size: number) {
    if (size > this.maxSize) {
      throw new Error('Too much rockets');
    }

    this.rockets = [];
    for (let i = 0; i < size; ++i) {
      this.rockets.push(new Rocket());
    }
    this.size = this.rockets.length;
  }

  update(target: Target, obstacle: Obstacle): void {
    for (let i = 0; i < this.size; ++i) {
      this.rockets[i].update(target, obstacle);
    }
  }

  canMove(): boolean {
    return this.rockets.some(
      (rocket) => !rocket.crashed && !rocket.completed && rocket.moves.valid(),
    );
  }
}
