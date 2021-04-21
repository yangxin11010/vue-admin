import Cookies from "js-cookie";

const defaultTokenKey: string = "Admin-Token";

export function getToken(tokenKey?: string) {
    return Cookies.get(tokenKey ? tokenKey : defaultTokenKey);
}

export function setToken(...params: string[]) {
    const [key, value] = params;
    if (key) {
        return Cookies.set(defaultTokenKey, key);
    } else if (key && value) {
        return Cookies.set(key, value);
    } else {
        throw new Error("Parameter error");
    }
}

export function removeToken(tokenKey?: string) {
    return Cookies.remove(tokenKey ? tokenKey : defaultTokenKey);
}

export default Cookies;
