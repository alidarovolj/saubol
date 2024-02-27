export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    css: ["assets/css/style.css", "assets/css/fonts.css"],
    modules: ['nuxt-delay-hydration', "@pinia/nuxt"],
    buildModules: [
        '@nuxtjs/pwa',
    ],
    pwa: {
        manifest: {
            name: 'SaubolMed',
            short_name: 'SaubolMed',
            description: 'Забота о вашем здоровье с Saubol: Надежно и Качественно!',
            lang: 'ru'
        },
        meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            mobileAppIOS: true,
            favicon: true,
            name: 'SaubolMed',
            author: 'SaubolMed',
            description: 'Забота о вашем здоровье с Saubol: Надежно и Качественно!',
theme_color: '#ffffff',
            ogHost: 'https://saubolmed.com',
            ogImage: true,
            ogType: 'website',
            ogSiteName: 'SaubolMed',
            ogTitle: true,
            ogDescription: true,
        },
        manifest: {
            name: 'SaubolMed',
            lang: 'ru',
        }
    },
    components: [
        {
            path: "~/components", pathPrefix: false,
        },
    ],
    plugins: [
        "~/plugins/vue3-toastify.ts",
        {src: '~/plugins/maps.ts', mode: 'client'},
        '~/plugins/maska.ts',
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
