import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
// ele 主题
// import 'element-plus/lib/theme-chalk/index.css';
// ele 自定义主题
import "@/assets/css/element-variables.scss";
//	Router
import Router from "@/router";
//	Store
import Store, { key } from "@/store";
//	SVG
import Svg from "@/icons";
// directive
import directive from "@/directive";

// 国际化
import VueI18n from "@/lang";

import MyEl from "@/components/my-el-components";

const app = createApp(App);

app.use(Router)
    .use(Store, key)
    .use(ElementPlus, {
        size: "small",
        i18n: VueI18n.global.t,
    })
    .use(Svg)
    .use(directive)
    .use(VueI18n)
    .use(MyEl);

app.mount("#app");
