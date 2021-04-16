import Cookies from "js-cookie";

const defaultTokenKey: string = "Admin-Token";

export function getToken(tokenKey?: string) {
    return Cookies.get(tokenKey ? tokenKey : defaultTokenKey);
}

export function setToken(...params: string[]) {
    if (params.length === 1) {
        return Cookies.set(defaultTokenKey, params[0]);
    } else if (params.length === 2) {
        return Cookies.set(params[0], params[1]);
    } else {
        throw new Error("Parameter error");
    }
}

export function removeToken(tokenKey?: string) {
    return Cookies.remove(tokenKey ? tokenKey : defaultTokenKey);
}

export default Cookies;
