<template>
  <div class="component-wrapper">
    <Hero />
    <About />
    <Skills />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Skills from '@/components/sections/Skills.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Hero,
    About,
    Skills
  }
})
</script>
