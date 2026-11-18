<script setup lang="ts">
const siteUrl = 'https://www.ksinteractive.dev'
const route = useRoute()
const pageUrl = computed(() => {
  const path = route.path === '/' ? '' : route.path
  return `${siteUrl}${path}`
})

useSeoMeta({
  ogSiteName: 'KS Interactive',
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage: `${siteUrl}/og.jpg`,
  ogImageSecureUrl: `${siteUrl}/og.jpg`,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Karol Stasik — Developer Portfolio',
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/og.jpg`,
})
</script>

<template>
  <div class="page-shell">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <ClientOnly>
      <DotWaveBackground />
      <template #fallback>
        <div class="dot-wave" aria-hidden="true">
          <div class="dot-wave__atmosphere" />
          <div class="dot-wave__glow dot-wave__glow--primary" />
          <div class="dot-wave__glow dot-wave__glow--cool" />
          <div class="dot-wave__glow dot-wave__glow--horizon" />
          <div class="dot-wave__vignette" />
        </div>
      </template>
    </ClientOnly>
    <TopNav />
    <main id="main-content" class="page-main" tabindex="-1">
      <NuxtPage />
    </main>
    <SideSocialNav />
  </div>
</template>
