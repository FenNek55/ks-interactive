<template>
  <section class="contact">
    <div class="container">
      <h1 class="contact__title">
        _contact<span class="contact__dott" />
      </h1>
      <div class="form-container">
        <h2 class="contact__heading">
          Want to get in touch?
        </h2>
        <p class="contact__paragraph">
          Feel free to send me a message, I'll respond as fast as I can
        </p>
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ContactForm from '../skills/ContactForm.vue'
</script>

<style lang="scss" scoped>
.contact {
  position: relative;
  padding: 120px 0;
  background-color: $dark;
  color: $light;

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
      transform: rotate(-90deg) translate3d(calc(-100% - 120px), 60px, 0);
      transform: translate3d();
      transform-origin: top left;
    }
  }

  &__paragraph {
    margin-bottom: 32px;
  }

  &__heading {
    font-size: 32px;
  }
}
</style>
