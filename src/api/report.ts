import request from "@/util/http";
import type { LoginSystemInfo, LoginInfoList } from "@/model/api";

export default {
    addLoginInfo: (params: LoginSystemInfo) => request.post("/capi/report/addLoginInfo", params),
    queryLoginInfo: (params?: Paging) => {
        return request.get<ReqRes.ListData<LoginInfoList>>("/capi/report/queryLoginInfo", params)
    },
};