import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
// ele 主题
// import 'element-plus/lib/theme-chalk/index.css';
// ele 自定义主题
import "@/assets/css/element-variables.scss";
//	Router
import Router from "@/router/index";
//	Store
import Store, { key } from "@/store/index";
//	SVG
import Svg from "@/icons/index";
// directive
import directive from "@/directive/index";
// router-view
import MyRouterView from "@/components/MyRouterView.vue";

const app = createApp(App);

app.use(Router)
    .use(Store, key)
    .use(ElementPlus, { size: "medium" })
    .use(Svg)
    .use(directive);

app.component("MyRouterView", MyRouterView);

app.mount("#app");
