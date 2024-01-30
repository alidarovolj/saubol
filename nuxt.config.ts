export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    css: ["assets/css/style.css", "assets/css/fonts.css"],
    modules: ['nuxt-delay-hydration', "@pinia/nuxt"],
    components: [
        {
            path: "~/components", pathPrefix: false,
        },
    ],
    plugins: ["~/plugins/vue3-toastify.ts"],
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
