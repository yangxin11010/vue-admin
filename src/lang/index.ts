// 国际化
import { createI18n } from "vue-i18n";
import Store from "@/store";
// my
import zhLocale from "./json/zh.json";
import enLocale from "./json/en.json";
import jaLocale from "./json/ja.json";
// element-ui
import zhElLocale from "element-plus/lib/locale/lang/zh-cn";
import enElLocale from "element-plus/lib/locale/lang/en";
import jaElLocale from "element-plus/lib/locale/lang/ja";

const messages = {
    [zhElLocale.name]: {
        // el 这个属性很关键，一定要保证有这个属性，
        el: zhElLocale.el,
        // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
        ...zhLocale,
    },
    [enElLocale.name]: {
        el: enElLocale.el,
        ...enLocale,
    },
    [jaElLocale.name]: {
        el: enElLocale.el,
        ...jaLocale,
    }
};

const i18n = createI18n({
    // something vue-i18n options here ...
    locale: Store.getters["setting/lang"],
    fallbackLocale: enElLocale.name,
    messages: messages,
});

// 改变 lang 顺序  中文、英文排在第一、二位
const changeIndex = (list: string[]) => {
    list.splice(list.findIndex((item) => item === "zh-cn"), 1);
    list.splice(list.findIndex((item) => item === "en"), 1);
    list.unshift("en");
    list.unshift("zh-cn");
    return list;
};

// i18n 语言列表
export const availableLocales = changeIndex(i18n.global.availableLocales);

// 对于语言
export const langSetting = {
    "zh-cn": "中 文",
    en: "English",
    ja: "日本語",
};

export default i18n;
