<template>
    <el-menu class="headerMenu" mode="horizontal" @select="handleSelect" :default-active="defaultActive" router>
        <template v-for="item in menuList" :key="item.path">
            <my-el-menu-item :item="item" :path="item.path"></my-el-menu-item>
        </template>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, computed } from "vue";
import MenuList from "@/assets/js/menuList";
import { useRoute } from "vue-router";
import MyElMenuItem from "./MyElMenuItem.vue";
import type { Menu } from "@model/views";

export default defineComponent({
    name: "HeaderMenu",
    props: {},
    setup() {
        const route = useRoute();
        const menuList = ref<Menu[]>([]);

        const handleSelect = (key: string, keyPath: string[]) => {
            console.log(key, keyPath);
        };

        const getMenuList = (): Promise<Menu[]> => {
            return new Promise((resolve) => {
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
                    children: MenuList.slice(5, MenuList.length),
                }
                let newMenuList: Array<Menu> = [...MenuList.slice(0,5),value];
                resolve(newMenuList);
            });
        };

        onBeforeMount(async () => {
            menuList.value = await getMenuList();
        });

        return {
            handleSelect,
            menuList,
            defaultActive: computed(() => route.path),
        };
    },
    components: {
        MyElMenuItem
    }
});
</script>

<style lang="scss" scoped></style>
