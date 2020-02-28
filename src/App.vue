<template>
  <div id="app">
    <v-sketch></v-sketch>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Sketch from './components/Sketch.vue';

export default Vue.extend({
  name: 'App',
  components: {
    'v-sketch': Sketch,
  },
});
</script>
