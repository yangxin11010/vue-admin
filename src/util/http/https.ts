import axios from "axios";
import { errorMessage } from "@/util/message";
import Store from "@/store";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000,
});

service.interceptors.request.use(
    (config) => {
        const token = Store.getters.token;
        token && (config.headers["token"] = token);
        return config;
    },
    (error) => {
        console.error("service.interceptors.request  --> ", error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        const {
            data,
            config: {
                params: { showElMsg },
            },
        } = response;
        switch (data.code) {
            case 0:
                return data;
            case 1:
                showElMsg && errorMessage(data.info);
                return Promise.reject(data);
            default:
                return data;
        }
    },
    (error) => {
        console.error("service.interceptors.response  --> ", error);
        return Promise.reject(error);
    }
);

export default service;
