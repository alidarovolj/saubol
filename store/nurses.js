import {defineStore} from "pinia";

export const useNursesStore = defineStore('nurses', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultDetail = ref(null);
    const resultNurseCart = ref(null);
    const auth = useAuthStore();
    auth.initCookieToken()
    const { token } = storeToRefs(auth)
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    return {
        result,
        resultNurseCart,
        resultDetail,
        async getNurses(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            const {data} = await useFetch(`/nurse/services/?${queryString}`, {
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

                result.value = data.value
                for (let i = 0; i < result.value.data.length; i++) {
                    result.value.data[i].dates = dates;
                    result.value.data[i].times = times; // set the times array to each nurse
                }
            } else {
                result.value = false
            }
        },
        async getNurse(id) {
            const {data} = await useFetch(`/nurse/services/${id}`, {
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
        async cartNurses(form) {
            const {data} = await useFetch(`/nurse`, {
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
                resultNurseCart.value = data.value
            } else {
                resultNurseCart.value = false
            }
        },
    }
})