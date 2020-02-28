<template>
  <vue-p5 v-on='{setup, draw}'></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';
import p5 from 'p5';
import Rocket from '@/rocket';
import RocketDrawer from '@/rocket-drawer';
import RocketPopulation from '@/rocket-population';

export default {
  name: 'Sketch',
  components: {
    'vue-p5': VueP5,
  },
  data() {
    return {
      rocketDrawer: null,
      color: [0, 0, 0],
      rockets: null,
    };
  },
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(600, 600);
      this.rocketDrawer = new RocketDrawer(sketch);

      const rockets = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 50; ++i) {
        rockets.push(new Rocket(
          p5.prototype.createVector(sketch.width / 2, sketch.height),
          p5.Vector.random2D(),
          p5.prototype.createVector(0, 0),
        ));
      }
      this.rockets = new RocketPopulation(rockets);
    },
    draw(sketch) {
      sketch.background(...this.color);
    },
  },
};
</script>
