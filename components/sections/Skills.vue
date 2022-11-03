<template>
  <section class="skills">
    <main class="container">
      <h1 class="skills__title">_skills<span class="skills__dott"></span></h1>
    </main>
  </section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.skills {
  padding: 90px 0 90px;

  &__dott {
    @include dott($blue);
  }

  &__title {
    text-align: right;
  }
}
</style>