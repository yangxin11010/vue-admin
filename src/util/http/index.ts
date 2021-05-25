import { AxiosRequestConfig } from "axios";
import http from "./https";
import { urlPlus } from "@/util";
import qs from "qs";

const request = {
    /**
     * request
     * @param params
     * @param showElMsg
     * @returns Promise
     */
    request: <T = any>(params: AxiosRequestConfig, showElMsg: boolean = true) => {
        const getParams = params.params;
        params.params = {
            ...getParams,
            showElMsg,
        };
        return http.request<T>(params);
    },
    /**
     * get 请求
     * @param url
     * @param params
     * @param showElMsg
     * @returns Promise
     */
    get: <T = any>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.get<T>(urlPlus(url, { showElMsg }), { params });
    },
    /**
     * post 请求
     * @param url
     * @param params
     * @param showElMsg
     * @returns Promise
     */
    post: <T = any>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.post<T>(urlPlus(url, { showElMsg }), params);
    },
    /**
     * post 请求 参数拼接在 url 后面
     * @param url
     * @param params
     * @param showElMsg
     * @returns Promise
     */
    postUrl: <T = any>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.post<T>(urlPlus(url, { ...params, showElMsg }), params);
    },
    /**
     * post 请求formData
     * @param url
     * @param params
     * @param showElMsg
     * @returns
     */
    postForm: <T = any>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.post<T>(urlPlus(url, { showElMsg }), qs.stringify(params));
    },
    /**
     * put 请求
     * @param url
     * @param params
     * @param showElMsg
     * @returns
     */
    put: <T = any>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.put<T>(urlPlus(url, { showElMsg }), params);
    },
    /**
     * patch 请求
     * @param url
     * @param params
     * @param showElMsg
     * @returns
     */
    patch: <T = any>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.patch<T>(urlPlus(url, { showElMsg }), params);
    },
    /**
     * delete 请求
     * @param url
     * @param params
     * @param showElMsg
     * @returns
     */
    delete: <T = any>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.delete<T>(urlPlus(url, { showElMsg }), params);
    },
};

export default request;
