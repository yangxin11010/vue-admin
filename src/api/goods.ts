import request from "@/util/http";
import { prefixCapi } from "./index"
import type { QueryGoods, ShopGood } from "@/model/api";

export default {
    queryGoods: (params: QueryGoods) => {
        return request.get<ReqRes.ListData<ShopGood>>(prefixCapi("/queryGoods"), params)
    },
};
