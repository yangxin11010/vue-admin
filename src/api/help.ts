import request from "@/util/http";
import type { AxiosRequestConfig } from "axios";
import type { Request } from "@model/api"

export default {
    getLocation: (params: AxiosRequestConfig) => request.request(params),
    request: (params: Request) => request.post("/http", params),
};
