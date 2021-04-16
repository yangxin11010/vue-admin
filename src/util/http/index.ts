import http from "./https";
import { urlPlus } from "@/util/util";
import qs from "qs";

export default {
    // get
    get: (url: string, params: object = {}) => http.get(url, { params }),
    // post
    post: (url: string, params: object = {}) => http.post(url, params),
    // post 参数拼接
    postUrl: (url: string, params: object = {}) => http.post(urlPlus(url, params)),
    // formData
    postForm: (url: string, params: object = {}) => http.post(url, qs.stringify(params)),
    // delete
    delete: (url: string, params: object = {}) => http.delete(url, params),
    // put
    put: (url: string, params: object = {}) => http.put(url, params),
    // patch
    patch: (url: string, params: object = {}) => http.patch(url, params),
};
