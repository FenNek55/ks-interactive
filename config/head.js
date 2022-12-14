const head = {
  title: 'Karol Stasik | web portfolio',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'My name is Karol, I\'m a frontend developer and this is my personal portfolio website' },
    { hid: 'og-type', property: 'og:type', content: 'website' },
    { hid: 'og-title', property: 'og:title', content: 'ks-interactive | Developer portfolio' },
    { hid: 'og-description', property: 'og:description', content: 'My name is Karol, I\'m a frontend developer and this is my personal portfolio website' },
    { hid: 'og-image', property: 'og:image', content: 'https://www.ksinteractive.pl/og.png' },
    { hid: 'og-url', property: 'og:url', content: 'https://www.ksinteractive.pl' },
    { hid: 'og-image-alt', property: 'og:image:alt', content: 'Screenshot of Karol\' portfolio website' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
}

export default head
