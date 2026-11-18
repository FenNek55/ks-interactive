<script setup lang="ts">
useSeoMeta({
  title: 'Karol Stasik — Developer Portfolio & Projects',
  description:
    'Developer portfolio. Selected projects spanning LMS, healthcare, and education products.',
  ogTitle: 'Karol Stasik — Developer Portfolio & Projects',
  ogDescription:
    'Developer portfolio. Selected projects spanning LMS, healthcare, and education products.',
  twitterTitle: 'Karol Stasik — Developer Portfolio & Projects',
  twitterDescription:
    'Developer portfolio. Selected projects spanning LMS, healthcare, and education products.',
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
