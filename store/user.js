import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useUserStore = defineStore('user', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const result = ref(null);
    const resultLogout = ref(null);
    const resultImage = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultLogout,
        resultImage,
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
        async setImage(file) {
            const formData = new FormData();
            formData.append('img', file);

            const {data} = await useFetch(`/users/set-img`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                body: formData,
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultImage.value = data.value
            } else {
                resultImage.value = false
                notify(false, 'Произошла ошибка')
            }
        }
    }
})