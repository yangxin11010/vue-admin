/**
 * url参数拼接
 * @param {String} url
 * @param {Object} params  "session" | "location"
 * @returns {string}
 */
export const urlPlus = (url: string, params: CustomData) => {
    Object.keys(params).forEach((item: string, index: number) => {
        url += `${index === 0 ? "?" : "&"}${item}=${params[item]}`;
    });
    return url;
};

/**
 * 获取 url 参数
 * @param url
 * @returns
 */
export const getUrlParams = (url = "") => {
    if (!url) url = window.location.href;
    const paramsStr = url.split("?").length > 1 ? url.split("?")[1] : "",
        params: any = {};
    if (paramsStr) {
        paramsStr.split("&").forEach((item) => {
            const val = item.split("=");
            params[val[0]] = val[1];
        });
    }
    return params;
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

export const setDomStyles = (el: any, params: CustomData) => {
    const vm: HTMLElement = document.querySelector(el);
    Object.keys(params).forEach((item: any) => {
        vm.style[item] = params[item];
    });
};

/**
 * 获取系统/浏览器名称
 * @returns
 */
export const getBrowserInfo = () => {
    const os = navigator.platform;
    const userAgent = navigator.userAgent;
    const info: { system: string; browser: string } = {
        system: "",
        browser: "",
    };
    let tempArray: any = "";
    if (os.indexOf("Win") > -1) {
        if (userAgent.indexOf("Windows NT 5.0") > -1) {
            info.system = "Windows 2000";
        } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
            info.system = "Windows XP";
        } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
            info.system = "Windows 2003";
        } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
            info.system = "Windows Vista";
        } else if (userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1) {
            info.system = "Windows 7";
        } else if (userAgent.indexOf("Windows 8") > -1) {
            info.system = "Windows 8";
        } else if (userAgent.indexOf("Windows NT 10.0") > -1) {
            info.system = "Windows 10";
        } else {
            info.system = "Other";
        }
    } else if (os.indexOf("Mac") > -1) {
        info.system = "Mac";
    } else if (os.indexOf("X11") > -1) {
        info.system = "Unix";
    } else if (os.indexOf("Linux") > -1) {
        info.system = "Linux";
    } else {
        info.system = "Other";
    }
    if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
        tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
        info.browser = tempArray[1] + " " + tempArray[2];
    } else if (/MSIE \d+\.\d+/.test(userAgent)) {
        tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
        info.browser = tempArray[1] + " " + tempArray[2];
    } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
        tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
        info.browser = tempArray[1] + " " + tempArray[2];
    } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
        tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
        info.browser = tempArray[3] + " " + tempArray[1];
    } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
        tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
        info.browser = tempArray[1] + " " + tempArray[2];
    } else {
        info.browser = "unknown";
    }
    return info;
};
