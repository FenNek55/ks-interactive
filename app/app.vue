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
