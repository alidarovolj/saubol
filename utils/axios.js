import axios from 'axios';
import {stringify} from 'qs';

const auth = useAuthStore()
auth.initCookieAdminToken()
const {adminToken} = storeToRefs(auth)

const runtimeConfig = useRuntimeConfig();

const instance = axios.create({
    baseURL: runtimeConfig.public.API_LINK,
    headers: {
        Authorization: 'Bearer ' + adminToken.value,
    },
    paramsSerializer: {
        serialize: (params) =>
            stringify(params, {
                encode: false,
                allowDots: true,
                skipNulls: true
            })
    }
});

instance.interceptors.request.use(
    (config) => {
        if (adminToken.value) {
            config.headers.Authorization = `Bearer ${adminToken.value}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
