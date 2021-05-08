<template>
    <div class="aside">
        <el-menu v-if="openLogo" class="asideMenu" style="height: 60px;overflow: hidden;" :collapse="collapse" router>
            <el-menu-item class="logo-title" index="/">
                <img class="logo" :src="setting.logo" alt="vue-admin" />
                <template #title>
                    <span class="title">{{ setting.logoText }}</span>
                </template>
            </el-menu-item>
        </el-menu>
        <el-menu
            class="asideMenu"
            :uniqueOpened="uniqueOpened"
            :collapse="collapse"
            :default-active="defaultActive"
            :background-color="globalColor.asideBColor"
            :text-color="globalColor.asideTColor"
            :active-text-color="globalColor.asideATColor"
            router
            :style="{
                height: `calc(100% - ${openLogo ? 60 : 0}px)`,
            }"
        >
            <template v-for="item in menuList" :key="item.path">
                <template v-if="item.children.length > 0">
                    <el-submenu class="submenu" :index="item.path">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ $t(`aside.${item.path}`) }}</span>
                        </template>
                        <template v-for="item2 in item.children" :key="item2.path">
                            <template v-if="item2.children.length > 0">
                                <el-submenu class="submenu-next" :index="item.path + item2.path">
                                    <template #title>
                                        <!-- <i :class="item2.icon"></i> -->
                                        <span>{{ $t(`aside.${item.path + item2.path}`) }}</span>
                                    </template>
                                    <template
                                        v-for="item3 in item2.children"
                                        :key="item.path + item2.path + item3.path"
                                    >
                                        <el-menu-item v-if="checkLink(item3.realPath)" @click="jumpUrl(item3.realPath)">
                                            {{ $t(`aside.${item.path + item2.path + item3.path}`) }}
                                        </el-menu-item>
                                        <el-menu-item v-else :index="item.path + item2.path + item3.path">
                                            {{ $t(`aside.${item.path + item2.path + item3.path}`) }}
                                        </el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item v-if="checkLink(item2.realPath)" @click="jumpUrl(item2.realPath)">
                                    {{ $t(`aside.${item.path + item2.path}`) }}
                                </el-menu-item>
                                <el-menu-item v-else :index="item.path + item2.path">
                                    {{ $t(`aside.${item.path + item2.path}`) }}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item v-if="checkLink(item.realPath)" @click="jumpUrl(item.realPath)">
                        <i :class="item.icon"></i>
                        <template #title>
                            <span>{{ $t(`aside.${item.path}`) }}</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item v-else :index="item.path">
                        <i :class="item.icon"></i>
                        <template #title>
                            <span>{{ $t(`aside.${item.path}`) }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { Menu } from "@/model/views";
import MenuList from "@/assets/js/menuList";
import { globalColor, setting } from "@/config";
import { checkLink } from "@/util/validata";
import { openWindow } from "@/util";
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";
// import { RouteRecordRaw } from "vue-router";

export default defineComponent({
    setup() {
        const store = useStore(),
            route = useRoute(),
            router = useRouter();

        const menuList = ref<Menu[]>([]);
        const openLogo = ref(setting.openLogo),
            uniqueOpened = ref(true);

        const getMenuList = (): Promise<Menu[]> => {
            return new Promise((resolve) => {
                resolve(MenuList);
            });
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

        const jumpUrl = (value: string) => {
            openWindow(value);
        };

        onMounted(async () => {
            const result = await getMenuList();
            // addRoute(formateRouter(result));
            menuList.value = result;
            store.dispatch("SET_MENULIST", menuList.value);
            console.log(router.getRoutes());

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
            collapse: computed(() => store.getters.collapse),
            defaultActive: computed(() => route.path),
            openLogo,
            globalColor,
            setting,
            asideNextBColor: globalColor.asideNextBColor,
            asideNextAColor: globalColor.asideNextAColor,
            checkLink,
            jumpUrl,
            uniqueOpened,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.aside {
    height: 100%;
    background-color: $main-color;
    user-select: none;
    .logo-title {
        background-color: #2b2f3a !important;
        height: 60px;
        line-height: 60px;
    }
    .logo {
        width: 40px;
        height: 40px;
        position: relative;
        left: -6px;
    }
    .title {
        width: 130px;
        height: 60px;
        display: inline-block;
        color: #fff;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .link {
        width: 100%;
        height: 100%;
    }
    /deep/ {
        .asideMenu {
            // 去掉el-menu 白色右边框
            border: none !important;
            overflow-x: hidden;
            overflow-y: auto;
            // @include scrollHide;
            scrollbar-width: none; /*Firefox*/
            -ms-overflow-style: none; /*IE10+*/
            &::-webkit-scrollbar {
                // 整个滚动条
                // display: none;
                width: 6px;
            }
            &::-webkit-scrollbar-thumb {
                // 滚动条上的滚动滑块
                background-color: #9093994d;
                border-radius: 50px;
            }
        }
        .asideMenu {
            width: 250px;
        }
        .el-menu--collapse {
            width: 64px;
        }
        .el-menu--inline .el-menu-item,
        .el-menu--inline .el-submenu__title {
            // 二级菜单 背景色

            background-color: v-bind(asideNextBColor) !important;
            &:hover {
                // 二级菜单鼠标移入背景色
                background-color: v-bind(asideNextAColor) !important;
            }
        }
        .el-menu-item [class^="np-icon-"],
        .el-submenu [class^="np-icon-"] {
            vertical-align: middle;
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 16px;
        }
    }
}
</style>
