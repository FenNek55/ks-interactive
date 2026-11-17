<script setup lang="ts">
useSeoMeta({
  title: 'Karol Stasik — Home',
  description:
    'Full-stack developer portfolio. Selected projects spanning LMS, healthcare, and education products.',
  ogTitle: 'Karol Stasik — Home',
  ogDescription:
    'Full-stack developer portfolio. Selected projects spanning LMS, healthcare, and education products.',
})
</script>

<template>
  <div class="page-container">
    <TopSection />
    <ProjectsSection class="mb-16" />
  </div>
</template>

<style scoped>
.page-container {
  width: min(100% - 2rem, 1280px);
  margin-inline: auto;
}
</style>
