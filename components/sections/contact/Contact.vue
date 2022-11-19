<template>
  <section class="contact">
    <div class="wide-container contact__container">
      <h1 class="contact__title">
        _contact<span class="contact__dott" />
      </h1>
      <div class="form-container">
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ContactForm from './ContactForm.vue'
</script>

<style lang="scss" scoped>
.contact {
  padding: 120px 0;
  background-color: $dark;
  color: $light;

  &__container {
    position: relative;
  }

  &__dott {
    @include dott($mint);
  }

  &__title {
    @extend .section-title;

    margin-bottom: 46px;

    @media(min-width: $breakpoint-lg) {
      position: absolute;
      top: 0;
      left: 0;
      margin-bottom: 42px;
      transform: rotate(-90deg) translate3d(calc(-100%), 20px, 0);
      transform: translate3d();
      transform-origin: top left;
    }
  }
}
</style>
