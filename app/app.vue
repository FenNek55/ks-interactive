<template>
  <div class="page-shell">
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
    <main class="page-main">
      <NuxtPage />
    </main>
    <TopNav />
    <SideSocialNav />
  </div>
</template>
