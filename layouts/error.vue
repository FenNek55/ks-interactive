<template>
  <section class="error">
    <h1 class="error__title">
      <span class="error__whoops">Whoops</span>, something went wrong!
    </h1>
    <p>Looks like the address you are looking for does not exist</p>
    <p>
      Go back <nuxt-link class="error__link" to="/">
        home
      </nuxt-link>?
    </p>
  </section>
</template>

<style lang="scss" scoped>
.error {
  height: 100vh;
  background-color: $dark;
  color: $light;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    margin-bottom: 12px;
  }

  &__whoops {
    color: $mint;
  }

  &__link {
    color: $light;
  }
}
</style>
