import * as p5 from 'p5';

type Vector = p5.Vector;

export default class MoveDNA {
  moves: Vector[];

  position: number;

  readonly maxMoves = 800;

  readonly maxForce = 0.2;

  size: number;

  constructor(moves?: Array<Vector>) {
    this.position = 0;

    if (moves instanceof Array) {
      if (moves.length > this.maxMoves) {
        throw new Error('Too much moves');
      }
      this.moves = moves;
    } else {
      this.moves = new Array<Vector>(this.maxMoves);
      for (let i = 0; i < this.maxMoves; ++i) {
        this.moves[i] = p5.Vector.random2D().setMag(this.maxForce);
      }
    }
    this.size = this.moves.length;
  }

  current(): Vector {
    return this.moves[this.position];
  }

  key(): number {
    return this.position;
  }

  next(): void {
    ++this.position;
  }

  valid(): boolean {
    return this.position < this.moves.length;
  }

  revind(): void {
    this.position = 0;
  }
}
