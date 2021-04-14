import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "@/util/progress/index";
import Store from "@/store/index";
import Layout from "@/layout/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/dashboard",
    },
    {
        path: "/login",
        name: "Login",
        alias: [],
        meta: {
            requiresAuth: false,
            title: "",
        },
        component: () => import("@/views/other/login.vue"),
    },
    {
        path: "/login",
        name: "Login",
        alias: [],
        meta: {
            requiresAuth: false,
            title: "",
        },
        component: () => import("@/views/other/login.vue"),
    },
    {
        path: "/",
        name: "Home",
        component: Layout,
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                alias: ["/index", "/dashboard"],
                meta: {
                    requiresAuth: true,
                    title: "首页",
                },
                component: () => import("@/views/other/dashboard.vue"),
            },
            {
                path: "svg",
                name: "SvgPage",
                alias: ["/icon"],
                meta: {
                    requiresAuth: true,
                    title: "图标",
                },
                component: () => import("@/views/other/svg.vue"),
            },
            {
                path: "notFound",
                name: "NotFound",
                meta: {
                    requiresAuth: false,
                    title: "404",
                },
                alias: [],
                component: () => import("@/views/other/404.vue"),
            },
            {
                path: "clipboard",
                name: "Clipboard",
                meta: {
                    requiresAuth: false,
                    title: "Clipboard",
                },
                alias: [],
                component: () => import("@/views/other/clipboard.vue"),
            },
            {
                path: "exportFile",
                name: "ExportFile",
                meta: {
                    requiresAuth: false,
                    title: "导出 File",
                },
                alias: [],
                component: () => import("@/views/other/export-file.vue"),
            },
            {
                path: "personCenter",
                name: "PersonCenter",
                alias: ["/person", "/center"],
                meta: {
                    requiresAuth: true,
                    title: "个人中心",
                },
                component: () => import("@/views/other/person-center.vue"),
            },
            {
                path: "message",
                name: "Message",
                alias: [],
                meta: {
                    requiresAuth: true,
                    title: "消息中心",
                },
                component: () => import("@/views/other/message.vue"),
            },
        ],
    },
    {
        path: "/setting",
        name: "Setting",
        component: Layout,
        meta: {
            requiresAuth: true,
            title: "设置",
        },
        children: [
            {
                path: "system",
                name: "System",
                alias: [],
                meta: {
                    requiresAuth: true,
                    title: "系统设置",
                },
                component: () => import("@/views/system/system.vue"),
            },
            {
                path: "menu",
                name: "MenuPage",
                alias: [],
                meta: {
                    requiresAuth: true,
                    title: "菜单管理",
                },
                component: () => import("@/views/system/menu.vue"),
            },
        ],
    },
    {
        path: "/:chapters+",
        name: "Chapters",
        meta: {
            requiresAuth: false,
            title: "",
        },
        alias: [],
        component: () => import("@/views/other/404.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "FourZeroFour",
        meta: {
            requiresAuth: false,
            title: "",
        },
        alias: [],
        component: () => import("@/views/other/404.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        // console.log(to);
        // console.log(from);
        // console.log(savedPosition);
        // 始终滚动到顶部
        return { top: 0 };
    },
});

router.beforeEach((to, from, next) => {
    const { isLogin, token } = Store.getters;
    if (to.meta.requiresAuth && (!isLogin || !token)) {
        next("/login");
    } else {
        if (isLogin && token && to.path === "/login") {
            next(from.path);
        } else {
            next();
        }
    }
    NProgress.start();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
