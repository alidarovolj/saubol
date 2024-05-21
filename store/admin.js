import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";
import createInstance from "~/utils/axios.js";

export const useAdminStore = defineStore('admin', () => {
    const runtimeConfig = useRuntimeConfig();

    const router = useRouter()

    const auth = useAuthStore()
    auth.initCookieAdminToken()
    const {adminToken} = storeToRefs(auth)

    const axiosInstance = createInstance(adminToken.value, runtimeConfig.public.API_LINK);

    const resultOrders = ref(null);
    const resultAdmins = ref(null);
    const resultUsers = ref(null);
    const resultDoctors = ref(null);
    const resultNurses = ref(null);
    const resultServices = ref(null);
    const resultVerification = ref(null);
    const resultLaborants = ref(null);
    const resultInventory = ref(null);

    return {
        resultOrders,
        resultAdmins,
        resultUsers,
        resultDoctors,
        resultNurses,
        resultServices,
        resultVerification,
        resultLaborants,
        resultInventory,
        async adminOrders(param) {
            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axiosInstance.get(`/admin/orders`, { params })
            if (response.data) {
                const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                    const year = date.getFullYear();

                    return `${day}.${month}.${year}`;
                }
                for (let i = 0; i < response.data.data.length; i++) {
                    response.data.data[i].created_at = formatDate(response.data.data[i].created_at);
                }
                resultOrders.value = response.data
            } else {
                resultOrders.value = false
            }
        },
        async staffVerification(id, form) {
            const {data} = await useFetch(`admin/staff/` + id, {
                method: 'PATCH',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                body: JSON.stringify(form),
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultVerification.value = data.value
            } else {
                resultVerification.value = false
            }
        },
        async adminAdmins(param) {
            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axiosInstance.get(`/admin/admins`, { params })

            if (response.data) {
                resultAdmins.value = response.data
            } else {
                resultAdmins.value = false
            }
        },
        async adminUsers(param) {

            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axiosInstance.get(`/admin/users`, { params })

            if (response.data) {
                resultUsers.value = response.data
            } else {
                resultUsers.value = false
            }
        },
        async adminDoctors(param) {

            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axiosInstance.get(`/admin/doctors`, { params })

            if (response.data) {
                resultDoctors.value = response.data
            } else {
                resultDoctors.value = false
            }
        },
        async adminNurses(param) {
            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axiosInstance.get(`/admin/nurses`, { params })

            if (response.data) {
                resultNurses.value = response.data
            } else {
                resultNurses.value = false
            }
        },
        async adminLaborants(param) {
            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axiosInstance.get(`/admin/laborants`, { params })

            if (response.data) {
                resultLaborants.value = response.data
            } else {
                resultLaborants.value = false
            }
        },
        async adminInventory(param) {
            const params = !param ? {...router.currentRoute.value.query} : {
                ...router.currentRoute.value.query,
                ...param
            }

            let response = await axiosInstance.get(`/goods`, { params })

            if (response.data) {
                resultInventory.value = response.data
            } else {
                resultInventory.value = false
            }
        },
        async adminServices() {
            const {data} = await useFetch(`/admin/services`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultServices.value = data.value
            } else {
                resultServices.value = false
            }
        }
    }
})