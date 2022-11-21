<template>
  <div class="skills">
    I use
    <div
      ref="wrapperEl"
      class="skills__wrapper"
      :style="{
        width: skillElementWidth
      }"
    >
      <span ref="skillEl" class="skills__skill">{{ currentSkill }}</span>
      <span ref="nextEl" class="skills__next">{{ nextSkill }}</span>
    </div> to create awesome stuff
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import { getComputedProperty } from '@/utils/utils'
import skills from '@/utils/skills'

const interval = ref(0)
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
  gsap.to(wrapperEl.value, { width: nextElementWidth, duration: animationDuration })
  const tl = gsap.timeline()
  tl.to(skillEl.value, { y: -25, opacity: 0, duration: animationDuration }, 0)
    .to(nextEl.value, { y: -25, opacity: 1, duration: animationDuration }, 0)
    .then(() => {
      if (currentSkillIndex.value === skills.length - 2) {
        currentSkillIndex.value += 1
        currentSkill.value = skills[currentSkillIndex.value].name
        nextSkill.value = skills[0].name
      } else if (currentSkillIndex.value === skills.length - 1) {
        currentSkillIndex.value = 0
        currentSkill.value = skills[currentSkillIndex.value].name
        nextSkill.value = skills[currentSkillIndex.value + 1].name
      } else {
        currentSkillIndex.value += 1
        currentSkill.value = skills[currentSkillIndex.value].name
        nextSkill.value = skills[currentSkillIndex.value + 1].name
      }
      tl.revert()
    })

  setSkillsetTimeout()
}

const setSkillsetTimeout = () => {
  window.setTimeout(() => {
    setNextSkill()
  }, intervalTimeout)
}

onMounted(() => {
  skillElementWidth.value = skillEl.value ? getComputedProperty(skillEl.value, 'width') : '0px'
  setSkillsetTimeout()
})

onUnmounted(() => {
  clearInterval(interval.value)
  interval.value = 0
})
</script>

<style lang="scss" scoped>
.skills{
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 0.2em;
  display: flex;
  justify-content: flex-end;

  &__wrapper {
    color: $mint;
    position: relative;
    margin: 0 8px;
    font-weight: 600;
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
