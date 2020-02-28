import { Vector } from 'p5';

export default class Rocket {
  position: Vector;

  velocity: Vector;

  acceleration: Vector;

  constructor(position: Vector, velocity: Vector, acceleration: Vector) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  applyForce(force: Vector): void {
    this.acceleration.add(force);
  }

  update(): void {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}
