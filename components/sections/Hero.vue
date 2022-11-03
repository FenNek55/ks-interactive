<template>
  <section class="hero">
    <div class="container hero__grid">
      <div class="hero__left">
      </div>
      <div class="hero__right">
        <h1 class="hero__title">_Hi, Karol here</h1>
        <p class="hero__subtitle">I use Nuxt to make awesome projects</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 260px 0 200px 0;
  color: $light;
  background-color: $dark;

  &__grid {
    z-index: 1000;
    display: grid;
    grid-template-columns: 1fr;

    @media(min-width: $breakpoint-md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__title {
    margin-bottom: 20px;
  }

  &__subtitle {
    letter-spacing: 2px;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>