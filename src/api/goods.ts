import request from "@/util/http";
import { QueryGoods, ShopGood } from "@/model/views/shopGood";

export default {
    queryGoods: (params: QueryGoods) => request.get<ReqRes.ListData<ShopGood>>("/queryGoods", params),
    addGoods: (params: ShopGood) => request.post("/addGoods", params),
};
