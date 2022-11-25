<template>
  <section class="contact">
    <div class="wide-container contact__container">
      <div class="contact__title-wrapper">
        <h1 ref="title" class="contact__title">
          _contact<span class="contact__dott" />
        </h1>
      </div>
      <div class="form-container">
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { onMounted, ref } from '@nuxtjs/composition-api'
import ContactForm from './ContactForm.vue'

const title = ref(null)

onMounted(() => {
  gsap.from(title.value, {
    scrollTrigger: {
      trigger: title.value,
      start: 'top 80%'
    },
    x: -40,
    duration: 1.4,
    opacity: 0
  })
})
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
  }

  &__title-wrapper {
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
