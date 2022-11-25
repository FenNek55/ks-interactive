<template>
  <footer class="footer">
    <div class="container footer__container">
      <div>
        <h2 class="footer__title">
          Karol Stasik
        </h2>
        <p class="footer__subtitle">
          Developer portfolio
        </p>
        <div class="footer__icons">
          <a href="https://github.com/FenNek55/ks-interactive">
            <img class="footer__icon" :src="githubIcon" alt="Github icon">
          </a>
          <a href="https://github.com/FenNek55/ks-interactive">
            <img class="footer__icon" :src="linkedinIcon" alt="LinkedIn icon">
          </a>
        </div>
      </div>
      <nav ref="footerNav" class="footer__nav">
        <a class="footer__link footer__link--hero" href="#hero">Top</a>
        <a class="footer__link footer__link--about" href="#about">About</a>
        <a class="footer__link footer__link--skills" href="#skills">Skills</a>
        <a class="footer__link footer__link--contact" href="#contact">Contact</a>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref, onMounted } from '@nuxtjs/composition-api'
import { smoothScrollToItem } from '@/utils/utils'
const githubIcon = require('@/assets/images/icons/github.svg')
const linkedinIcon = require('@/assets/images/icons/linkedin.svg')

const footerNav = ref<HTMLElement | null>(null)

onMounted(() => {
  const linksEl = footerNav.value && footerNav.value.querySelectorAll('.footer__link')
  linksEl?.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      const targetLink = e.target as HTMLLinkElement

      if (!targetLink) {
        return
      }

      smoothScrollToItem(targetLink.getAttribute('href') || '#hero')
    })
  })
})
</script>

<style lang="scss" scoped>
.footer {
    padding: 80px 0;
    position: relative;
    color: $light;
    backdrop-filter: blur(4px);
    text-shadow: 2px 2px 2px black;
    background-color: rgba($dark ,0.8);

    @media(min-width: $breakpoint-md) {
        padding: 120px 0;
    }

    &__container {
        display: grid;
        grid-template-columns: 1fr;
        column-gap: 20px;
        row-gap: 60px;

        @media (min-width: $breakpoint-md) {
            grid-template-columns: 250px 25% 25% 25%;
        }
    }

    &__subtitle {
        letter-spacing: 4px;
        margin-bottom: 12px;
        font-weight: 600;
    }

    &__title {
        font-size: 32px;
    }

    &__icon {
        width: 18px;
        margin-right: 12px;

        &:hover {
            transform: scale(1.2);
            transition: transform 0.2s;
        }
    }

    &__icons {
        display: flex;
    }

    &__link {
        display: block;
        color: $light;
        text-decoration: none;
        padding-bottom: 12px;
        transition: 0.2s;

        &--hero {
            &::after {
                background-color: $mint;
            }
        }

        &--about {
            &::after {
                background-color: $pink;
            }
        }

        &--skills {
            &::after {
                background-color: $blue;
            }
        }

        &--contact {
            &::after {
                background-color: $mint;
            }
        }

        &::after {
            content: '';
            width: 10px;
            height: 10px;
            display: inline-block;
            margin-left: 12px;
            border-radius: 999px;
            transform: translateX(60px);
            transition: 0.2s;
            opacity: 0;
        }

        &:hover {
            transform: translateX(10px);

            &::after {
                transform: translateX(0);
                opacity: 1;
            }
        }
    }
}
</style>
