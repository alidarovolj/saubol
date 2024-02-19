import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useOrdersStore = defineStore('orders', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)

    const result = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        async listOrders() {
            const {data} = await useFetch(`/users/profile/orders`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                // const formatDate = (dateString) => {
                //     const date = new Date(dateString);
                //     const day = String(date.getDate()).padStart(2, '0');
                //     const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                //     const year = date.getFullYear();
                //
                //     return `${day}.${month}.${year}`;
                // }
                // for (let i = 0; i < data.value.data.length; i++) {
                //     data.value.data[i].created_at = formatDate(data.value.data[i].created_at);
                // }
                result.value = data.value
            } else {
                result.value = false
            }
        }
    }
})