import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// ele 主题
// import 'element-plus/lib/theme-chalk/index.css';
// ele 自定义主题
import '@/assets/css/element-variables.scss'
//	Router
import Router from '@/router/index'
//	Store
import Store, { key } from '@/store/index'
//	SVG
import Svg from '@/icons/index'

import VueClipboard from 'vue-clipboard2'

const app = createApp(App)


app.use(Router).use(Store, key).use(ElementPlus, { size: "medium" }).use(Svg).use(VueClipboard)



// 处理组件渲染方法执行期间以及侦听器抛出的未捕获错误,这个处理函数被调用时，可获取错误信息和应用实例。
app.config.errorHandler = (err, vm, info) => {
	console.error('err: ', err);
	console.error('vm: ', vm);
	console.error('info: ', info);
};
// 为 Vue 的运行时警告指定一个自定义处理函数。注意这只会在开发环境下生效，在生产环境下它会被忽略。
app.config.warnHandler = (msg, vm, trace) => {
	console.error('msg: ', msg);
	console.error('vm: ', vm);
	console.error('trace: ', trace);
};

app.mount('#app')