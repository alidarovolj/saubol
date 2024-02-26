import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useAdminStore = defineStore('admin', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieAdminToken()
    const {adminToken} = storeToRefs(auth)

    const resultOrders = ref(null);
    const resultAdmins = ref(null);
    const resultUsers = ref(null);
    const resultDoctors = ref(null);
    const resultNurses = ref(null);
    const resultServices = ref(null);
    const resultVerification = ref(null);
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        resultOrders,
        resultAdmins,
        resultUsers,
        resultDoctors,
        resultNurses,
        resultServices,
        resultVerification,
        async adminOrders() {
            const {data} = await useFetch(`/admin/orders`, {
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
                for (let i = 0; i < data.value.data.length; i++) {
                    data.value.data[i].created_at = formatDate(data.value.data[i].created_at);
                }
                resultOrders.value = data.value
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
        async adminAdmins() {
            const {data} = await useFetch(`/admin/admins`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultAdmins.value = data.value
            } else {
                resultAdmins.value = false
            }
        },
        async adminUsers() {
            const {data} = await useFetch(`/admin/users`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultUsers.value = data.value
            } else {
                resultUsers.value = false
            }
        },
        async adminDoctors() {
            const {data} = await useFetch(`/admin/doctors`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultDoctors.value = data.value
            } else {
                resultDoctors.value = false
            }
        },
        async adminNurses() {
            const {data} = await useFetch(`/admin/nurses`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultNurses.value = data.value
            } else {
                resultNurses.value = false
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