<template>
  <section class="hero">
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
</script>

<style lang="scss" scoped>
.hero {
  color: $light;
  background-color: $dark;
  height: 100vh;

  &__content {
    display: flex;
    flex-direction: column;
    text-align: right;
    justify-content: center;
    height: 100%;
    min-height: 100%;
  }

  &__title {
    @extend .section-title;

    line-height: 105.5%;
  }
}
</style>
