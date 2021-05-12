import Cookies from "js-cookie";

const defaultTokenKey: string = "Admin-Token";

export function getCookie(key?: string) {
    return Cookies.get(key ? key : defaultTokenKey);
}

export function setCookie(...params: string[]) {
    const [key, value] = params;
    if (key) {
        return Cookies.set(defaultTokenKey, key);
    } else if (key && value) {
        return Cookies.set(key, value);
    } else {
        throw new Error("Parameter error");
    }
}

export function removeCookie(key?: string) {
    return Cookies.remove(key ? key : defaultTokenKey);
}

export default Cookies;
