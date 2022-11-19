<template>
  <section class="skills">
    <main class="container">
      <h1 ref="title" class="skills__title">
        _skills<span class="skills__dott" />
      </h1>
      <div ref="gridBig" class="skills__grid--big">
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
      <div ref="gridSmall" class="skills__grid--small">
        <SkillCardSmall v-for="skill in skills" :key="skill.name" :icon="skill.icon" :name="skill.name" :link="skill.link" />
      </div>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import SkillCardLarge from './SkillCardLarge.vue'
import SkillCardSmall from './SkillCardSmall.vue'
import skills from '@/utils/skills'

const logoTeamwork = require('@/assets/images/group.svg')
const logoKnowledge = require('@/assets/images/lightbulb.svg')
const logoGraph = require('@/assets/images/graph.svg')

const title = ref(null)
const gridBig = ref<HTMLElement | null>(null)
const gridSmall = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: title.value,
      start: 'top 50%'
    }
  })

  tl.from(title.value, {
    x: 60,
    opacity: 0,
    duration: 1.4
  })
    .from(gridBig.value && gridBig.value.children, {
      y: -20,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      delay: -0.5
    })
    .from(gridSmall.value && gridSmall.value.children, {
      y: -20,
      opacity: 0,
      stagger: 0.15,
      delay: -0.6
    })
})
</script>

<style lang="scss" scoped>
.skills {
  padding-top: calc($section-spacing / 2);
  padding-bottom: $section-spacing;

  &__dott {
    @include dott($blue);
  }

  &__title {
    @extend .section-title;

    margin-bottom: 42px;
    text-align: right;
  }

  &__grid {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;

    &--big {
      @extend .skills__grid;

      grid-template-columns: 1fr;
      margin-bottom: 20px;

      @media(min-width: $breakpoint-sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media(min-width: $breakpoint-lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    &--small {
      @extend .skills__grid;

      grid-template-columns: repeat(2, 1fr);

      @media(min-width: $breakpoint-sm) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media(min-width: $breakpoint-md) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media(min-width: $breakpoint-lg) {
        grid-template-columns: repeat(6, 1fr);
      }
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
