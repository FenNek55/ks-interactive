<template>
  <div class="skills">
    <span class="skills__pre">I use</span>
    <div
      ref="wrapperEl"
      class="skills__wrapper"
      :style="{
        width: skillElementWidth
      }"
    >
      <span ref="skillEl" class="skills__skill">{{ currentSkill }}</span>
      <span ref="nextEl" class="skills__next">{{ nextSkill }}</span>
    </div>
    <span class="skills_end">to create awesome solutions</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import { getComputedProperty, getLoopingArrayValue } from '@/utils/utils'
import skills from '@/utils/skills'

const timeout = ref(0)
const currentSkillIndex = ref(0)
const skillElementWidth = ref('80px')
const currentSkill = ref(skills[0].name)
const nextSkill = ref(skills[1].name)
const skillEl = ref(null)
const nextEl = ref(null)
const wrapperEl = ref(null)
const animationDuration = 1.6
const intervalTimeout = 4500

const setNextSkill = () => {
  const nextElementWidth = nextEl.value ? parseInt(getComputedProperty(nextEl.value, 'width').slice(0, -2), 10) : 0

  const tl = gsap.timeline()
  gsap.to(wrapperEl.value, { width: nextElementWidth, duration: animationDuration })
  tl.fromTo(skillEl.value, { y: 0, opacity: 1 }, { y: -25, opacity: 0, duration: animationDuration }, 0)
    .fromTo(nextEl.value, { y: 0, opacity: 0 }, { y: -25, opacity: 1, duration: animationDuration }, 0)
    .then(() => {
      tl.revert()

      currentSkillIndex.value += 1
      currentSkill.value = getLoopingArrayValue(skills, currentSkillIndex.value).name
      nextSkill.value = getLoopingArrayValue(skills, currentSkillIndex.value + 1).name
    })

  setSkillsetTimeout()
}

const setSkillsetTimeout = () => {
  clearTimeout(timeout.value)
  timeout.value = window.setTimeout(() => {
    setNextSkill()
  }, intervalTimeout)
}

onMounted(() => {
  skillElementWidth.value = skillEl.value ? getComputedProperty(skillEl.value, 'width') : '0px'
  setSkillsetTimeout()
})

onUnmounted(() => {
  clearTimeout(timeout.value)
})
</script>

<style lang="scss" scoped>
.skills{
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 0.2em;

  &__wrapper {
    height: 24px;
    display: inline-block;
    color: $mint;
    position: relative;
    font-weight: 600;
    vertical-align: top;
  }

  &__skill {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__next {
    position: absolute;
    top: 25px;
    left :0;
    opacity: 0;
  }
}
</style>
