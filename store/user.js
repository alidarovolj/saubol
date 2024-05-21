import {defineStore} from "pinia";
import {useAuthStore} from "~/store/auth.js";

export const useUserStore = defineStore('user', () => {
    const runtimeConfig = useRuntimeConfig();

    const auth = useAuthStore()
    auth.initCookieAdminToken()
    const {adminToken} = storeToRefs(auth)

    const result = ref(null);
    const resultLogout = ref(null);
    const resultImage = ref(null);
    const resultUpdate = ref(null);
    const resultRemove = ref(null);

    return {
        result,
        resultLogout,
        resultImage,
        resultUpdate,
        resultRemove,
        async getProfile() {
            const {data} = await useFetch(`/auth/me`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                result.value = data.value
            } else {
                result.value = false
                adminToken.value = null
            }
        },
        async logoutProfile() {
            const {data} = await useFetch(`/auth/logout`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultLogout.value = data.value
            } else {
                resultLogout.value = false
            }
        },
        async setImage(file) {
            const formData = new FormData();
            formData.append('img', file);

            const {data} = await useFetch(`/users/set-img`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                body: formData,
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultImage.value = data.value
            } else {
                resultImage.value = false
            }
        },
        async updateProfile(form) {
            const {data} = await useFetch(`/users/profile`, {
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
                resultUpdate.value = data.value
            } else {
                resultUpdate.value = false
            }
        },
        async removeUser(id) {
            const {data} = await useFetch(`/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${adminToken.value}`,
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultRemove.value = data.value
            } else {
                resultRemove.value = false
            }
        }
    }
})