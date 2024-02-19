import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useBannersStore = defineStore('banners', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieAdminToken()
    const {adminToken} = storeToRefs(auth)

    const resultBanners = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        resultBanners,
        async adminBanners() {
            const {data} = await useFetch(`/admin/banners`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                    const year = date.getFullYear();

                    return `${day}.${month}.${year}`;
                }
                for (let i = 0; i < data.value.length; i++) {
                    data.value[i].created_at = formatDate(data.value[i].created_at);
                }
                resultBanners.value = data.value
            } else {
                resultBanners.value = false
            }
        }
    }
})