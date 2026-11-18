// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxt/fonts', '@nuxt/icon/module', 'vuetify-nuxt-module'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Karol Stasik — Developer Portfolio & Projects',
      meta: [
        {
          name: 'description',
          content:
            'Portfolio of Karol Stasik — developer turning business challenges into user-friendly solutions.',
        },
      ],
    },
  },
  // Prerender all routes to static HTML — no Node server at runtime
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
    },
  },
  css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/css/main.css'],
  vuetify: {
    vuetifyOptions: {
      theme: {
        // Explicit theme avoids SSR light vs client dark hydration mismatches
        // that happen with the default `system` preference.
        defaultTheme: 'dark',
        themes: {
          light: {
            colors: {
              primary: '#e80759',
            },
          },
          dark: {
            colors: {
              primary: '#e80759',
              background: '#0a0a0c',
              surface: '#0a0a0c',
            },
          },
        },
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: ['three'],
    },
  },
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      preload: true,
    },
    global: true,
    families: [
      { name: 'Roboto', provider: 'google' },
      { name: 'Syne', provider: 'google', weights: [500, 600, 700, 800, 900] },
    ],
  },
})
