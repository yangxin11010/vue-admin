// 国际化
import { createI18n } from "vue-i18n";
import zhLocale from "./zh.json";
import enLocale from "./en.json";
import Store from "@/store";

import zhElLocale from "element-plus/lib/locale/lang/zh-cn";
import enElLocale from "element-plus/lib/locale/lang/en";

const messages = {
    [zhElLocale.name]: {
        el: zhElLocale.el,
        // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
        ...zhLocale,
    },
    [enElLocale.name]: {
        // el 这个属性很关键，一定要保证有这个属性，
        el: enElLocale.el,
        // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
        ...enLocale,
    },
};

const i18n = createI18n({
    // something vue-i18n options here ...
    locale: Store.getters.lang,
    fallbackLocale: enElLocale.name,
    messages: messages,
});

// 改变 lang 顺序  中文 英文 永远 排在 第一、二位
const changeIndex = (list: string[]) => {
    const defaultList: string[] = JSON.parse(JSON.stringify(list));
    const zhcnIndex = defaultList.findIndex((item) => item === "zh-cn");
    const enIndex = defaultList.findIndex((item) => item === "en");
    const firstVal = defaultList[0];
    const secondVal = defaultList[1];
    defaultList[0] = defaultList[zhcnIndex];
    defaultList[1] = defaultList[enIndex];
    defaultList[zhcnIndex] = firstVal;
    defaultList[enIndex] = secondVal;
    return defaultList;
};

export const availableLocales = changeIndex(i18n.global.availableLocales);

export const langSetting = {
    "zh-cn": "中文",
    en: "English",
};

export default i18n;
