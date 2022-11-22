<template>
  <section class="hero">
    <CanvasBacground class="hero__background" />
    <div class="hero__content wide-container">
      <h1 class="hero__title">
        _hello<br>my name<br>is Karol
      </h1>
      <HeroSkills />
    </div>
  </section>
</template>

<script lang="ts" setup>
import HeroSkills from './HeroSkills.vue'
import CanvasBacground from '@/components/background/CanvasBackground.vue'
</script>

<style lang="scss" scoped>
.hero {
  color: $light;
  background-color: $dark;
  height: 100vh;
  position: relative;

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
