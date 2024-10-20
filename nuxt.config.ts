export default defineNuxtConfig({
    ssr: true,
    devtools: {
        enabled: false
    },
    css: ["assets/css/style.css", "assets/css/fonts.css"],
    modules: ['nuxt-delay-hydration', "@pinia/nuxt", '@hypernym/nuxt-anime', 'vue3-carousel-nuxt'],
    carousel: {
        prefix: 'myCarousel'
    },
    components: [
        {
            path: "~/components", pathPrefix: false,
        },
    ],
    plugins: [
        "~/plugins/vue3-toastify.ts",
        {src: '~/plugins/maps.ts', mode: 'client'},
    ],
    imports: {
        dirs: ["store", "composables", "composables/*/index.{ts,js,mjs,mts}", "composables/**",],
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "[name].js", chunkFileNames: "[name].js",
            },
        }, transpile: ["@vuepic/vue-datepicker"]
    },
    runtimeConfig: {
        public: {
            API_LINK: process.env.API_LINK
        },
    },
    delayHydration: {
        debug: process.env.NODE_ENV === 'development', mode: 'init'
    },
    pinia: {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
