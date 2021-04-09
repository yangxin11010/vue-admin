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
            <template v-for="(item, index) in menuList" :key="index">
                <template v-if="item.children.length > 0">
                    <el-submenu class="submenu" :index="item.path">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="(item2, index2) in item.children" :key="index2">
                            <el-menu-item :index="item2.path">{{ item2.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "@/store/index";
import { useRoute } from "vue-router";

export default defineComponent({
    setup() {
        const store = useStore();
        const route = useRoute();

        const menuList = ref<object[]>([]);

        const getMenuList = (): Promise<object[]> => {
            return new Promise((resolve) => {
                const menuList: object[] = [
                    {
                        title: "首页",
                        path: "/dashboard",
                        icon: "el-icon-setting",
                        children: [],
                    },
                    {
                        title: "图标",
                        path: "/svg",
                        icon: "el-icon-setting",
                        children: [],
                    },
                    {
                        title: "设置",
                        path: "",
                        icon: "el-icon-setting",
                        children: [
                            {
                                title: "系统设置",
                                path: "/system",
                                icon: "",
                                children: [],
                            },
                            {
                                title: "菜单管理",
                                path: "/menu",
                                icon: "el-icon-setting",
                                children: [],
                            },
                        ],
                    },
                ];
                resolve(menuList);
            });
        };

        onMounted(async () => {
            menuList.value = await getMenuList();
        });

        return {
            menuList,
            collapse: computed(() => store.getters.collapse),
            defaultActive: computed(() => route.path),
        };
    },
});
</script>

<style lang="scss" scoped>
.aside {
    height: 100%;
    background-color: $main-color;
    user-select: none;
}
</style>
<style lang="scss">
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
</style>
