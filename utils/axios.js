import axios from 'axios';
import {stringify} from 'qs';

const createInstance = (adminToken, API_LINK) => {
    const instance = axios.create({
        baseURL: API_LINK,
        headers: {
            Authorization: 'Bearer ' + adminToken,
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
            if (adminToken) {
                config.headers.Authorization = `Bearer ${adminToken}`;
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

    return instance;
}

export default createInstance;