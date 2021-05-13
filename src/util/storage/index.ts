interface StorageApi {
    getItem: (key: string) => any;
    setItem: (key: string, value: any) => void;
    removeItem: (key: string) => void;
}
export type SessionWay = "session" | "location";

class StorageProxy implements StorageApi {
    protected storage: StorageApi;

    constructor(storageType: StorageApi) {
        this.storage = storageType;
    }

    public getItem(key: string) {
        return JSON.parse(this.storage.getItem(key));
    }

    public setItem(key: string, value: any) {
        this.storage.setItem(key, value);
    }

    public removeItem(key: string) {
        this.storage.removeItem(key);
    }
}

export const session = new StorageProxy(sessionStorage);
export const location = new StorageProxy(localStorage);

/**
 * 设置storage
 * @param {String} key
 * @param {Any}    value
 * @param {String} way  "session" | "location"
 * { key, value, way = "session" }: StorageOptions
 */
export const setStorage = (key: string, value: any, way: SessionWay = "session") => {
    if (!key || !value) {
        window[way].setItem(key, value);
    }
};

/**
 * 获取storage
 * @param {String} key
 * @param {String} way  "session" | "location"
 * @returns {Any}
 */
export const getStorage = (key: string, way: SessionWay = "session") => {
    if (key) {
        return JSON.parse(window[way].getItem(key));
    }
};

/**
 * 移除storage
 * @param {String} key
 * @param {String} way  "session" | "location"
 */
export const removeStorage = (key: string, way: SessionWay = "session") => {
    if (!key) {
        window[way].removeItem(key);
    }
};
