<template>
  <section class="about">
    <main class="container">
      <h1 ref="title" class="about__title">
        _about me<span class="about__dott" />
      </h1>
      <div ref="textWrapper" class="about__text">
        <p class="about__paragraph">
          My name is Karol and I'm a programmer with great passion for web development and {{
            yearsWorked
          }}+
          years of experience. I enjoy learning new technologies and using them in my projects in order to deliver best
          possible
          solutions.
        </p>
        <p class="about__paragraph">
          During my career, I’ve had lots of great opportunities to expand my knowledge and share it with many amazing people. I believe that coding is not a zero-sum game, which is especially important in a constantly evolving environment of web technology
        </p>
        <div class="about__quote-wrapper">
          <q class="about__quote">
            Try to learn something about everything and everything about <span class="about__quote-weld">something.<span class="about__swoosh-wrapper"><img class="about__swoosh" src="@/assets/images/quote-swoosh.svg"></span></span>
          </q>
          <div class="about__quote-author">
            ~ Thomas Huxley
          </div>
        </div>
      </div>
      <div ref="corner" class="about__corner-wrapper">
        <div class="about__corner" />
      </div>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { onMounted, ref } from '@nuxtjs/composition-api'

const title = ref(null)
const corner = ref(null)
const textWrapper = ref<HTMLElement | null>(null)

const yearWorkingSince = new Date('2017-01-01').getFullYear()
const yearsWorked = new Date().getFullYear() - yearWorkingSince

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: title.value,
      start: 'top 50%'
    }
  })

  tl.from(title.value, {
    x: -60,
    opacity: 0,
    duration: 1.4
  })
    .from(corner.value, {
      x: 60,
      opacity: 0,
      duration: 1.4
    }, 0).from(textWrapper.value && textWrapper.value.children, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.4,
      delay: -0.4
    }, 1)
})
</script>

<style lang="scss" scoped>
.about {
  padding-top: $section-spacing;
  padding-bottom: calc($section-spacing / 2);
  background-color: $light;
  overflow: hidden;

  &__dott {
    @include dott($pink);
  }

  &__title {
    @extend .section-title;

    margin-bottom: 24px;
  }

  &__paragraph {
    margin-bottom: 16px;
    padding-right: 24px;
    font-size: 20px;

    &:last-of-type {
      margin-bottom: 24px;
    }

    @media(min-width: $breakpoint-md) {
      font-size: 24px;
    }
  }

  &__quote-wrapper {
    position: relative;
    margin-bottom: 80px;
    margin-right: 50px;
    font-size: 20px;
    color: $dimmed;
    font-weight: 300;

    @media(min-width: $breakpoint-lg) {
      max-width: none;
    }
  }

  &__quote {
    display: inline-block;
    vertical-align: bottom;
    margin-bottom: 24px;

    @media(min-width: $breakpoint-md) {
      margin-bottom: 12px;
    }
  }

  &__quote-weld {
    white-space: nowrap;
  }

  &__swoosh {
    position: absolute;
    top: 0;
    left: 12px;
    width: 80px;
    height: 36px;
    display: inline;
    max-width: none;
  }

  &__swoosh-wrapper {
    position: relative;
  }

  &__corner-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  &__corner {
    $corner-size: 32px;
    position: relative;
    right: 0;
    bottom: 0;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100px;
      height: $corner-size;
      background-color: $dark;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: $corner-size;
      height: 100px;
      background-color: $dark;
    }
  }
}
</style>
