import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useInventoryStore = defineStore('inventory', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const result = ref(null);
    const resultCategories = ref(null);
    const resultDetail = ref(null);
    const resultInventoryCart = ref(null);

    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultCategories,
        resultDetail,
        resultInventoryCart,
        async listInventory(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            const {data, error} = await useFetch(`/goods?${queryString}`, {
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
        async getInventoryById(id) {
            const {data} = await useFetch(`/goods/${id}`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })

            if (data.value) {
                resultDetail.value = data.value;
            } else {
                resultDetail.value = false;
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
        },
        async cartInventory(form) {
            const {data} = await useFetch(`/orders/goods`, {
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
                resultInventoryCart.value = data.value
            } else {
                resultInventoryCart.value = false
            }
        },
    }
})