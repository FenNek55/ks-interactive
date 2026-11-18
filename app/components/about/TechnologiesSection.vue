<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type TechnologyGroup = {
  id: string
  label: string
  wide?: boolean
  items: string[]
}

const groups: TechnologyGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    wide: true,
    items: [
      'TypeScript',
      'JavaScript',
      'Vue',
      'Nuxt.js',
      'Vuetify',
      'Pinia',
      'Vuex',
      'React',
      'Next.js',
      'Svelte',
      'SvelteKit',
      'RxJS',
      'Sass',
      'Less',
      'Tailwind CSS',
      'Vite',
      'i18n',
      'Storyblok',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    wide: true,
    items: [
      'Node.js',
      'Express.js',
      'Nitro',
      'Python',
      'FastAPI',
      'Flask',
      'Django',
      'Pydantic',
      'SQLAlchemy',
      'uvicorn',
      'PostgreSQL',
      'MongoDB',
      'Stripe',
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    items: ['Vitest', 'Playwright', 'Cypress', 'Jest', 'Pytest'],
  },
  {
    id: 'tooling',
    label: 'Tooling',
    items: ['Docker', 'Docker Compose', 'Colima', 'CI/CD', 'Git', 'Bitbucket', 'GitHub', 'GitLab', 'AWS', 'Google Cloud Platform', 'Firebase', 'Supabase', 'Vercel', 'Figma', 'AI and LLM tools'],
  },
]

const query = ref<string | null>('')

const trimmedQuery = computed(() => (query.value ?? '').trim())

const normalizedQuery = computed(() => trimmedQuery.value.toLowerCase())

const filteredGroups = computed(() => {
  const q = normalizedQuery.value
  if (!q) return groups

  return groups.flatMap((group) => {
    const labelMatch = group.label.toLowerCase().includes(q)
    const items = group.items.filter(
      (name) => labelMatch || name.toLowerCase().includes(q),
    )
    return items.length ? [{ ...group, items }] : []
  })
})

const totalCount = groups.reduce((sum, group) => sum + group.items.length, 0)

const matchCount = computed(() =>
  filteredGroups.value.reduce((sum, group) => sum + group.items.length, 0),
)

const statusLabel = computed(() => {
  if (!normalizedQuery.value) return `${totalCount} technologies`
  if (matchCount.value === 0) return 'No matches'
  if (matchCount.value === 1) return '1 match'
  return `${matchCount.value} matches`
})

function highlightParts(name: string) {
  const q = normalizedQuery.value
  if (!q) return [{ text: name, hit: false }]

  const index = name.toLowerCase().indexOf(q)
  if (index < 0) return [{ text: name, hit: false }]

  return [
    { text: name.slice(0, index), hit: false },
    { text: name.slice(index, index + q.length), hit: true },
    { text: name.slice(index + q.length), hit: false },
  ].filter((part) => part.text.length > 0)
}

const sizerRef = ref<HTMLElement | null>(null)
const resultsMinHeight = ref(0)
let resultsResizeObserver: ResizeObserver | null = null

function syncResultsHeight() {
  const sizer = sizerRef.value
  if (!sizer) return
  resultsMinHeight.value = sizer.offsetHeight
}

onMounted(() => {
  syncResultsHeight()

  if (typeof ResizeObserver === 'undefined' || !sizerRef.value) return

  resultsResizeObserver = new ResizeObserver(() => {
    syncResultsHeight()
  })
  resultsResizeObserver.observe(sizerRef.value)
})

onBeforeUnmount(() => {
  resultsResizeObserver?.disconnect()
  resultsResizeObserver = null
})
</script>

<template>
  <section class="technologies" aria-labelledby="technologies-heading">
    <div class="d-flex align-center ga-4 mb-8">
      <h2 id="technologies-heading" class="font-weight-bold text-headline-medium mb-0 mt-0">
        <span class="text-primary">Technologies</span> I worked with
      </h2>
    </div>

    <div class="technologies-toolbar">
      <v-text-field
        v-model="query"
        class="technologies-search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
        clearable
        density="comfortable"
        autocomplete="off"
        spellcheck="false"
        aria-controls="technologies-results"
      />
    </div>

    <div
      id="technologies-results"
      class="technologies-results"
      :style="resultsMinHeight ? { minHeight: `${resultsMinHeight}px` } : undefined"
    >
      <div ref="sizerRef" class="technologies-sizer" aria-hidden="true" inert>
        <div class="technologies-groups">
          <article
            v-for="group in groups"
            :key="group.id"
            class="tech-group"
            :class="{ 'tech-group--wide': group.wide }"
          >
            <header class="tech-group__header">
              <h3>{{ group.label }}</h3>
              <span class="tech-group__rule" />
              <span class="tech-group__count">{{ group.items.length }}</span>
            </header>
            <ul class="tech-group__list">
              <li v-for="tech in group.items" :key="tech">
                <span class="tech-chip">
                  <span class="tech-chip__accent" />
                  <span class="tech-chip__label">{{ tech }}</span>
                </span>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <p v-if="filteredGroups.length === 0" class="technologies-empty">
        Nothing matches “{{ trimmedQuery }}”. Try a shorter name, like Vue or Docker.
      </p>

      <div v-else class="technologies-groups">
        <article
          v-for="group in filteredGroups"
          :key="group.id"
          class="tech-group bg-blurred"
          :class="{ 'tech-group--wide': group.wide || filteredGroups.length === 1 }"
        >
          <header class="tech-group__header">
            <h3 :id="`tech-group-${group.id}`">
              <template v-for="(part, index) in highlightParts(group.label)" :key="index">
                <mark v-if="part.hit" class="tech-group__hit">{{ part.text }}</mark>
                <template v-else>{{ part.text }}</template>
              </template>
            </h3>
            <span class="tech-group__rule" aria-hidden="true" />
            <span class="tech-group__count">{{ group.items.length }}</span>
          </header>

          <ul class="tech-group__list" :aria-labelledby="`tech-group-${group.id}`">
            <li v-for="tech in group.items" :key="tech">
              <span class="tech-chip">
                <span class="tech-chip__accent" aria-hidden="true" />
                <span class="tech-chip__label">
                  <template v-for="(part, index) in highlightParts(tech)" :key="index">
                    <mark v-if="part.hit">{{ part.text }}</mark>
                    <template v-else>{{ part.text }}</template>
                  </template>
                </span>
              </span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.technologies {
  width: min(100% - 2rem, 48rem);
  margin-inline: auto;
  padding-bottom: 4rem;
}

.technologies-toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.15rem;
}

.technologies-search :deep(.v-field) {
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(8px) saturate(1.25);
  -webkit-backdrop-filter: blur(8px) saturate(1.25);
}

.technologies-search :deep(.v-field__outline) {
  --v-field-border-opacity: 0.16;
}

.technologies-search :deep(.v-field__prepend-inner .v-icon) {
  color: #e80759;
  opacity: 1;
}

.technologies-count {
  margin: 0;
  font-family: 'Syne', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(222, 222, 222, 0.62);
}

.technologies-results {
  position: relative;
}

.technologies-sizer {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}

.technologies-empty {
  margin: 0;
  padding: 1.35rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.15rem;
  background: rgba(0, 0, 0, 0.35);
  color: rgba(222, 222, 222, 0.88);
  line-height: 1.55;
}

.technologies-groups {
  display: grid;
  gap: 0.85rem;
}

.tech-group {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.15rem;
  padding: 1rem 1.05rem 1.15rem;
}

.tech-group::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 46%;
  background: linear-gradient(180deg, transparent, rgba(232, 7, 89, 0.07));
  pointer-events: none;
}

.tech-group__header,
.tech-group__list {
  position: relative;
  z-index: 1;
}

.tech-group__header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.85rem;
}

.tech-group__header h3 {
  margin: 0;
  font-family: 'Syne', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #e80759;
}

.tech-group__hit {
  background: rgba(232, 7, 89, 0.28);
  color: inherit;
  border-radius: 0.15em;
}

.tech-group__rule {
  flex: 1 1 auto;
  height: 1px;
  background: linear-gradient(90deg, rgba(232, 7, 89, 0.7), rgba(232, 7, 89, 0));
}

.tech-group__count {
  font-family: 'Syne', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: rgba(222, 222, 222, 0.5);
}

.tech-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.75rem 0.38rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
  color: rgba(237, 237, 237, 0.94);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.tech-chip:hover {
  border-color: rgba(232, 7, 89, 0.55);
  background: rgba(232, 7, 89, 0.12);
}

.tech-chip__accent {
  flex: 0 0 auto;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 1px;
  background: #e80759;
  box-shadow: 0 0 8px rgba(232, 7, 89, 0.7);
}

.tech-chip mark {
  background: rgba(232, 7, 89, 0.42);
  color: #fff;
  border-radius: 0.15em;
}

@media (min-width: 700px) {
  .technologies-toolbar {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .technologies-search {
    flex: 1 1 auto;
  }

  .technologies-count {
    flex: 0 0 auto;
  }

  .technologies-groups {
    grid-template-columns: 1fr 1fr;
  }

  .tech-group--wide {
    grid-column: 1 / -1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tech-chip {
    transition: none;
  }
}
</style>
