import {defineStore} from "pinia";

export const useJobsStore = defineStore('jobs', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        async jobsList() {
            const {data} = await useFetch(`/job-places`, {
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
                result.value = false
            }
        }
    }
})