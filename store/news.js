import {defineStore} from "pinia";

export const useNewsStore = defineStore('news', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultDetail = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultDetail,
        async newsList() {
            const {data} = await useFetch(`/news`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
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
                for (let i = 0; i < data.value.data.length; i++) {
                    data.value.data[i].created_at = formatDate(data.value.data[i].created_at);
                }
                result.value = data.value
            } else {
                result.value = false
            }
        },
        async detailNews(slug) {
            const {data} = await useFetch(`/news/slug/` + slug, {
                method: 'GET',
                headers: {
                    accept: "application/json"
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
                resultDetail.value = data.value
                resultDetail.value.created_at = formatDate(data.value.created_at);
            } else {
                resultDetail.value = false
            }
        }
    }
})