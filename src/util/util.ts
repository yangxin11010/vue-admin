
/**
 * url参数拼接
 * @param {String} url
 * @param {Object} params  "session" | "location"
 * @returns {string}
 */
export const urlPlus = (url: string, params: { [key: string]: any }) => {
    Object.keys(params).forEach((item: string, index: number) => {
        url += `${index === 0 ? "?" : "&"}${item}=${params[item]}`;
    });
    return url;
};

/**
 * 打开新窗口/链接
 * @param {Object}
 */
export const openWindow = (url: string, flag = true) => {
    if (flag) {
        window.open(url);
    } else {
        window.location.href = url;
    }
};

/**
 * 设置 dom style
 * @param {Dom} el
 * @param {Object} params
 */

export const setDomStyles = (el: any, params: { [key: string]: string }) => {
    const vm: HTMLElement = document.querySelector(el);
    Object.keys(params).forEach((item: any) => {
        vm.style[item] = params[item];
    });
};
