import {defineStore} from "pinia";

export const useCartStore = defineStore('cart', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const auth = useAuthStore();
    auth.initCookieToken()
    const { token } = storeToRefs(auth)
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
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
                notify(false, 'Произошла ошибка')
            }
        }
    }
})