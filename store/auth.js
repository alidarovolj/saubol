export const useAuthStore = defineStore("auth", () => {
    const token = ref();
    const adminToken = ref();
    return {
        token,
        adminToken,
        initCookieToken() {
            const cookie = useCookie("token", {
                sameSite: true,
                maxAge: 60 * 60 * 24,
            });
            token.value = cookie.value;
            watch(token, () => (cookie.value = token.value));
        },
        initCookieAdminToken() {
            const cookie = useCookie("adminToken", {
                sameSite: true,
                maxAge: 60 * 60 * 24,
            });
            adminToken.value = cookie.value;
            watch(adminToken, () => (cookie.value = adminToken.value));
        },
    };
});