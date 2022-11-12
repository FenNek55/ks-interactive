<template>
  <component :is="tag" class="card" :href="props.link" target="_blank">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from '@nuxtjs/composition-api'

interface Props {
  link?: string,
}

const props = withDefaults(defineProps<Props>(), {
  link: ''
})

const isLink = computed(() => {
  return !!props.link
})

const tag = computed(() => {
  return isLink.value ? 'a' : 'div'
})
</script>

<style lang="scss" scoped>
.card {
  color: $dark;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  box-shadow: -3px 3px 7px 1px rgba(176, 176, 176, 0.4);
}
</style>
