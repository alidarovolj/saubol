import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useUserStore = defineStore('user', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const result = ref(null);
    const resultLogout = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultLogout,
        async getProfile() {
            const {data} = await useFetch(`/auth/me`, {
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
                result.value = false
            }
        },
        async logoutProfile() {
            const {data} = await useFetch(`/auth/logout`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultLogout.value = data.value
            } else {
                resultLogout.value = false
                notify(false, 'Произошла ошибка')
            }
        },
    }
})