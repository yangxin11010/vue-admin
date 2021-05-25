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

export interface LoginSystemInfo {
    browser: string;
    system: string;
    time: string;
    country: string;
    province: string;
    city: string;
    area: string;
    address: string;
    lat: number;
    lng: number;
}

export interface LoginInfoList {
    browser: string;
    system: string;
    time: string;
    country: string;
    province: string;
    city: string;
    area: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
}

export interface Request {
    url: string;
    params?: object;
    method?: "GET" | "POST" | "PUT" | "DELETE";
}

declare let key: any;
