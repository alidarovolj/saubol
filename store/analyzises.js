import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";
import axios from "@/utils/axios.js";

export const useAnalyzisesStore = defineStore('analyzises', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieAdminToken()
    const {adminToken} = storeToRefs(auth)

    const result = ref(null);
    const resultChange = ref(null);
    const resultDetail = ref(null);
    const router = useRouter()

    return {
        result,
        resultChange,
        resultDetail,
        async analyzisesList(param) {
            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axios.get(`/domo-lab`, { params })

            if (response.data) {
                result.value = response.data
            } else {
                result.value = false
            }
        },
        async analyziseDetail(id) {
            let response = await axios.get(`/domo-lab/${id}`)

            if (response.data) {
                resultDetail.value = response.data
            } else {
                resultDetail.value = false
            }
        },
        async changeAnalyzis(id, form) {
            const {data} = await useFetch(`/admin/domo-lab/` + id, {
                method: 'PUT',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                body: JSON.stringify(form),
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultChange.value = data.value
            } else {
                resultChange.value = false
            }
        },
    }
})