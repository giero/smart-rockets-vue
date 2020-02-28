import Rocket from '@/rocket';

export default class RocketPopulation {
  population: Rocket[];

  size: number;

  constructor(population: Rocket[] = []) {
    this.size = 100;

    if (population.length >= this.size) {
      throw new Error('Too much rockets');
    }

    this.population = population;
  }
}
