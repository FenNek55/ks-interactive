<template>
  <section class="hero">
    <div class="hero__content wide-container">
      <h1 class="hero__title">
        _hello<br>my name<br>is Karol
      </h1>
      <p class="hero__subtitle">
        I use <span class="hero__skill">Nuxt.js</span> to create awesome solutions
      </p>
    </div>
  </section>
</template>

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

  &__subtitle {
    font-size: 20px;
    font-weight: 200;
    letter-spacing: 0.2em;
  }

  &__skill {
    color: $mint;
  }
}
</style>
