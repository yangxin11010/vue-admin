<template>
    <div :class="{ 'aside-box': fixed }">
        <div v-if="fixed" class="aside-bg" :class="{ showBack: !collapse }" @click="changeCollapse"></div>
        <div class="aside" :class="`${!fixed ? '' : collapse ? 'aside-fixed hideAside' : 'aside-fixed showAside'}`">
            <title-logo :fixed="fixed"></title-logo>
            <div :style="{ height: `calc(100% - ${openLogo ? 60 : 0}px)` }">
                <el-scrollbar>
                    <el-menu
                        class="asideMenu"
                        :mode="fixed ? 'vertical' : mode"
                        :uniqueOpened="uniqueOpened"
                        :collapse="fixed ? false : mode === 'horizontal' ? false : collapse"
                        :default-active="defaultActive"
                        :background-color="globalColor.asideBColor"
                        :text-color="globalColor.asideTColor"
                        :active-text-color="globalColor.asideATColor"
                        router
                        @select="changeCollapse"
                        :collapse-transition="!fixed"
                    >
                        <template v-for="item in menuList" :key="item.path">
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
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";
// import { RouteRecordRaw } from "vue-router";
import TitleLogo from "./components/TitleLogo.vue";
import MyElMenuItem from "./components/MyElMenuItem.vue";


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
            collapse = computed<boolean>(() => store.getters.collapse);

        const menuList = ref<Menu[]>([]);
        const openLogo = ref(setting.openLogo),
            uniqueOpened = ref(true);

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
        //     if (list.length > 0) {
        //         let routerList: RouteRecordRaw[] = [];
        //         list.forEach((item) => {
        //             const router: RouteRecordRaw = {
        //                 path: item.path,
        //                 name: getNameByPath(item.path),
        //                 alias: item.alias,
        //                 meta: {
        //                     requiresAuth: false,
        //                     title: item.title,
        //                     keepAlive: item.keepAlive,
        //                 },
        //                 // component: () => import(item.realPath),
        //                 component: () => import(item.realPath),
        //                 children: formateRouter(item.children),
        //             };
        //             // console.log(import(item.realPath));
        //             routerList.push(router);
        //         });
        //         const path = "views/other/login.vue";
        //         console.log((resolve: any) => require([`@/${path}`], resolve));
        //         return routerList;
        //     }
        //     return [];
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

            const openLogoValue = location.getItem("global-setting-openLogo"),
                uniqueOpenedValue = location.getItem("global-setting-uniqueOpened");

            // 侧边栏Logo
            openLogoValue !== null && (openLogo.value = openLogoValue);
            mitter.$on("changeOpenLogo", (value) => {
                openLogo.value = value;
            });
            // 是否保持一个子菜单的展开
            uniqueOpenedValue !== null && (uniqueOpened.value = uniqueOpenedValue);
            mitter.$on("changeUniqueOpened", (value) => {
                uniqueOpened.value = value;
            });
        });

        return {
            menuList,
            collapse,
            defaultActive: computed(() => route.path),
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
    z-index: 19998;
}
.aside-bg {
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 19997;
    position: fixed;
    left: 0;
    top: 0;
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
    z-index: 19998;
    .link {
        width: 100%;
        height: 100%;
    }
    :deep(.asideMenu) {
        width: 250px;
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

    :deep(.el-menu-item [class^="np-icon-"]),
    :deep(.el-submenu [class^="np-icon-"]) {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 16px;
    }
    // :deep(.horizontal-collapse-transition) {
    //     transition: 0.15s width ease-in-out, 0.15s padding-left ease-in-out, 0.15s padding-right ease-in-out;
    // }
}
</style>
