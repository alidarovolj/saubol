import {defineNuxtPlugin} from '#app'
import plugin from 'vue-yandex-maps'


const settings = {
    apiKey: '22c55307-cd6b-4d77-a94b-ab90bbfd4cb0', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    // coordorder: 'latlong', // Порядок задания географических координат
    debug: false, // Режим отладки
    // version: '2.1' // Версия Я.Карт
}
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(plugin, settings)
});