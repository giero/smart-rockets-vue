import p5, { Vector } from 'p5';
import MoveDNA from '@/move-dna';

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

export default class Rocket {
  position: Vector;

  velocity: Vector;

  acceleration: Vector;

  moves: MoveDNA;

  completed: boolean;

  crashed: boolean;

  constructor(moves?: MoveDNA) {
    this.position = p5.prototype.createVector(300, 500);
    this.velocity = p5.prototype.createVector();
    this.acceleration = p5.prototype.createVector();
    this.moves = moves instanceof MoveDNA ? moves : new MoveDNA();
    this.completed = false;
    this.crashed = false;
  }

  applyForce(force: Vector): void {
    this.acceleration.add(force);
  }

  update(target: Target, obstacle: Obstacle): void {
    if (this.crashed || this.completed || !this.moves.valid()) {
      return;
    }

    this.applyForce(this.moves.current());
    this.moves.next();

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(4);

    this.completed = p5.prototype.dist(
      this.position.x,
      this.position.y,
      target.x,
      target.y,
    ) < target.size;

    this.crashed = this.position.x < 0
      || this.position.x > 600
      || this.position.y < 0
      || this.position.y > 600
      || (this.position.x > obstacle.rx
        && this.position.x < obstacle.rx + obstacle.rw
        && this.position.y > obstacle.ry
        && this.position.y < obstacle.ry + obstacle.rh);
  }
}
