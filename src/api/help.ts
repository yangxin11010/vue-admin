import request from "@/util/http";
import { prefixCapi } from "./index"
import type { AxiosRequestConfig } from "axios";
import type { Request } from "@model/api";

export default {
    getLocation: (params: AxiosRequestConfig) => {
        return request.request(params)
    },
    // 第三方接口
    request: (params: Request) => {
        return request.post(prefixCapi("/http"), params)
    },
};
