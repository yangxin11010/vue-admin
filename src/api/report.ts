import request from "@/util/http";
import type { LoginSystemInfo, LoginInfoList } from "@/model/api";

export default {
    addLoginInfo: (params: LoginSystemInfo) => request.post("/report/addLoginInfo", params),
    queryLoginInfo: (params?: Paging) => {
        return request.get<ReqRes.ListData<LoginInfoList>>("/report/queryLoginInfo", params)
    },
};