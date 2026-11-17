<script setup lang="ts">
const technologies = [
  // Frontend
  'TypeScript',
  'JavaScript',
  'Vue',
  'Nuxt.js',
  'Vuetify',
  'Pinia',
  'Vuex',
  'React',
  'Next.js',
  'Sass',
  'Less',
  'Tailwind CSS',
  'Vite',
  'i18n',
  'Storyblok',
  // Backend
  'Node.js',
  'Express.js',
  'Nitro',
  'Python',
  'Django',
  'Pydantic',
  'SQLAlchemy',
  'PostgreSQL',
  'MongoDB',
  'Supabase',
  'Stripe',
  // Testing
  'Vitest',
  'Playwright',
  'Cypress',
  'Jest',
  // Tooling & infrastructure
  'Docker',
  'CI/CD',
  'Git',
  'AWS',
  'Figma',
  'AI and LLM tools',
]
</script>

<template>
  <section class="technologies">
    <div class="d-flex align-center ga-4 mb-8">
      <h2 class="font-weight-bold text-headline-medium mb-0 mt-0">
        <span class="text-primary">Technologies</span> I worked with
      </h2>
    </div>

    <ul class="technologies-list">
      <li v-for="tech in technologies" :key="tech" class="technologies-item">
        <span class="technologies-item__accent" aria-hidden="true" />
        <span class="technologies-item__label">{{ tech }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.technologies {
  width: min(100% - 2rem, 48rem);
  margin-inline: auto;
  padding-bottom: 4rem;
}

.technologies-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.technologies-item {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  min-width: 0;
}

.technologies-item__accent {
  flex: 0 0 auto;
  width: 0.45rem;
  height: 0.45rem;
  margin-top: 0.35em;
  background: #e80759;
  border-radius: 1px;
}

.technologies-item__label {
  color: rgba(222, 222, 222, 0.92);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.55;
}

@media (min-width: 700px) {
  .technologies-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
