import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";

// ele 主题
// import 'element-plus/lib/theme-chalk/index.css';
// ele 自定义主题
import "@/util/element-plus/element-variables.scss";
import "element-plus/lib/theme-chalk/display.css";
//	Router
import Router from "@/router";
//	Store
import Store, { key } from "@/store";
//	SVG
import SvgIcons from "@/icons";
// directive
import directive from "@/directive";

// 国际化
import VueI18n from "@/lang";

import MyEl from "@/plugins/my-components";

import MyStore, { user, setting } from "@/mystore";
// import { components, plugins } from "@/util/element-plus";
import VuePromise from "@/plugins/vue-promise";

const app = createApp(App);

app.use(Router)
    .use(ElementPlus, {
        size: Store.getters["setting/layoutSize"],
        i18n: VueI18n.global.t,
    })
    .use(Store, key)
    .use(SvgIcons)
    .use(directive)
    .use(VueI18n)
    .use(MyEl)
    .use(MyStore)
    .use(user)
    .use(setting)
    .use(VuePromise);

// components.forEach((component) => {
//     app.component(component.name, component);
// });

// plugins.forEach((plugin) => {
//     app.use(plugin);
// });

app.mount("#app");
