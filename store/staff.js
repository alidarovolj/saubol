import {defineStore} from "pinia";

export const useStaffStore = defineStore('staff', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultDetail = ref(null);
    const resultSpecs = ref(null);
    const resultSearch = ref(null);
    const resultRegister = ref(null);
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
                resultSearch.value = data.value
            } else {
                resultSearch.value = false
                notify(false, 'Произошла ошибка')
            }
        },
    }
})