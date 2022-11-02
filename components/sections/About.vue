<template>
  <section class="about">
    <main class="container">
      <h1>_about me<span class="about__dott"></span></h1>
      <p>My name is Karol and I'm a programmer with great passion for web technologies and more than {{ yearsWorked }}
        years of experience. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
        aperiam provident numquam placeat iure officia voluptatum voluptatem ullam sit quae facere architecto quibusdam
        corrupti accusamus beatae velit ex! Rerum, veritatis.</p>
    </main>
  </section>
</template>

<script lang="ts" setup>
const yearWorkingSince = new Date('2017-01-01').getFullYear()
const yearsWorked = new Date().getFullYear() - yearWorkingSince
</script>

<style lang="scss" scoped>
.about {
  padding: 180px 0;

  &__dott {
    margin-left: 6px;
    $size: 12px;
    display: inline-block;
    background-color: $pink;
    width: $size;
    height: $size;
    border-radius: $size;
  }
}
</style>