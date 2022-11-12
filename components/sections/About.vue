<template>
  <section class="about">
    <main class="container">
      <h1 class="about__title">
        _about me<span class="about__dott" />
      </h1>
      <p class="about__paragraph">
        My name is Karol and I'm a programmer with great passion for web technologies and {{
          yearsWorked
        }}+
        years of experience. I enjoy learning new technologies and using them in my projects in order to deliver best
        possible
        solutions.
      </p>
      <p class="about__paragraph">
        During my career, I’ve had lots of great opportunities to expand my knowledge and share it with many amazing people. I believe that coding is not a zero-sum game, which is especially important in a constantly evolving environment of web technology
      </p>
      <div class="about__quote">
        <q class="about__quoted">Try to learn something about everything and everything about something.</q>
        <br>~ Thomas Huxley
      </div>
      <div class="about__corner-wrapper">
        <div class="about__corner" />
      </div>
    </main>
  </section>
</template>

<script lang="ts" setup>
const yearWorkingSince = new Date('2017-01-01').getFullYear()
const yearsWorked = new Date().getFullYear() - yearWorkingSince
</script>

<style lang="scss" scoped>
.about {
  padding-top: 240px;
  margin-bottom: 240px;
  background-color: $light;

  &__dott {
    @include dott($pink);
  }

  &__title {
    font-size: $font-size-title;
    font-weight: 900;
    margin-bottom: 42px;
  }

  &__paragraph {
    margin-bottom: 24px;
    padding-right: 24px;
    font-size: 26px;
  }

  &__quote {
    position: relative;
    margin-bottom: 80px;
    font-size: 20px;
    color: $dimmed;
    font-weight: 300;
    display: inline-block;
  }

  &__quoted {
    &::after {
      position: absolute;
      top: 0;
      right: -86px;
      display: block;
      content: '';
      width: 80px;
      height: 36px;
      background-image: url('~/assets/images/quote-swoosh.svg');
    }
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
