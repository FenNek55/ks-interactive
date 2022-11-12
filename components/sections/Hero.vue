<template>
  <section class="hero">
    <div class="hero__content">
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
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__spacer {
    height: 100vh;
  }

  &__content {
    text-align: right;
    margin-right: 64px;
  }

  &__title {
    font-size: $font-size-title;
    font-weight: 900;
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
