import {defineStore} from "pinia";

export const useCartStore = defineStore('cart', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultOrder = ref(null);
    const resultClear = ref(null);
    const resultRemovedOrder = ref(null);
    const auth = useAuthStore();
    auth.initCookieToken()
    const {token} = storeToRefs(auth)
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultOrder,
        resultClear,
        resultRemovedOrder,
        async cartList() {
            const {data} = await useFetch(`/users/get-basket`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`
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
        async makeOrder(form) {
            const {data} = await useFetch(`/orders/common`, {
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
                resultOrder.value = data.value
            } else {
                resultOrder.value = false
            }
        },
        async clearBasket() {
            const {data} = await useFetch(`/users/clear-basket`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultClear.value = data.value
            } else {
                resultClear.value = false
            }
        },
        async removeOrder(form) {
            const {data} = await useFetch(`/users/remove-order`, {
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
                resultRemovedOrder.value = data.value
            } else {
                resultRemovedOrder.value = false
            }
        }
    }
})