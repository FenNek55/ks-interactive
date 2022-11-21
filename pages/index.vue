<template>
  <div class="component-wrapper index">
    <Hero class="index__hero" />
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

  &__hero {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }

  &__about {
    margin-top: 100vh;
  }
}
</style>
