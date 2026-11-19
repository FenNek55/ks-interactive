<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDisplay } from 'vuetify'

type ProjectImage = {
  src: string
  alt: string
}

type Project = {
  name: string
  size: 'sm' | 'lg'
  images?: ProjectImage[]
  description: string
  techStack: string[]
}

const { mdAndUp } = useDisplay()
const sectionRef = ref<HTMLElement | null>(null)
let animationCtx: gsap.Context | null = null

const projects: Project[] = [
  {
    name: 'Skillhabit',
    size: 'lg',
    images: [
      { src: '/images/skillhabit1.jpg', alt: 'Skillhabit — course creator and LMS dashboard' },
      { src: '/images/skillhabit2.jpg', alt: 'Skillhabit — analytics and certification views' },
      { src: '/images/skillhabit3.jpg', alt: 'Skillhabit — multilingual course content UI' },
    ],
    description:
      'A microservices-based Learning Management System (LMS) featuring built-in analytics and certification tools. It includes an intuitive course creator accelerated by AI tooling and an automated LLM translation pipeline for scalable multilingual support and white-label branding.',
    techStack: [
      'TypeScript',
      'JavaScript',
      'Sass',
      'Vue',
      'Vuetify',
      'Pinia',
      'Playwright',
      'Vitest',
      'Node.js',
      'Express.js',
      'Python',
      'Stripe',
      'Figma',
      'Docker',
      'Vite',
      'Vuex',
      'CI/CD',
      'i18n',
      'AWS-compatible EU cloud solutions',
      'AI and LLM tools',
    ],
  },
  {
    name: 'Symptomate',
    size: 'lg',
    images: [
      { src: '/images/symptomate1.jpg', alt: 'Symptomate — symptom checker interview flow' },
      { src: '/images/symptomate2.jpg', alt: 'Symptomate — preliminary diagnosis results screen' },
      { src: '/images/symptomate3.jpg', alt: 'Symptomate — multilingual triage interface' },
    ],
    description:
      'A medical symptom checker powered by Infermedica\'s custom inference engine. It analyzes user inputs to generate preliminary diagnoses and streamline patient triage. The platform features an accessible UI, supports 14 languages, and provides robust API endpoints for external healthcare integrations.',
    techStack: [
      'Django',
      'Python',
      'Pydantic',
      'SQLAlchemy',
      'TypeScript',
      'Vue',
      'Nuxt.js',
      'Storyblok',
      'i18n',
      'Docker',
      'CI/CD',
    ],
  },
  {
    name: 'Symptomate Chatbot Review Tool',
    size: 'sm',
    description:
      'An internal tool enabling doctors and developers to audit the Symptomate Chatbot\'s responses. It utilizes anonymized user data to continuously refine medical accuracy and improve the underlying inference engine.',
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Playwright', 'Jest', 'Docker', 'CI/CD'],
  },
  {
    name: 'Skillhabit Dev Harness',
    size: 'sm',
    description:
      'A local development orchestrator that consolidates a complex microservice architecture into a single runnable mesh. Designed to support agentic workflows, it eliminates manual service configuration and allows developers and AI agents to ship cross-stack features significantly faster.',
    techStack: ['Docker', 'Colima', 'Python', 'Bash', 'Git', 'AWS CLI', 'MongoDB', 'PostgreSQL', 'Vue', 'TypeScript', 'Pinia', 'Pinia Colada', 'Tailwind CSS'],
  },
  {
    name: 'Symptomate Chatbot',
    size: 'lg',
    images: [
      { src: '/images/symptomate-chat1.jpg', alt: 'Symptomate Chatbot — conversational triage chat UI' },
      { src: '/images/symptomate-chat2.jpg', alt: 'Symptomate Chatbot — medical guidance response view' },
    ],
    description:
      'An AI-driven medical chatbot built on the Symptomate API. It bridges the conversational flexibility of Large Language Models (LLMs) with a validated medical inference engine, providing patients with a safe and intuitive triage experience.',
    techStack: ['TypeScript', 'Vue', 'Nuxt.js', 'Vite', 'Vitest', 'Cypress', 'Sass'],
  },
  {
    name: 'RemoEdu.pl',
    size: 'lg',
    images: [
      { src: '/images/remoedu1.jpg', alt: 'RemoEdu.pl — teacher worksheet library' },
      { src: '/images/remoedu2.jpg', alt: 'RemoEdu.pl — classroom smartboard game view' },
      { src: '/images/remoedu3.jpg', alt: 'RemoEdu.pl — digital blackboard annotation mode' },
      { src: '/images/remoedu4.jpg', alt: 'RemoEdu.pl — subscription and materials browser' },
    ],
    description:
      'A subscription-based SaaS platform tailored for primary school teachers. Optimized for classroom smartboards, it features a searchable database of PDF worksheets, educational games, and a digital blackboard mode that lets educators display and annotate materials in real-time.',
    techStack: [
      'Node.js',
      'PostgreSQL',
      'Nitro',
      'TypeScript',
      'Vue',
      'Nuxt.js',
      'Pinia',
      'Vite',
      'Vitest',
      'Playwright',
      'Sass',
      'Docker',
      'CI/CD',
      'Supabase',
      'Stripe',
    ],
  },
  {
    name: 'RemoEdu Recommendation Engine',
    size: 'sm',
    description:
      'Complementary service to the RemoEdu.pl platform, built as a standalone Python RAG microservice that recommends primary school worksheets aligned with the official Polish curriculum. It uses metadata-filtered dual retrieval to match teacher queries against both existing classroom materials and curriculum standards, keeping AI workloads and vector storage completely decoupled from the main application.',
    techStack: ['Python', 'FastAPI', 'LlamaIndex', 'PostgreSQL', 'pgvector', 'Pydantic', 'SQLAlchemy', 'Docker'],
  },
  {
    name: 'Infermedica.com',
    size: 'lg',
    images: [
      { src: '/images/infermedica1.jpg', alt: 'Infermedica.com — marketing homepage layout' },
      { src: '/images/infermedica2.jpg', alt: 'Infermedica.com — product and content page' },
    ],
    description:
      'Infermedica\'s main website, migrated from a legacy static codebase to a modern headless CMS architecture. Built with Nuxt 3 and Storyblok, it relies on Incremental Static Generation (ISG) and i18n to deliver sub-second Core Web Vitals and scalable multilingual content.',
    techStack: [
      'TypeScript',
      'Vue',
      'Nuxt.js',
      'Pinia',
      'Vite',
      'Vitest',
      'Cypress',
      'Sass',
      'Docker',
      'CI/CD',
      'i18n',
      'Storyblok CMS',
      'Incremental Static Generation (ISG)',
    ],
  },
]

function entersFromRight(index: number) {
  const project = projects[index]
  if (project && project.size === 'sm') {
    let positionInRow = 0
    for (let i = index - 1; i >= 0; i -= 1) {
      const previous = projects[i]
      if (previous?.size !== 'sm') break
      positionInRow += 1
    }
    return positionInRow % 2 === 1
  }

  const largeIndex = projects.slice(0, index + 1).filter(item => item.size === 'lg').length - 1
  return largeIndex % 2 === 1
}

onMounted(() => {
  if (!sectionRef.value || !import.meta.client) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  gsap.registerPlugin(ScrollTrigger)

  animationCtx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.project-card', sectionRef.value)

    cards.forEach((card, index) => {
      const fromX = entersFromRight(index) ? 72 : -72

      gsap.from(card, {
        x: fromX,
        opacity: 0,
        duration: 0.95,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  animationCtx?.revert()
  animationCtx = null
})
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="projects-section"
    aria-labelledby="projects-heading"
    tabindex="-1"
  >
    <div class="d-flex align-center ga-4 mb-8">
      <h2 id="projects-heading" class="font-weight-bold text-headline-medium mb-0 mt-0">
        What i <span class="text-primary">worked on</span>
      </h2>
    </div>

    <div class="projects-grid">
      <v-card
        v-for="(project, index) in projects"
        :key="project.name"
        rounded="xl"
        variant="flat"
        theme="dark"
        border
        class="project-card bg-blurred overflow-hidden"
        :class="[
          `project-card--${project.size}`,
          { 'project-card--reverse': project.size === 'lg' && entersFromRight(index) },
        ]"
      >
        <div v-if="project.size === 'lg' && project.images?.length" class="project-card__media">
          <v-carousel
            class="project-card__carousel"
            hide-delimiter-background
            show-arrows
            color="primary"
            :height="mdAndUp ? 420 : 240"
          >
            <v-carousel-item
              v-for="image in project.images"
              :key="image.src"
              :src="image.src"
              :alt="image.alt"
              cover
              position="top center"
            />
          </v-carousel>
        </div>

        <div class="project-card__body">
          <p class="project-card__index text-primary">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="project-card__index-rule" aria-hidden="true" />
          </p>
          <h3 class="text-headline-small font-weight-bold mt-0 mb-3">
            {{ project.name }}
          </h3>
          <p class="project-card__description text-body-large text-readable-muted">
            {{ project.description }}
          </p>
        </div>

        <div class="project-card__stack">
          <p :id="`stack-label-${index}`" class="project-card__stack-label">Stack</p>
          <ul class="project-card__chips" :aria-labelledby="`stack-label-${index}`">
            <li v-for="tech in project.techStack" :key="tech">
              {{ tech }}
            </li>
          </ul>
        </div>
      </v-card>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  /* Cards slide in on the x-axis; without a clip their offset widens the page on mobile. */
  overflow-x: clip;
}

.projects-section:focus {
  outline: none;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

.project-card {
  display: grid;
  min-width: 0;
  grid-template-columns: 1fr;
  grid-template-areas:
    'media'
    'body'
    'stack';
}

.project-card--sm {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card--sm .project-card__body {
  flex: 1 1 auto;
  justify-content: flex-start;
}

.project-card__media {
  grid-area: media;
  min-height: 240px;
  position: relative;
}

.project-card__carousel {
  height: 100% !important;
}

.project-card__body {
  grid-area: body;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem 1.35rem 1.25rem;
}

.project-card__index {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 0.85rem;
  font-family: 'Syne', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.project-card__index-rule {
  width: 2.25rem;
  height: 1px;
  background: currentColor;
  opacity: 0.85;
}

.project-card__description {
  margin: 0;
  line-height: 1.65;
}

.project-card__stack {
  grid-area: stack;
  padding: 0.95rem 1.35rem 1.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(232, 7, 89, 0.045));
}

.project-card__stack-label {
  margin: 0 0 0.65rem;
  font-family: 'Syne', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #e80759;
}

.project-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-card__chips li {
  padding: 0.32rem 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
  color: rgba(237, 237, 237, 0.92);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.01em;
}

@media (min-width: 960px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }

  .project-card--lg {
    grid-column: 1 / -1;
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    grid-template-areas:
      'media body'
      'stack stack';
  }

  .project-card--lg.project-card--reverse {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
    grid-template-areas:
      'body media'
      'stack stack';
  }

  .project-card__media {
    min-height: 420px;
  }

  .project-card__body {
    padding: 2.25rem 2.4rem;
  }

  .project-card__stack {
    padding: 1rem 1.5rem 1.15rem;
  }
}
</style>
