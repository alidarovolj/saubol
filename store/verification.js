import {defineStore} from "pinia";

export const useVerificationStore = defineStore('verification', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultValidation = ref(null);

    const auth = useAuthStore();
    auth.initCookieToken();
    const {token} = storeToRefs(auth);

    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultValidation,
        async sendMessage(form) {
            const {data} = await useFetch(`/auth/send-message?phone_number=${form.phone_number}`, {
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
                notify(false, 'Произошла ошибка')
            }
        },
        async validatePhone(form) {
            const {data} = await useFetch(`/auth/validate-phone`, {
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
                resultValidation.value = data.value
            } else {
                resultValidation.value = false
                notify(false, 'Произошла ошибка')
            }
        }
    }
})