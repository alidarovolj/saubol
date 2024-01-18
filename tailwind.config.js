/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                mainColor: "#0043E8",
                bColor: "#9A9BA4"
            },
            width: {
                fifth: "19%",
                half: "48%"
            },
            fontSize: {
                "2xs": "0.6rem"
            }
        },
    },
    plugins: [],
}

