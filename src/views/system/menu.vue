<template>
    <div class="menu">
        <el-table
            :data="menuList"
            :show-header="true"
            border
            row-key="title"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column label="菜单名称" prop="title" align="left">
                <template v-slot="{ row }">
                    <i :class="row.icon"></i>
                    <span style="margin-left: 5px;">{{ row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="菜单路径" prop="path" align="left"></el-table-column>
            <el-table-column label="菜单图标" prop="icon" align="left"></el-table-column>
            <el-table-column label="菜单状态" prop="status" width="150" align="center">
                <template v-slot="{ row }">
                    <el-tag :type="row.status === 0 ? 'success' : 'error'">
                        {{ row.status === 0 ? "已启用" : "已禁用" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template v-slot="{ row }">
                    <el-button size="mini" :type="row.status === 0 ? 'info' : 'primary'" :disabled="row.status === 1">
                        {{ row.status === 0 ? "禁用" : "启用" }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "MenuPage",
    setup() {
        const menuList = ref<object[]>([]);

        const getMenuList = (): Promise<object[]> => {
            return new Promise((resolve) => {
                const menuList: object[] = [
                    {
                        title: "首页",
                        path: "/dashboard",
                        icon: "el-icon-setting",
                        status: 0,
                        children: [],
                    },
                    {
                        title: "图标",
                        path: "/svg",
                        icon: "el-icon-setting",
                        status: 0,
                        children: [],
                    },
                    {
                        title: "设置",
                        path: "/setting",
                        icon: "el-icon-setting",
                        status: 0,
                        children: [
                            {
                                title: "系统设置",
                                path: "/system",
                                icon: "",
                                status: 0,
                                children: [],
                            },
                            {
                                title: "菜单管理",
                                path: "/menu",
                                icon: "",
                                status: 0,
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
        };
    },
});
</script>

<style lang="scss" scoped>
.menu {
    width: 100%;
    height: 100%;
}
</style>
