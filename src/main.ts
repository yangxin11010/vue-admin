import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
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
import VueI18n from '@/lang'

const app = createApp(App);

app.use(Router)
    .use(Store, key)
    .use(ElementPlus, { size: "medium", locale })
    .use(Svg)
    .use(directive)
    .use(VueI18n);

app.mount("#app");
