<template>
  <section class="about">
    <main class="container">
      <h1 class="about__title">_about me<span class="about__dott"></span></h1>
      <p class="about__paragraph">My name is Karol and I'm a programmer with great passion for web technologies and {{
          yearsWorked
      }}+
        years of experience. I enjoy learning new technologies and using them in my projects in order to deliver best
        possible
        solutions.</p>
      <div class="about__quote">
        <q class="about__quoted">Try to learn something about everything and everything about something.</q> <br>~
        Thomas
        Huxley
      </div>
      <div class="about__corner-wrapper">
        <div class="about__corner"></div>
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
  padding: 180px 0 90px 0;

  &__dott {
    @include dott($pink);
  }

  &__title {
    margin-bottom: 32px;
  }

  &__paragraph {
    margin-bottom: 24px;
    padding-right: 24px;
    font-size: 26px;
  }

  &__quote {
    position: relative;
    margin-bottom: 80px;
    font-size: 1.2rem;
    color: $dimmed;
  }

  &__corner-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  &__corner {
    $corner-size: 25px;
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