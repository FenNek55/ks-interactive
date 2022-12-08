<template>
  <div ref="heroWrapper" class="hero__wrapper">
    <section ref="hero" class="hero">
      <CanvasBacground class="hero__background" />
      <div ref="heroContent" class="hero__content wide-container">
        <h1 class="hero__title">
          _hello<br>my name<br>is Karol
        </h1>
        <HeroSkills />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import HeroSkills from './HeroSkills.vue'
import CanvasBacground from '@/components/background/CanvasBackground.vue'

const heroContent = ref(null)
const heroWrapper = ref(null)
const hero = ref<HTMLElement | null>(null)

const setHeight = () => {
  if (!hero.value) {
    return
  }

  hero.value.style.height = `${window.innerHeight}px`
}

onMounted(() => {
  setHeight()

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroWrapper.value,
      start: 'top',
      scrub: true
    }
  })

  tl.to(heroContent.value, {
    y: -60,
    ease: 'linear'
  }).to(heroContent.value, {
    opacity: 0
  })

  window.addEventListener('resize', setHeight)
})

</script>

<style lang="scss" scoped>
.hero {
  color: $light;
  background-color: $dark;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;

  &__wrapper {
    height: 100vh;
  }

  &__content {
    display: flex;
    flex-direction: column;
    text-align: right;
    height: 100%;
    min-height: 100%;
    padding-top: 156px;

    @media (min-width: $breakpoint-lg){
      padding-top: 20vh;
    }
  }

  &__title {
    @extend .section-title;

    line-height: 105.5%;
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
