<template>
  <vue-p5 v-on='{setup, draw}'></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';
import GA from '@/ga';
import RocketDrawer from '@/rocket-drawer';
import RocketPopulation from '@/rocket-population';
import Obstacles from '@/obstacles';

export default {
  name: 'Sketch',
  components: {
    'vue-p5': VueP5,
  },
  data() {
    return {
      color: [0, 0, 0],
      ga: null,
      rocketDrawer: null,
      rockets: null,
      target: null,
      obstacles: null,
    };
  },
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(600, 600);
      this.rocketDrawer = new RocketDrawer(sketch);
      this.rockets = new RocketPopulation();
      this.rockets.generate(50);
      this.target = {
        x: sketch.width / 2,
        y: 50,
        size: 16,
      };
      this.obstacles = new Obstacles([
        {
          rx: 50,
          ry: 150,
          rw: 200,
          rh: 10,
        },
        {
          rx: 350,
          ry: 150,
          rw: 200,
          rh: 10,
        },
        {
          rx: 150,
          ry: 300,
          rw: 300,
          rh: 10,
        },
        {
          rx: 350,
          ry: 450,
          rw: 200,
          rh: 10,
        },
      ]);
      this.ga = new GA(this.target, this.rockets);
    },
    draw(sketch) {
      sketch.background(...this.color);
      sketch.ellipse(this.target.x, this.target.y, this.target.size, this.target.size);
      this.obstacles.obstacles.forEach(
        (obstacle) => sketch.rect(obstacle.rx, obstacle.ry, obstacle.rw, obstacle.rh),
      );

      if (!this.rockets.canMove()) {
        this.ga.evaluate();
        this.rockets = this.ga.selection();
      }
      this.rockets.update(this.target, this.obstacles);
      this.rockets.update(this.target, this.obstacles);
      this.rockets.update(this.target, this.obstacles);
      this.rockets.update(this.target, this.obstacles);
      this.rocketDrawer.drawPopulation(this.rockets);
    },
  },
};
</script>
