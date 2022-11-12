<template>
  <section class="skills">
    <main class="container">
      <h1 class="skills__title">
        _skills<span class="skills__dott" />
      </h1>
      <div class="skills__grid--big">
        <SkillCardLarge :icon="logoTeamwork">
          <template #heading>
            teamwork
          </template>
          <template #description>
            Behind every great achievement there is a team of passionate people working on a common goal. I have experience in working hand-to-hand with testers, designers, programmers and other proffesionals on daily basis.
          </template>
        </SkillCardLarge>
        <SkillCardLarge :icon="logoKnowledge">
          <template #heading>
            knowledge sharing
          </template>
          <template #description>
            I have experience in giving presentations on various topics related to software development and organising dev-talk events. I think that these are great ways of sharing experience and  staying in touch with newest solutions.
          </template>
        </SkillCardLarge>
        <SkillCardLarge :icon="logoGraph">
          <template #heading>
            problem solving
          </template>
          <template #description>
            It's great to see your work helping other people, especially when it makes their job easier. Coding, for me, is an endless cycle of targeting issues and optimizing solutions to make life easier for everyone around.
          </template>
        </SkillCardLarge>
      </div>
      <div class="skills__grid--small">
        <SkillCardSmall v-for="skill in skills" :key="skill.name" :icon="skill.icon" :name="skill.name" :link="skill.link" />
      </div>
    </main>
  </section>
</template>

<script lang="ts" setup>
import SkillCardLarge from '../SkillCardLarge.vue'
import SkillCardSmall from '../SkillCardSmall.vue'
import skills from '@/utils/skills'

const logoTeamwork = require('@/assets/images/group.svg')
const logoKnowledge = require('@/assets/images/lightbulb.svg')
const logoGraph = require('@/assets/images/graph.svg')

</script>

<style lang="scss" scoped>
.skills {
  padding-bottom: 240px;

  &__dott {
    @include dott($blue);
  }

  &__title {
    font-size: $font-size-title;
    font-weight: 900;
    margin-bottom: 42px;
    text-align: right;
  }

  &__grid {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;

    &--big {
      @extend .skills__grid;

      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 20px;
    }

    &--small {
      @extend .skills__grid;

      grid-template-columns: repeat(6, 1fr);
    }
  }

  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto;

    &--big {
      @extend .skills__icon;

      margin-bottom: 8px;
    }
  }

  &__heading {
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__description {
    font-size: 16px;
    font-weight: 300;
  }
}
</style>
