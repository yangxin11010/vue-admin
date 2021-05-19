export interface QueryGoods extends Paging {
    typeOneId?: number;
    typeTwoId?: number;
}

export interface ShopGood {
    title: string;
    price: string;
    mack: string;
    nice: string;
    supplier: string;
    img_url: string;
    img_list_url: string;
    type_one_id: number;
    type_two_id: number;
}
