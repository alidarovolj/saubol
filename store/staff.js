import {defineStore} from "pinia";

export const useStaffStore = defineStore('staff', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultDetail = ref(null);
    const resultSpecs = ref(null);
    const resultSearch = ref(null);
    const resultRegister = ref(null);
    const resultDoc = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultDetail,
        resultSpecs,
        resultSearch,
        resultRegister,
        resultDoc,
        async getStaff(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            const {data} = await useFetch(`/staff/?${queryString}`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                result.value = data.value
            } else {
                notify(false, 'Произошла ошибка')
            }
        },
        async registerStaff(form) {
            const {data} = await useFetch(`/staff/`, {
                method: 'POST',
                headers: {
                    accept: "application/json"
                },
                body: JSON.stringify(form),
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultRegister.value = data.value
            } else {
                resultRegister.value = false
                notify(false, 'Произошла ошибка')
            }
        },
        async getStaffDetail(id) {
            const {data} = await useFetch(`/staff/` + id, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultDetail.value = data.value
            } else {
                notify(false, 'Произошла ошибка')
            }
        },
        async specializationList() {
            const {data} = await useFetch(`/staff/specialization`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultSpecs.value = data.value
            } else {
                resultSpecs.value = false
                notify(false, 'Произошла ошибка')
            }
        },
        async searchStaff(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            const {data} = await useFetch(`/staff/search/?${queryString}`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                let daysInRussian = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
                for (let i = 0; i < data.value.data.length; i++) {
                    for (let j = 0; j < data.value.data[i].schedule.length; j++) {
                        let date = new Date(data.value.data[i].schedule[j].date);
                        let dayOfWeek = daysInRussian[date.getDay()];
                        data.value.data[i].schedule[j].dayOfWeek = dayOfWeek;
                    }
                }
                resultSearch.value = data.value
            } else {
                resultSearch.value = false
                notify(false, 'Произошла ошибка')
            }
        },
        async importDoc(file) {
            const formData = new FormData();
            formData.append('img', file);

            const {data} = await useFetch(`/staff/import-docs`, {
                method: 'POST',
                headers: {
                    accept: "application/json"
                },
                body: formData,
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultDoc.value = data.value
            } else {
                resultDoc.value = false
                notify(false, 'Произошла ошибка')
            }
        },
    }
})