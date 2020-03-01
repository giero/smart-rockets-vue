import Rocket from '@/rocket';
import Obstacles from '@/obstacles';

// TODO: move to separate file
interface Target {
  x: number;
  y: number;
  size: number;
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

  update(target: Target, obstacles: Obstacles): void {
    for (let i = 0; i < this.size; ++i) {
      this.rockets[i].update(target, obstacles);
    }
  }

  canMove(): boolean {
    return this.rockets.some(
      (rocket) => !rocket.crashed && !rocket.completed && rocket.moves.valid(),
    );
  }
}
