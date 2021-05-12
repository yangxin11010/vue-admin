import http from "./https";
import { urlPlus } from "@/util";
import qs from "qs";

const request = {
    // get
    get: <T>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.get<T>(url, { params: { ...params, showElMsg } });
    },
    // post
    post: <T>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.post<T>(url, (params = { ...params, showElMsg }));
    },
    // post 参数拼接
    postUrl: <T>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.post<T>(urlPlus(url, params), (params = { showElMsg }));
    },
    // put
    put: <T>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.put<T>(url, (params = { ...params, showElMsg }));
    },
    // patch
    patch: <T>(url: string, params = {}, showElMsg: boolean = true) => {
        return http.patch<T>(url, (params = { ...params, showElMsg }));
    },
    // delete
    delete: <T>(url: string, params = {}) => {
        return http.delete<T>(url, (params = { ...params }));
    },
    // formData
    postForm: <T>(url: string, params = {}) => http.post<T>(url, qs.stringify(params)),
};


export default request;
