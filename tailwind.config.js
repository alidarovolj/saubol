/** @type {import('tailwindcss').Config} */
export default {
    plugins: [require("daisyui")],
    daisyui: {
        themes: false,
        logs: false,
    },
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
                mainColor: "#FE2D39",
                bColor: "#9A9BA4",
                regText: "#02051C",
                secColor: "#F7FAFF"
            },
            width: {
                fifth: "19%",
                third: "32%",
                half: "49.5%",
                fourth: "24%",
                seventh: "14%"
            },
            fontSize: {
                "2xs": "0.6rem"
            }
        },
    }
}

