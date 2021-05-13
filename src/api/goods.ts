import request from "@/util/http";
import type { QueryGoods, ShopGood } from "@/model/shopGood";

export default {
    queryGoods: (params: QueryGoods) => request.get<ReqRes.ListData<ShopGood>>("/queryGoods", params),
    addGoods: (params: ShopGood) => request.post("/addGoods", params),
};
