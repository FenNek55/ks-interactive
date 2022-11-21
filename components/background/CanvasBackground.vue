<template>
  <div class="bg-animation__wrapper">
    <canvas ref="bg" class="bg-animation" />
  </div>
</template>

<script setup>
import { onMounted, ref } from '@nuxtjs/composition-api'
import { startAnimation } from '@/three/particle-background/main'

const bg = ref(null)

onMounted(() => {
  startAnimation(bg.value)
})
</script>

<style lang="scss" scoped>
.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  &__wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
