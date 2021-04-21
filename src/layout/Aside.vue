<template>
    <div class="aside">
        <el-menu
            class="asideMenu overhide"
            :uniqueOpened="true"
            :collapse="collapse"
            :default-active="defaultActive"
            background-color="#304156"
            text-color="#BFCBD9"
            active-text-color="#1890ff"
            router
        >
            <el-menu-item v-if="openLogo" class="logo-title" index="/">
                <img class="logo" src="@imgs/logo.png" alt="vue-admin" />
                <template #title>
                    <span class="title">vue-admin</span>
                </template>
            </el-menu-item>
            <template v-for="item in menuList" :key="item.path">
                <template v-if="item.children.length > 0">
                    <el-submenu class="submenu" :index="item.path">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ $t(`aside.${item.path}`) }}</span>
                        </template>
                        <template v-for="item2 in item.children" :key="item2.path">
                            <el-menu-item :index="item.path + item2.path">
                                {{ $t(`aside.${item.path + item2.path}`) }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path">
                        <i :class="item.icon"></i>
                        <template #title>{{ $t(`aside.${item.path}`) }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { Menu } from "@/model/views/views";
import MenuList from "@/assets/js/menuList";

export default defineComponent({
    setup() {
        const store = useStore();
        const route = useRoute();

        const menuList = ref<Menu[]>([]);

        const getMenuList = (): Promise<Menu[]> => {
            return new Promise((resolve) => {
                resolve(MenuList);
            });
        };

        onMounted(async () => {
            menuList.value = await getMenuList();
        });

        return {
            menuList,
            collapse: computed(() => store.getters.collapse),
            defaultActive: computed(() => route.path),
            openLogo: computed(() => store.getters.openLogo),
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
    /deep/ {
        .asideMenu {
            // 去掉el-menu 白色右边框
            border: none !important;
        }
        .asideMenu:not(.el-menu--collapse) {
            width: 200px;
            height: 100%;
            overflow: hidden;
        }
        .el-menu--inline .el-menu-item {
            // 二级菜单 背景色
            background-color: #1f2f3f !important;
            &:hover {
                // 二级菜单鼠标移除背景色
                background-color: #001528 !important;
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
