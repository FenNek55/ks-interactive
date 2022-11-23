import head from './config/head'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  server: {
    port: 3030 // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/index.scss'],
  styleResources: {
    scss: [
      '~/assets/styles/_colors.scss',
      '~/assets/styles/_utils.scss',
      '~/assets/styles/_variables.scss',
      '~/assets/styles/_fonts.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/gsap.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
