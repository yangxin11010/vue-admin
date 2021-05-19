import request from "@/util/http";
import type { LoginSystemInfo } from "@/model/report";

export default {
    addLoginInfo: (params: LoginSystemInfo) => request.post("/report/addLoginInfo", params),
    queryLoginInfo: (params: Paging) => request.post("/report/queryLoginInfo", params),
};