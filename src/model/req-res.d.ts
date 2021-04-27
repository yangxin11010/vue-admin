namespace ReqRes {
    export interface ResponseResult<T = any> {
        readonly code: number;
        readonly data: T;
        readonly info: string;
    }
    /**
     * 列表数据接口
     */
    export interface ListData<T = any> {
        readonly list: T[];
        readonly page: number;
        readonly size: number;
        readonly pageCount: number;
    }

}
