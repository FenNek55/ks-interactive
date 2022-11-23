<template>
  <div class="index">
    <Hero />
    <About class="index__about" />
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

<style lang="scss" scoped>
.index {
  width: 100%;
  overflow: hidden;

  &__about {
    margin-top: 100vh;
  }
}
</style>
