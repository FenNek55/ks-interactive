<template>
  <BaseCard class="skill-big">
    <img class="skill-big__icon" :src="props.icon" alt="Skill icon">
    <h2 class="skill-big__heading">
      <slot name="heading" />
    </h2>
    <p class="skill-big__description">
      <slot name="description" />
    </p>
  </BaseCard>
</template>

<script lang="ts" setup>
import BaseCard from '../../BaseCard.vue'

interface Props {
  icon: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.skill-big {
  padding: 24px;

  &__icon {
    margin: 0 auto 8px auto;
  }

  &__heading {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 12px;
  }

  &__description {
    font-weight: 300;
    font-size: 16px;
  }
}
</style>
