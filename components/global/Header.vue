<template>
  <header class="header">
    <nav class="header__nav">
      <a href="/" class="header__link header__link--top">Top</a>
      <a href="/" class="header__link header__link--about">About me</a>
      <a href="/" class="header__link header__link--skills">Skills</a>
      <a href="/" class="header__link header__link--projects">Projects</a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  z-index: 100;

  &__link {
    position: relative;
    font-weight: bold;
    color: $light;
    text-decoration: none;
    padding: 8px 0;
    margin: 0 16px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0%;
      height: 3px;
      background-color: $light;
      transition: 0.2s;
    }

    &:hover {
      &::after {
        width: 100%
      }
    }

    &--about {
      &::after {
        background-color: $pink;
      }
    }

    &--skills {
      &::after {
        background-color: $blue;
      }
    }

    &--projects {
      &::after {
        background-color: $mint;
      }
    }

  }
}
</style>
