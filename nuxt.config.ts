// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["assets/css/style.css", "assets/css/fonts.css"],
  modules: ['nuxt-delay-hydration'],
  delayHydration: {
    debug: process.env.NODE_ENV === 'development', mode: 'init'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
