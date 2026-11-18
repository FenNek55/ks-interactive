<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const route = useRoute()
const scrolled = ref(false)
const { setMode } = useDotWaveInteraction()

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
] as const

function isActive(to: string) {
  return route.path === to
}

function updateScrolled() {
  scrolled.value = window.scrollY > 16
}

onMounted(() => {
  updateScrolled()
  window.addEventListener('scroll', updateScrolled, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrolled)
})
</script>

<template>
  <nav
    class="top-nav"
    :class="{ 'top-nav--scrolled': scrolled }"
    aria-label="Primary"
  >
    <div class="top-nav__inner">
      <ul
        class="top-nav__list"
        @pointerenter="setMode('swirl')"
        @pointerleave="setMode('repel')"
      >
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            class="top-nav__link"
            :to="link.to"
            :aria-current="isActive(link.to) ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  width: 100%;
  padding-block: 1rem;
  pointer-events: none;
}

.top-nav__inner {
  width: min(100% - 2rem, 1280px);
  margin-inline: auto;
}

.top-nav::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px) saturate(1.25);
  -webkit-backdrop-filter: blur(8px) saturate(1.25);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.top-nav--scrolled::before {
  opacity: 1;
}

.top-nav__list {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: auto;
}

.top-nav__link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.55rem 0.15rem;
  color: rgba(237, 237, 237, 0.96);
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  line-height: 1.2;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.25s ease, color 0.25s ease;
}

.top-nav__link:hover {
  color: rgba(237, 237, 237, 0.75);
}

.top-nav__link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 4px;
  border-radius: 2px;
}

.top-nav__link[aria-current='page'] {
  border-bottom-color: rgb(var(--v-theme-primary));
  color: rgba(237, 237, 237, 0.96);
}

@media (max-width: 599px) {
  .top-nav {
    padding-block: 0.65rem;
  }

  .top-nav__list {
    gap: 1.15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .top-nav::before {
    transition: none;
  }
}
</style>
