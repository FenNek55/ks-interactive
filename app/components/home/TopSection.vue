<script setup lang="ts">
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const { setMode } = useDotWaveInteraction()
const yearsOfExperience = new Date().getFullYear() - 2021

function onButtonGroupEnter() {
  setMode('swirl')
}

function onButtonGroupLeave() {
  setMode('repel')
}

function scrollToProjects() {
  gsap.to(window, {
    duration: 1.8,
    scrollTo: { y: '#projects', autoKill: true },
    ease: 'power2.inOut',
  })
}
</script>

<template>
  <section class="top-section">
    <v-row>
      <v-col cols="12" md="7" lg="6">
        <div class="top-copy d-flex flex-column ga-3">
          <h1 class="text-display-medium font-weight-bold">
            Hello, my name is <span class="text-primary">Karol.</span><br> I turn business challenges into user friendly answers.
          </h1>
          <p class="text-body-large font-weight-normal text-medium-emphasis pb-8">
            With over {{ yearsOfExperience }} years of professional experience across the stack, I bridge the gap between technical and business stakeholders to design, build, and ship comprehensive solutions that users love.
          </p>
          <div
            class="top-actions d-inline-flex flex-column flex-sm-row flex-wrap ga-2 align-self-start"
            @pointerenter="onButtonGroupEnter"
            @pointerleave="onButtonGroupLeave"
          >
            <v-btn
              size="large"
              color="primary"
              rounded
              append-icon="mdi-arrow-down-right"
              @click="scrollToProjects"
            >
              See my work
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="5" lg="6" class="top-portrait-col d-none d-lg-flex align-center justify-center">
        <div class="top-portrait">
          <img
            class="top-portrait__layer top-portrait__layer--base"
            src="/images/portrait.png"
            alt="Portrait of Karol"
            width="640"
            height="640"
          >
          <img
            class="top-portrait__layer top-portrait__layer--blur"
            src="/images/portrait.png"
            alt=""
            aria-hidden="true"
            width="640"
            height="640"
          >
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<style scoped>
.top-section {
  display: flex;
  align-items: center;
  min-height: 90svh;
  width: 100%;
  overflow-x: clip;
}

.top-copy :is(h1, p) {
  margin: 0;
}

.top-actions {
  max-width: 100%;
}

.top-portrait-col {
  position: relative;
  min-height: 0;
}

.top-portrait {
  position: relative;
  width: min(100%, 22rem);
  margin-inline: auto;
  pointer-events: none;
  user-select: none;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgb(0 0 0 / 0.7) 50%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, rgb(0 0 0 / 0.7) 50%, transparent 100%);
}

.top-portrait__layer {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.top-portrait__layer--blur {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(2px);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, transparent 30%, #000 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, transparent 30%, #000 100%);
}

@media (min-width: 960px) {
  .top-portrait {
    position: absolute;
    inset: 50% auto auto 50%;
    width: min(42vw, 34rem);
    max-width: none;
    margin: 0;
    transform: translate(-50%, -50%);
  }
}
</style>
