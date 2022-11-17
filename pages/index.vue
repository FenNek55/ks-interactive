<template>
  <div class="component-wrapper">
    <Hero />
    <About />
    <Skills />
    <Contact />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/sections/hero/Hero.vue'
import About from '~/components/sections/about/About.vue'
import Skills from '~/components/sections/skills/Skills.vue'
import Contact from '~/components/sections/contact/Contact.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Hero,
    About,
    Skills,
    Contact
  }
})
</script>
