import { Window } from "@ts/util";



/**
 * url参数拼接
 * @param {String} url 
 * @param {Object} params  "session" | "location"
 * @returns {string}
 */
export const urlPlus = (url: string, params: CustomData) => {
    Object.keys(params).forEach((item: string, index: number) => {
        if (index == 0) {
            url += `?${item}=${params[item]}`;
        } else {
            url += `&${item}=${params[item]}`;
        }
    })
    return url;
}



/**
 * 打开新窗口/链接
 * @param {Object} 
 */
export const openWindow = ({ url, flag = true }: Window) => {
    if (flag) {
        window.open(url);
    } else {
        window.location.href = url;
    }
}

/**
 * 设置 dom style
 * @param {Dom} el
 * @param {Object} params
 */

export const setDomStyles = (el: any, params: CustomData) => {
    const vm: HTMLElement = document.querySelector(el);
    Object.keys(params).forEach((item: any) => {
        vm.style[item] = params[item];
    })
}













