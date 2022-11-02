<template>
  <div class="component-wrapper">
    <Hero />
    <About />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from "@/components/sections/Hero.vue"
import About from "@/components/sections/About.vue"

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Hero,
    About
  }
})
</script>

<style lang="scss" scoped>
h1 {
  color: $mint;
}
</style>
