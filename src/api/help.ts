import request from "@/util/http";
import type { AxiosRequestConfig } from "axios";
import type { Request } from "@model/api"

export default {
    getLocation: (params: AxiosRequestConfig) => request.request(params),
    // 第三方接口
    request: (params: Request) => request.post("/capi/http", params),
};
