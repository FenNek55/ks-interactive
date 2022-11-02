<template>
  <header class="header">
    <nav class="header__nav">
      <a href="/" class="header__link">Top</a>
      <a href="/" class="header__link">About me</a>
      <a href="/" class="header__link">Skills</a>
      <a href="/" class="header__link">Projects</a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  background-color: $dark;

  &__link {
    font-weight: bold;
    color: $light;
    text-decoration: none;
    padding: 8px 0;
    margin: 0 16px;
  }
}
</style>
