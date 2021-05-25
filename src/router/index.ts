import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { nprogress } from "@/config";

NProgress.configure(nprogress);

// const routes: Array<RouteRecordRaw> = [
//     {
//         path: "/",
//         redirect: "/dashboard",
//     },
//     {
//         path: "/login",
//         name: "Login",
//         alias: [],
//         meta: {
//             requiresAuth: false,
//             title: "",
//             keepAlive: false,
//         },
//         component: () => import("@/views/other/login.vue"),
//     },
//     {
//         path: "/",
//         name: "Home",
//         component: () => import("@/layout/index.vue"),
//         children: [
//             {
//                 path: "/redirect/:path(.*)",
//                 name: "Redirect",
//                 alias: [],
//                 meta: {
//                     requiresAuth: false,
//                     title: "",
//                     keepAlive: false,
//                 },
//                 component: () => import("@/views/other/redirect.vue"),
//             },
//             {
//                 path: "dashboard",
//                 name: "Dashboard",
//                 alias: ["/index", "/dashboard"],
//                 meta: {
//                     requiresAuth: true,
//                     title: "首页",
//                     keepAlive: true,
//                 },
//                 component: () => import("@/views/other/dashboard.vue"),
//             },
//             {
//                 path: "personCenter",
//                 name: "PersonCenter",
//                 alias: ["/person", "/center"],
//                 meta: {
//                     requiresAuth: true,
//                     title: "个人中心",
//                     keepAlive: true,
//                 },
//                 component: () => import("@/views/other/person-center.vue"),
//             },
//             {
//                 path: "message",
//                 name: "Message",
//                 alias: [],
//                 meta: {
//                     requiresAuth: true,
//                     title: "消息中心",
//                     keepAlive: true,
//                 },
//                 component: () => import("@/views/other/message.vue"),
//             },
//         ],
//     },
//     {
//         path: "/error",
//         name: "Error",
//         component: () => import("@/layout/index.vue"),
//         meta: {
//             requiresAuth: true,
//             title: "错误页面",
//             keepAlive: true,
//         },
//         children: [
//             {
//                 path: "notFound",
//                 name: "NotFound",
//                 meta: {
//                     requiresAuth: true,
//                     title: "404",
//                     keepAlive: true,
//                 },
//                 alias: [],
//                 component: () => import("@/views/error/404.vue"),
//             },
//             {
//                 path: "notPermission",
//                 name: "NotPermission",
//                 meta: {
//                     requiresAuth: true,
//                     title: "401",
//                     keepAlive: true,
//                 },
//                 alias: [],
//                 component: () => import("@/views/error/401.vue"),
//             },
//         ],
//     },
// ];

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
            keepAlive: false,
        },
        component: () => import("@/views/other/login.vue"),
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: "/redirect/:path(.*)",
                name: "Redirect",
                alias: [],
                meta: {
                    requiresAuth: false,
                    title: "",
                    keepAlive: false,
                },
                component: () => import("@/views/other/redirect.vue"),
            },
            {
                path: "dashboard",
                name: "Dashboard",
                alias: ["/index"],
                meta: {
                    requiresAuth: true,
                    title: "首页",
                    keepAlive: true,
                },
                component: () => import("@/views/other/dashboard.vue"),
            },
            {
                path: "personCenter",
                name: "PersonCenter",
                alias: ["/person", "/center"],
                meta: {
                    requiresAuth: true,
                    title: "个人中心",
                    keepAlive: true,
                },
                component: () => import("@/views/other/person-center.vue"),
            },
            {
                path: "icons",
                name: "IconsPage",
                alias: ["/svg"],
                meta: {
                    requiresAuth: true,
                    title: "图标",
                    keepAlive: true,
                },
                component: () => import("@/views/other/icons.vue"),
            },
            {
                path: "permissions",
                name: "PermissionsPage",
                alias: [],
                meta: {
                    requiresAuth: true,
                    title: "权限测试页",
                    keepAlive: true,
                },
                component: () => import("@/views/other/permissions-page.vue"),
            },
            {
                path: "clipboard",
                name: "Clipboard",
                meta: {
                    requiresAuth: true,
                    title: "Clipboard",
                    keepAlive: true,
                },
                alias: [],
                component: () => import("@/views/other/clipboard.vue"),
            },
            {
                path: "exportFile",
                name: "ExportFile",
                meta: {
                    requiresAuth: true,
                    title: "导出 File",
                    keepAlive: true,
                },
                alias: ["/export", "/excel", "/zip"],
                component: () => import("@/views/other/export-file.vue"),
            },
            {
                path: "message",
                name: "Message",
                alias: [],
                meta: {
                    requiresAuth: true,
                    title: "消息中心",
                    keepAlive: true,
                },
                component: () => import("@/views/other/message.vue"),
            },
        ],
    },
    {
        path: "/setting",
        name: "Setting",
        meta: {
            requiresAuth: true,
            title: "设置",
            keepAlive: true,
        },
        alias: ["/set"],
        redirect: "/setting/system",
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: "system",
                name: "System",
                alias: [],
                meta: {
                    requiresAuth: true,
                    title: "系统设置",
                    keepAlive: true,
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
                    keepAlive: true,
                },
                component: () => import("@/views/system/menu.vue"),
            },
            {
                path: "user",
                name: "User",
                alias: [],
                meta: {
                    requiresAuth: true,
                    title: "用户管理",
                    keepAlive: true,
                },
                component: () => import("@/views/system/user.vue"),
            },
        ],
    },
    {
        path: "/components",
        name: "Components",
        meta: {
            requiresAuth: true,
            title: "组件",
            keepAlive: true,
        },
        alias: [],
        redirect: "/components/tinymce",
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: "tinymce",
                name: "TinymcePage",
                meta: {
                    requiresAuth: true,
                    title: "富文本编辑器",
                    keepAlive: true,
                },
                alias: [],
                component: () => import("@/views/components/tinymce-page.vue"),
            },
            {
                path: "jsoneditor",
                name: "JsonEditorPage",
                meta: {
                    requiresAuth: true,
                    title: "JSON 编辑器",
                    keepAlive: true,
                },
                alias: [],
                component: () => import("@/views/components/jsoneditor-page.vue"),
            },
            {
                path: "charts",
                name: "Charts",
                meta: {
                    requiresAuth: true,
                    title: "图表",
                    keepAlive: true,
                },
                alias: [],
                component: () => import("@/views/components/charts.vue"),
            },
        ],
    },
    {
        path: "/error",
        name: "Error",
        meta: {
            requiresAuth: true,
            title: "错误页面",
            keepAlive: true,
        },
        alias: ["/wrong"],
        redirect: "/error/notFound",
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: "notFound",
                name: "NotFound",
                meta: {
                    requiresAuth: true,
                    title: "404",
                    keepAlive: true,
                },
                alias: ["/404"],
                component: () => import("@/views/error/404.vue"),
            },
            {
                path: "notPermission",
                name: "NotPermission",
                meta: {
                    requiresAuth: true,
                    title: "401",
                    keepAlive: true,
                },
                alias: ["/401"],
                component: () => import("@/views/error/401.vue"),
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "FourZeroFour",
        redirect: "/error/notFound",
        meta: {
            requiresAuth: false,
            title: "404",
            keepAlive: true,
        },
        alias: [],
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
    NProgress.start();
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
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
