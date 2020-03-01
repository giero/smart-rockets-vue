import p5, { Vector } from 'p5';
import Rocket from '@/rocket';
import RocketPopulation from '@/rocket-population';
import MoveDNA from '@/move-dna';

interface Target {
  x: number;
  y: number;
  size: number;
}

export default class GA {
  target: Target;

  population: RocketPopulation;

  matingPool: Array<Rocket>;

  rocketsFitness: Array<number>;

  bestRocket: number;

  constructor(target: Target, population: RocketPopulation) {
    this.target = target;
    this.population = population;
    this.matingPool = [];
    this.rocketsFitness = new Array<number>(population.size);
  }

  calculateFitness(rocket: Rocket): number {
    const d = p5.prototype.dist(rocket.position.x, rocket.position.y, this.target.x, this.target.y);
    let fitness = p5.prototype.map(d, 0, 600, 600, 0);

    if (rocket.completed) {
      fitness *= p5.prototype.map(200 / rocket.moves.key(), 1, 200, 1, 100) * 5;
    }

    if (rocket.crashed) {
      fitness /= 10;
    }

    return fitness;
  }

  evaluate() {
    let maxFitness = 0;
    this.bestRocket = 0;
    for (let i = 0; i < this.population.size; ++i) {
      this.rocketsFitness[i] = this.calculateFitness(this.population.rockets[i]);
      if (this.rocketsFitness[i] > maxFitness) {
        maxFitness = this.rocketsFitness[i];
        this.bestRocket = i;
      }
    }

    console.log({ maxFitness });

    for (let i = 0; i < this.population.size; ++i) {
      this.rocketsFitness[i] /= maxFitness;
    }

    for (let i = 0; i < this.population.size; ++i) {
      const cardinality = this.rocketsFitness[i] * 100;
      for (let j = 0; j < cardinality; ++j) {
        this.matingPool.push(this.population.rockets[i]);
      }
    }
  }

  selection() {
    const newRockets = new Array<Rocket>(this.population.size);
    const bestMoves = this.population.rockets[this.bestRocket].moves;
    bestMoves.revind();
    const bestRocket = new Rocket(bestMoves);
    bestRocket.leader = true;

    newRockets[0] = bestRocket;
    for (let i = 1; i < this.population.size; ++i) {
      const parentA: Rocket = p5.prototype.random(this.matingPool);
      const parentB: Rocket = p5.prototype.random(this.matingPool);

      const childMovesDNA = GA.crossoverMovesDNA(parentA.moves, parentB.moves);
      newRockets[i] = new Rocket(childMovesDNA);
    }

    this.population = new RocketPopulation(newRockets);

    return this.population;
  }

  static crossoverMovesDNA(moveDNAa: MoveDNA, moveDNAb: MoveDNA): MoveDNA {
    const newMoves: Array<Vector> = [];
    const mid = p5.prototype.floor(p5.prototype.random(moveDNAa.moves.length));

    for (let i = 0; i < moveDNAa.moves.length; ++i) {
      newMoves[i] = i < mid ? moveDNAa.moves[i] : moveDNAb.moves[i];

      // mutation
      if (p5.prototype.random(1) < 0.01) {
        newMoves[i] = p5.Vector.random2D().setMag(0.2);
      }
    }

    return new MoveDNA(newMoves);
  }
}
