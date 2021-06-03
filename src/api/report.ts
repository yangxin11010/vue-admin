import request from "@/util/http";
import { prefixCapi } from "./index"
import type { LoginSystemInfo, LoginInfoList } from "@/model/api";

export default {
    addLoginInfo: (params: LoginSystemInfo) => {
        return request.post(prefixCapi("/report/addLoginInfo"), params)
    },
    queryLoginInfo: (params?: Paging) => {
        return request.get<ReqRes.ListData<LoginInfoList>>(prefixCapi("/report/queryLoginInfo"), params)
    },
};