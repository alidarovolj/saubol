import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useInventoryStore = defineStore('inventory', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const result = ref(null);
    const resultCategories = ref(null);

    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultCategories,
        async listInventory() {
            const {data, error} = await useFetch(`/goods`, {
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
        async listInventoryCategories() {
            const {data, error} = await useFetch(`/goods/categories`, {
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
        }
    }
})