export default defineNuxtConfig({
    app: {
        head: {
            script: [
                {
                    src: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=e268fdb2-5eca-4323-a0ff-3adc629bca82&suggest_apikey=75f2fd93-46b6-4fa7-9641-ee54cab6970c&mode=debug&load=package.full&onload=mscDistance.Ymaps.ready&ns=ymaps',
                    async: true,
                }
            ],
        },
    },
    ssr: true,
    devtools: {
        enabled: false
    },
    css: ["assets/css/style.css", "assets/css/fonts.css"],
    modules: [
        'nuxt-delay-hydration',
        "@pinia/nuxt",
        '@hypernym/nuxt-anime',
        'vue3-carousel-nuxt',
        "@nuxt/eslint"
    ],
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