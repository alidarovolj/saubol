import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useAddressesStore = defineStore('addresses', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const resultAddresses = ref(null);
    const resultCreate = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        resultAddresses,
        resultCreate,
        async listAddresses() {
            const {data} = await useFetch(`/users/addresses`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultAddresses.value = data.value
            } else {
                resultAddresses.value = false
                notify(false, 'Произошла ошибка')
            }
        },
        async createAddress(form) {
            const {data} = await useFetch(`/users/addresses`, {
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
                notify(false, 'Произошла ошибка')
            }
        },
    }
})