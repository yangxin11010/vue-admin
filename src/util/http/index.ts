import http from "./https";
import { urlPlus } from "@/util";
import qs from "qs";

const request = {
    // get
    get: <T>(url: string, params = {}) => http.get<T>(url, { params }),
    // post
    post: <T>(url: string, params = {}) => http.post<T>(url, params),
    // post 参数拼接
    postUrl: <T>(url: string, params = {}) => http.post<T>(urlPlus(url, params)),
    // formData
    postForm: <T>(url: string, params = {}) => http.post<T>(url, qs.stringify(params)),
    // delete
    delete: <T>(url: string, params = {}) => http.delete<T>(url, params),
    // put
    put: <T>(url: string, params = {}) => http.put<T>(url, params),
    // patch
    patch: <T>(url: string, params = {}) => http.patch<T>(url, params),
};

export default request;
