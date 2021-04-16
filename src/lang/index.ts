// 国际化
import { createI18n } from "vue-i18n";
import zhLocale from "./zh.json";
import enLocale from "./en.json";
import Store from "@/store";

const messages = {
    en: enLocale,
    zh: zhLocale,
};

const i18n = createI18n({
    // something vue-i18n options here ...
    locale: Store.getters.lang,
    messages,
});

export default i18n;
