import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useDomoLabStore = defineStore('domolab', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const result = ref(null);
    const resultCreate = ref(null);

    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultCreate,
        async listDomolab() {
            const {data, error} = await useFetch(`/domo-lab`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                result.value = data.value
            } else {
                notify(false, error.value.message)
                result.value = false
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
    }
})