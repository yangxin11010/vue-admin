<template>
    <div class="user">
        <handle-box :wrap="true">
            <el-button type="primary" @click="addUser">新增用户</el-button>
        </handle-box>
        <my-el-table :data="userlist" border :total="userlist.length" :page="1">
            <el-table-column label="id" prop="id" width="100" align="center" sortable></el-table-column>
            <el-table-column label="用户名" prop="username" align="center"></el-table-column>
            <el-table-column label="注册日期" prop="registDate" align="center" width="250"></el-table-column>
            <el-table-column label="描述" prop="desc" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template v-slot="{ row }">
                    <el-button type="primary" @click="operate(0, row)">修改</el-button>
                    <el-button v-permissions="['boss']" type="danger" @click="operate(1, row)">删除</el-button>
                </template>
            </el-table-column>
        </my-el-table>
        <el-dialog :title="`${isAddUser ? '新增' : '修改'}用户`" v-model="dialogVisible" width="40%">
            <el-form :model="userForm" ref="userFormRef" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" clearable placeholder="username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" clearable placeholder="password"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="menu">
                    <el-tree
                        class="form-tree"
                        :data="totalMenuList"
                        show-checkbox
                        default-expand-all
                        node-key="menuId"
                        ref="menuTreeRef"
                        highlight-current
                        :props="{ children: 'children', label: 'title' }"
                    >
                    </el-tree>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input type="textarea" v-model="userForm.desc" autosize></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button @click="submit" type="primary">{{ isAddUser ? "新 增" : "修 改" }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref } from "vue";
import { warningMsgBox } from "@/util/messageBox";
import { successMessage } from "@/util/message";
import MenuList from "@/assets/js/menuList";
import { Menu } from "@/model/views";

interface Admin {
    id?: number;
    username: string;
    password?: string;
    registDate?: string;
    menu: number[];
    desc: string;
}

export default defineComponent({
    name: "User",
    setup() {
        let userlist = ref<Admin[]>([]);

        let totalMenuList = ref<Menu[]>([]);

        const userFormRef = ref();
        const menuTreeRef = ref();

        const rules = reactive({
            username: [
                {
                    required: true,
                    message: "The username is required",
                    trigger: "blur",
                },
            ],
            password: [
                {
                    required: true,
                    message: "The password is required",
                    trigger: "blur",
                },
            ],
        });

        let dialogVisible = ref(false);
        let isAddUser = ref(true);

        let userForm = reactive<Admin>({
            username: "",
            password: "",
            menu: [],
            desc: "",
        });

        const addUser = async () => {
            isAddUser.value = true;
            dialogVisible.value = true;
            await nextTick();
            menuTreeRef.value.setCheckedKeys([]);
            userFormRef.value.resetFields();
        };

        const submit = () => {
            userFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    warningMsgBox(`确定${isAddUser.value ? "添加" : "修改"}吗？`)
                        .then(() => {
                            dialogVisible.value = false;
                            successMessage(`${isAddUser.value ? "添加" : "修改"}成功！`);
                        })
                        .catch(() => {});
                } else {
                    return false;
                }
            });
        };
        const operate = async (type: number, item: Admin) => {
            if (type === 0) {
                // 修改用户
                isAddUser.value = false;
                dialogVisible.value = true;
                await nextTick();
                userFormRef.value.clearValidate();
                userForm = Object.assign(userForm, item);
                menuTreeRef.value.setCheckedKeys(item.menu);
            } else if (type === 1) {
                // 删除用户
                warningMsgBox("确定删除吗？").then(() => {
                    console.log(item);
                    successMessage(`删除成功！`);
                });
            }
        };

        const getData = () => {
            return new Promise<Admin[]>((resolve) => {
                const list: Admin[] = [
                    {
                        id: 1,
                        username: "admin",
                        password: "123456",
                        registDate: "2021-04-20",
                        menu: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                        desc: "你好！",
                    },
                    {
                        id: 2,
                        username: "areyouok",
                        password: "123456",
                        registDate: "2021-04-21",
                        menu: [1, 2, 3, 4, 5, 6, 8, 9, 10],
                        desc: "好的！",
                    },
                ];
                resolve(list);
            });
        };

        const getMenuList = () => {
            return new Promise<Menu[]>((resolve) => {
                resolve(MenuList);
            });
        };

        onMounted(async () => {
            const [userList, menuList] = await Promise.all([getData(), getMenuList()]);
            userlist.value = userList;
            totalMenuList.value = menuList;
        });

        return {
            userFormRef,
            menuTreeRef,
            rules,
            totalMenuList,
            userlist,
            addUser,
            dialogVisible,
            isAddUser,
            userForm,
            operate,
            submit,
        };
    },
});
</script>

<style lang="scss" scoped></style>
