<template>
  <BaseCard class="skill-small" :link="props.link">
    <div class="skill-small__content">
      <div class="skill-small__icon-wrapper">
        <img class="skill-small__icon" :src="props.icon" :alt="iconAlt">
      </div>
      <h2 class="skill-small__name">
        {{ props.name }}
      </h2>
    </div>
  </BaseCard>
</template>

<script lang="ts" setup>
import { computed } from '@nuxtjs/composition-api'
interface Props {
  icon: string,
  name: string,
  link: string
}

const props = defineProps<Props>()

const iconAlt = computed(() => {
  return `${props.name} icon`
})
</script>

<style lang="scss" scoped>
.skill-small {
  padding-top: 100%;
  position: relative;
  transition: 0.2s;
  user-select: none;

  &:hover {
    transform: translateX(4px) translateY(-4px);
    box-shadow: -7px 7px 16px 1px rgba(176, 176, 176, 0.2);
  }

  &__content {
    text-align: center;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 28px;
  }

  &__icon-wrapper {
    display: flex;
    align-items: center;
    height: 64px;
    width: 64px;
    margin-bottom: 8px;
  }

  &__icon {
    max-height: 64px;
    max-width: 64px;
  }

  &__name {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
