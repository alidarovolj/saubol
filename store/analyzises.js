import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useAnalyzisesStore = defineStore('analyzises', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieAdminToken()
    const {adminToken} = storeToRefs(auth)

    const result = ref(null);
    const resultChange = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultChange,
        async analyzisesList() {
            const {data} = await useFetch(`/domo-lab`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                result.value = data.value
            } else {
                result.value = false
            }
        },
        async changeAnalyzis(id, form) {
            const {data} = await useFetch(`/admin/domo-lab/` + id, {
                method: 'PUT',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                body: JSON.stringify(form),
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultChange.value = data.value
            } else {
                resultChange.value = false
            }
        },
    }
})