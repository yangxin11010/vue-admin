<template>
    <div class="user">
        <div class="handle-box">
            <div>
                <el-button type="primary" @click="addUser">新增用户</el-button>
            </div>
        </div>
        <el-table :data="userlist" border>
            <el-table-column label="id" prop="id" width="100" align="center"></el-table-column>
            <el-table-column label="用户名" prop="username" align="center"></el-table-column>
            <el-table-column label="注册日期" prop="registDate" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template v-slot>
                    <el-button type="primary">权限</el-button>
                    <el-button type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MenuList from "@/assets/js/menuList";
import { Menu } from "@model/views";

interface Admin {
    id: number;
    username: string;
    registDate: string;
    menu: Menu[];
}

export default defineComponent({
    name: "User",
    setup() {
        let userlist = ref<Admin[]>([]);

        const addUser = () => {
            console.log(1);
        };

        const getData = () => {
            return new Promise<Admin[]>((resolve) => {
                const list: Admin[] = [
                    {
                        id: 1,
                        username: "admin",
                        registDate: "2021-04-20",
                        menu: MenuList,
                    },
                ];
                resolve(list);
            });
        };

        onMounted(async () => {
            userlist.value = await getData();
        });

        return {
            userlist,
            addUser,
        };
    },
});
</script>

<style lang="scss" scoped></style>
