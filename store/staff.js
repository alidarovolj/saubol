import {defineStore} from "pinia";

export const useStaffStore = defineStore('staff', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultDetail = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultDetail,
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
        }
    }
})