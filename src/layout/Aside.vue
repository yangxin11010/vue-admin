<template>
    <div :class="{ 'aside-box': modeState ? false : fixed }">
        <div
            v-if="modeState ? false : fixed"
            class="aside-bg"
            :class="{ showBack: !collapse }"
            @click="changeCollapse"
        ></div>
        <div
            class="aside"
            :class="
                modeState
                    ? 'aside-horizontal'
                    : `${!fixed ? '' : collapse ? 'aside-fixed hideAside' : 'aside-fixed showAside'}`
            "
        >
            <title-logo :mode="mode" :fixed="fixed"></title-logo>
            <div :style="{ height: modeState ? 'auto' : `calc(100% - ${openLogo ? 60 : 0}px)` }">
                <el-scrollbar>
                    <el-menu
                        class="asideMenu"
                        :mode="mode"
                        :uniqueOpened="modeState ? false : uniqueOpened"
                        :collapse="modeState ? false : fixed ? false : collapse"
                        :default-active="defaultActive"
                        :background-color="globalColor.asideBColor"
                        :text-color="globalColor.asideTColor"
                        :active-text-color="globalColor.asideATColor"
                        router
                        @select="changeCollapse"
                        :collapse-transition="!fixed"
                    >
                        <template v-for="item in modeMenuList" :key="item.path">
                            <my-el-menu-item :item="item" :path="item.path"></my-el-menu-item>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount, PropType } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import type { Menu } from "@/model/views";
import MenuList from "@/assets/js/menuList";
import { globalColor, setting } from "@/config";
// import { RouteRecordRaw } from "vue-router";
import TitleLogo from "./components/TitleLogo.vue";
import MyElMenuItem from "./components/MyElMenuItem.vue";
import { useLocation } from "@/hooks";


export default defineComponent({
    props: {
        fixed: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String as PropType<"horizontal" | "vertical">,
            default: "vertical"
        }
    },
    setup(props) {
        const store = useStore(),
            route = useRoute(),
            // router = useRouter(),
            collapse = computed<boolean>(() => store.getters.collapse),
            modeState = computed(() => props.mode === "horizontal"),
            asideMenuWidth = computed(() => {
                return modeState.value ? 'auto' : '250px'
            });

        const menuList = ref<Menu[]>([]);

        const modeMenuList = computed(() => {
            if(modeState.value) {
                const value: Menu = {
                    menuId: 6,
                    title: "",
                    path: "",
                    icon: "el-icon-more",
                    parentMenuId: null,
                    keepAlive: true,
                    status: 1,
                    sort: 6,
                    alias: [],
                    realPath: "https://gitee.com/yangxin11010/vue-admin",
                    children: menuList.value.slice(5, menuList.value.length),
                }
                let newMenuList: Array<Menu> = [...menuList.value.slice(0,5),value];
                return newMenuList
            }else {
                return menuList.value
            }
        })
        const openLogo = useLocation({
            name: "global-setting-openLogo",
            value: setting.openLogo,
            isWatch: true
        }),
        uniqueOpened = useLocation({
            name: "global-setting-uniqueOpened",
            value: true,
            isWatch: true
        });

        const getMenuList = (): Promise<Menu[]> => {
            return new Promise((resolve) => {
                resolve(MenuList);
            });
        };

        const changeCollapse = () => {
            props.fixed && store.dispatch("SET_COLLAPSE", !collapse.value);
        };


        // const getNameByPath = (value: string) => {
        //     value = value.replace(/\//, "");
        //     return value.slice(0, 1).toUpperCase() + value.slice(1, value.length);
        // };

        // const formateRouter = (list: Menu[]): RouteRecordRaw[] => {
        //     let routerList: RouteRecordRaw[] = [];
        //     list.forEach((item) => {
        //         const router: RouteRecordRaw = {
        //             path: item.path,
        //             name: getNameByPath(item.path),
        //             alias: item.alias,
        //             meta: {
        //                 requiresAuth: false,
        //                 title: item.title,
        //                 keepAlive: item.keepAlive,
        //             },
        //             // component: () => import(item.realPath),
        //             component: () => import(item.realPath),
        //             children: formateRouter(item.children),
        //         };
        //         // console.log(import(item.realPath));
        //         routerList.push(router);
        //     });
        //     const path = "views/other/login.vue";
        //     console.log((resolve: any) => require([`@/${path}`], resolve));
        //     return routerList;
        // };

        // const addRoute = (list: RouteRecordRaw[]) => {
        //     list.forEach((item) => {
        //         if (!router.hasRoute(item.name as string) && item.children?.length === 0) {
        //             router.addRoute(item);
        //         }
        //         item.children?.forEach((item2) => {
        //             if (router.hasRoute(item.name as string)) {
        //                 router.addRoute(item.name as string, item2);
        //             }
        //         });
        //     });
        //     router.addRoute({
        //         path: "/:pathMatch(.*)*",
        //         name: "FourZeroFour",
        //         redirect: "/error/notFound",
        //         meta: {
        //             requiresAuth: false,
        //             title: "404",
        //             keepAlive: true,
        //         },
        //         alias: [],
        //     });
        // };



        onBeforeMount(async () => {
            const result = await getMenuList();
            // addRoute(formateRouter(result));
            menuList.value = result;
            store.dispatch("SET_MENULIST", menuList.value);
            // console.log(router.getRoutes());

        });

        return {
            modeMenuList,
            collapse,
            defaultActive: computed(() => route.path),
            modeState,
            asideMenuWidth,
            openLogo,
            globalColor,
            setting,
            asideNextBColor: globalColor.asideNextBColor,
            asideNextAColor: globalColor.asideNextAColor,
            asideBColor: globalColor.asideBColor,
            uniqueOpened,
            changeCollapse
        };
    },
    components: {
        TitleLogo,
        MyElMenuItem
    }
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.aside-box {
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1998;
}
.aside-bg {
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1997;
    position: fixed;
    left: 0;
    top: 0;
}
.aside-horizontal {
    display: flex;
}
.aside-fixed {
    position: fixed !important;
    left: 0;
}
.showBack {
    width: 100vw;
    height: 100vh;
}
.hideAside {
    transform: translate(-100%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.showAside {
    transform: translate(0%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.aside {
    height: 100%;
    background-color: v-bind(asideBColor);
    user-select: none;
    position: relative;
    z-index: 1998;
    .link {
        width: 100%;
        height: 100%;
    }
    .asideMenu {
        width: v-bind(asideMenuWidth);
        // 去掉el-menu 白色右边框
        border: none !important;
    }

    :deep(.el-menu--collapse) {
        width: 64px;
    }
    :deep(.el-menu--inline .el-menu-item),
    :deep(.el-menu--inline .el-submenu__title) {
        // 二级菜单 背景色
        background-color: v-bind(asideNextBColor) !important;
        &:hover {
            // 二级菜单鼠标移入背景色
            background-color: v-bind(asideNextAColor) !important;
        }
    }

    // :deep(.horizontal-collapse-transition) {
    //     transition: 0.15s width ease-in-out, 0.15s padding-left ease-in-out, 0.15s padding-right ease-in-out;
    // }
}
</style>
