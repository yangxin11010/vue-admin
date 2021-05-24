import request from "@/util/http";
import type { QueryGoods, ShopGood } from "@/model/api";

export default {
    queryGoods: (params: QueryGoods) => request.get<ReqRes.ListData<ShopGood>>("/capi/queryGoods", params),
};
