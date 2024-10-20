import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useDomoLabStore = defineStore('domolab', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const result = ref(null);
    const resultCreate = ref(null);
    const resultCategories = ref(null);
    const resultDetail = ref(null);
    const resultTestCart = ref(null);

    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    return {
        result,
        resultCreate,
        resultCategories,
        resultDetail,
        resultTestCart,
        async listDomolab(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            const {data, error} = await useFetch(`/domo-lab?${queryString}`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                let dates = [];
                for (let i = 0; i < 7; i++) {
                    let date = new Date();
                    date.setDate(date.getDate() + i);
                    let formattedDate = date.toISOString().split('T')[0];
                    let dayOfWeek = daysOfWeek[date.getDay()];
                    let dayNumber = String(date.getDate()).padStart(2, '0');
                    dates.push({
                        date: formattedDate,
                        day_of_week: dayOfWeek,
                        day_number: dayNumber
                    });
                }
                let times = [];
                let time = new Date();
                time.setHours(0, 0, 0, 0);

                for (let i = 0; i < 48; i++) {
                    let hours = String(time.getHours()).padStart(2, '0');
                    let minutes = String(time.getMinutes()).padStart(2, '0');
                    times.push(`${hours}:${minutes}:00`); // append :00 for seconds
                    time.setMinutes(time.getMinutes() + 30);
                }

                result.value = data.value
                for (let i = 0; i < result.value.data.length; i++) {
                    result.value.data[i].dates = dates;
                    result.value.data[i].times = times; // set the times array to each nurse
                }
            } else {
                notify(false, error.value.message)
                result.value = false
            }
        },
        async listDomolabCategories() {
            const {data, error} = await useFetch(`/domo-lab/categories`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultCategories.value = data.value
            } else {
                notify(false, error.value.message)
                resultCategories.value = false
            }
        },
        async createLab(form) {
            const {data} = await useFetch(`/orders/domo-lab`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                body: JSON.stringify(form),
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultCreate.value = data.value
            } else {
                resultCreate.value = false
            }
        },
        async getTestById(id) {
            const {data} = await useFetch(`/domo-lab/${id}`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })

            if (data.value) {
                let dates = [];
                for (let i = 0; i < 7; i++) {
                    let date = new Date();
                    date.setDate(date.getDate() + i);
                    let formattedDate = date.toISOString().split('T')[0];
                    let dayOfWeek = daysOfWeek[date.getDay()];
                    let dayNumber = String(date.getDate()).padStart(2, '0');
                    dates.push({
                        date: formattedDate,
                        day_of_week: dayOfWeek,
                        day_number: dayNumber
                    });
                }

                let times = [];
                let time = new Date();
                time.setHours(0, 0, 0, 0);

                for (let i = 0; i < 48; i++) {
                    let hours = String(time.getHours()).padStart(2, '0');
                    let minutes = String(time.getMinutes()).padStart(2, '0');
                    times.push(`${hours}:${minutes}:00`); // append :00 for seconds
                    time.setMinutes(time.getMinutes() + 30);
                }

                resultDetail.value = data.value;
                resultDetail.value.dates = dates;
                resultDetail.value.times = times;
            } else {
                resultDetail.value = false;
            }
        },
        async cartTest(form) {
            const {data} = await useFetch(`/orders/domo-lab`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`
                },
                body: JSON.stringify(form),
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultTestCart.value = data.value
            } else {
                resultTestCart.value = false
            }
        },
    }
})