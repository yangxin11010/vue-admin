import axios from "axios";
import { errorMessage } from "@/util/message/index";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000,
});

service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error("service.interceptors.request  --> ", error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        const data = response.data;
        switch (data.code) {
            case 0:
                return data;
            case 1:
                errorMessage(data.info);
                return Promise.reject(data);
            default:
                return data;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
