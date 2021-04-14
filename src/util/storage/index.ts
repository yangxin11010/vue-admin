import { Storage } from "@/model/util";
/**
 * 设置storage
 * @param {String} key 
 * @param {Any}    value 
 * @param {String} way  "session" | "location"
 */
 export const setStorage = ({ key, value, way = 'session' }: Storage) => {
    if (!key || !value) return;
    if (way == 'session') {
        window.sessionStorage.setItem(key, value);
    } else if (way == 'location') {
        window.localStorage.setItem(key, value);
    }
}

/**
 * 获取storage
 * @param {String} key 
 * @param {String} way  "session" | "location"
 * @returns {Any | Null}
 */
export const getStorage = ({ key, way = 'session' }: Storage) => {
    if (!key) return;
    if (way == 'session') {
        return window.sessionStorage.getItem(key);
    } else if (way == 'location') {
        return window.localStorage.setIgetItemtem(key);
    } else {
        return null;
    }
}

/**
 * 移除storage
 * @param {String} key 
 * @param {String} way  "session" | "location"
 */
export const removeStorage = ({ key, way = 'session' }: Storage) => {
    if (!key) return;
    if (way == 'session') {
        window.sessionStorage.removeItem(key);
    } else if (way == 'location') {
        window.localStorage.removeItem(key);
    }
}