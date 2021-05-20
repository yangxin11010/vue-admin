import axios from "axios";
import { errorMessage } from "@/util/message";
import Store from "@/store";
import { getUrlParams } from "@/util"

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
            config: { url },
        } = response;
        const { showElMsg } = getUrlParams(url);

        switch (data.code) {
            case 0:
                return data;
            case 1:
                JSON.parse(showElMsg) && errorMessage(data.info);
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
