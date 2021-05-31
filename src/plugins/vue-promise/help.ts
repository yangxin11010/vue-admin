import { InjectionKey } from "vue";
export type PromiseResponse = {
    result: any;
    error: any;
};

export type ResponseResult<T = any> = {
    readonly code: number;
    readonly data: T;
    readonly info: string;
};

export type ResponseResultList<T = any> = {
    readonly list: T[];
    readonly page: number;
    readonly size: number;
    readonly pageCount: number;
};

export const promiseInjectionKey: InjectionKey<PromiseResponse> = Symbol("promise");
