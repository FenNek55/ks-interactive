<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'

type SocialLink = {
  label: string
  href: string
  icon: string
  external?: boolean
}

const links: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/karol-stasik-9175ab1b8',
    icon: 'mdi-linkedin',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/FenNek55',
    icon: 'mdi-github',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:stasik.karol@gmail.com',
    icon: 'mdi-email',
  },
]

function accessibleLabel(link: SocialLink) {
  return link.external ? `${link.label} (opens in a new tab)` : link.label
}

const navRef = ref<HTMLElement | null>(null)
const { setMode } = useDotWaveInteraction()
let animationCtx: gsap.Context | null = null

const closedColors = {
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  borderColor: 'rgba(255, 255, 255, 0.14)',
  color: 'rgba(237, 237, 237, 0.96)',
}

const openColors = {
  backgroundColor: 'rgba(232, 7, 89, 0.94)',
  borderColor: 'rgba(232, 7, 89, 1)',
  color: '#ffffff',
}

onMounted(() => {
  if (!navRef.value) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  animationCtx = gsap.context(function (this: gsap.Context) {
    const self = this
    const buttons = gsap.utils.toArray<HTMLElement>('.side-social__btn', navRef.value)

    buttons.forEach((btn) => {
      const face = btn.querySelector<HTMLElement>('.side-social__face')
      const label = btn.querySelector<HTMLElement>('.side-social__label')
      const icon = btn.querySelector<HTMLElement>('.side-social__icon')
      if (!face || !label || !icon) return

      let collapsed = 0
      let expanded = 0
      let hovered = false
      let focused = false

      const measure = () => {
        const border = btn.offsetWidth - btn.clientWidth
        collapsed = Math.ceil(icon.offsetWidth + border)
        expanded = Math.ceil(face.scrollWidth + border)
      }

      const applyWidth = (open: boolean) => {
        gsap.set(btn, { width: open ? expanded : collapsed })
      }

      measure()
      gsap.set(btn, { width: collapsed, ...closedColors })
      gsap.set(label, { autoAlpha: 0, x: 10 })

      const open = () => {
        gsap.to(btn, {
          width: expanded,
          ...openColors,
          duration: reduceMotion ? 0 : 0.55,
          ease: 'power4.out',
          overwrite: 'auto',
        })
        gsap.to(label, {
          autoAlpha: 1,
          x: 0,
          duration: reduceMotion ? 0 : 0.4,
          delay: reduceMotion ? 0 : 0.06,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }

      const close = () => {
        gsap.to(label, {
          autoAlpha: 0,
          x: 10,
          duration: reduceMotion ? 0 : 0.18,
          ease: 'power2.in',
          overwrite: 'auto',
        })
        gsap.to(btn, {
          width: collapsed,
          ...closedColors,
          duration: reduceMotion ? 0 : 0.42,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
      }

      const sync = () => {
        if (hovered || focused) open()
        else close()
      }

      const onEnter = () => {
        hovered = true
        sync()
      }
      const onLeave = () => {
        hovered = false
        sync()
      }
      const onFocus = () => {
        focused = true
        sync()
      }
      const onBlur = () => {
        focused = false
        sync()
      }

      btn.addEventListener('pointerenter', onEnter)
      btn.addEventListener('pointerleave', onLeave)
      btn.addEventListener('focus', onFocus)
      btn.addEventListener('blur', onBlur)

      const onResize = () => {
        const wasOpen = hovered || focused
        measure()
        if (wasOpen) {
          applyWidth(true)
          return
        }
        gsap.set(btn, { width: collapsed })
      }

      window.addEventListener('resize', onResize)
      document.fonts?.ready.then(onResize).catch(() => {})

      self.add(() => () => {
        btn.removeEventListener('pointerenter', onEnter)
        btn.removeEventListener('pointerleave', onLeave)
        btn.removeEventListener('focus', onFocus)
        btn.removeEventListener('blur', onBlur)
        window.removeEventListener('resize', onResize)
      })
    })
  }, navRef.value)
})

onBeforeUnmount(() => {
  animationCtx?.revert()
  animationCtx = null
})
</script>

<template>
  <nav ref="navRef" class="side-social" aria-label="Social links">
    <ul
      class="side-social__list"
      @pointerenter="setMode('swirl')"
      @pointerleave="setMode('repel')"
    >
      <li v-for="link in links" :key="link.label">
        <v-btn
          class="side-social__btn"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :aria-label="accessibleLabel(link)"
          :ripple="false"
          rounded="pill"
          variant="flat"
        >
          <span class="side-social__face">
            <span class="side-social__label" aria-hidden="true">{{ link.label }}</span>
            <span class="side-social__icon" aria-hidden="true">
              <v-icon :icon="link.icon" size="22" />
            </span>
          </span>
        </v-btn>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.side-social {
  position: fixed;
  top: 50%;
  right: 1rem;
  z-index: 40;
  transform: translateY(-50%);
  pointer-events: none;
}

.side-social__list {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.7rem;
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: auto;
}

.side-social__btn {
  --size: 3rem;

  pointer-events: auto;
  justify-content: flex-end !important;
  width: var(--size);
  min-width: 0 !important;
  max-width: none !important;
  height: var(--size) !important;
  padding: 0 !important;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  background: rgba(0, 0, 0, 0.55) !important;
  backdrop-filter: blur(8px) saturate(1.35);
  -webkit-backdrop-filter: blur(8px) saturate(1.35);
  color: rgba(237, 237, 237, 0.96) !important;
  box-shadow: none !important;
}

.side-social__btn:focus-visible {
  outline: 2px solid #e80759;
  outline-offset: 3px;
}

.side-social__btn :deep(.v-btn__overlay),
.side-social__btn :deep(.v-btn__underlay) {
  display: none;
}

.side-social__btn :deep(.v-btn__content) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: max-content;
  height: 100%;
  padding: 0;
  gap: 0;
}

.side-social__face {
  display: flex;
  align-items: center;
  height: 100%;
  width: max-content;
}

.side-social__label {
  display: block;
  padding-left: 1.05rem;
  padding-right: 0.2rem;
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  line-height: 1;
  white-space: nowrap;
  opacity: 0;
}

.side-social__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: calc(var(--size) - 2px);
  height: calc(var(--size) - 2px);
}

.side-social__icon :deep(.v-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  font-size: 22px;
  line-height: 1;
}

@media (max-width: 599px) {
  .side-social {
    right: 0.65rem;
  }

  .side-social__btn {
    --size: 2.75rem;
  }
}
</style>
