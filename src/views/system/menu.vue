<template>
    <div class="menu">
        <handle-box>
            <el-button type="primary" @click="addMenu">添加菜单</el-button>
        </handle-box>
        <el-row>
            <el-col :span="24">
                <my-el-table
                    :data="menuList"
                    :show-header="true"
                    border
                    row-key="title"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                    :total="menuList.length"
                    @page-change="pageChange"
                    @size-change="sizeChange"
                >
                    <el-table-column label="菜单名称" prop="title" align="left">
                        <template v-slot="{ row }">
                            <i :class="row.icon"></i>
                            <span style="margin-left: 5px;">{{ row.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜单路径" prop="path" align="left"></el-table-column>
                    <el-table-column label="菜单图标" prop="icon" align="left"></el-table-column>
                    <el-table-column label="缓存状态" prop="keepAlive" align="center" width="100">
                        <template v-slot="{ row }">
                            <el-tag :type="row.keepAlive ? 'success' : 'danger'">
                                {{ row.keepAlive ? "开启" : "关闭" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜单状态" prop="status" width="150" align="center">
                        <template v-slot="{ row }">
                            <el-tag :type="row.status === 0 ? 'danger' : 'success'">
                                {{ row.status === 0 ? "已禁用" : "已启用" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                        <template v-slot="{ row }">
                            <el-button size="mini" type="info" @click="operate(0, row)">
                                修改
                            </el-button>
                            <el-button
                                size="mini"
                                :type="row.status === 0 ? 'primary' : 'danger'"
                                :disabled="row.status === 2"
                                @click="operate(1, row)"
                                v-permissions="['admin', 'boss']"
                            >
                                {{ row.status === 0 ? "启用" : "禁用" }}
                            </el-button>
                        </template>
                    </el-table-column>
                </my-el-table>
            </el-col>
        </el-row>

        <el-dialog :title="`${isAddMenu ? '添加' : '修改'}菜单`" v-model="dialogVisible" width="40%">
            <el-form :model="menuForm" ref="menuFormRef" label-width="80px">
                <el-form-item label="上级菜单" prop="parentMenuId">
                    <el-select v-model="menuForm.parentMenuId" clearable>
                        <template v-for="item in parentMenuIdOptions" :key="item.title">
                            <el-option :label="item.title + ' --> ' + item.path" :value="item.menuId"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="title"
                    label="菜单名称"
                    :rules="[{ required: true, message: '请输入菜单名称', trigger: 'blur' }]"
                >
                    <el-input v-model="menuForm.title" clearable></el-input>
                </el-form-item>
                <el-form-item
                    prop="path"
                    label="菜单路径"
                    :rules="[{ required: true, message: '请输入菜单路径', trigger: 'blur' }]"
                >
                    <el-input v-model="menuForm.path" clearable>
                        <template v-if="menuForm.parentMenuId !== null" #prepend>
                            {{ parentMenuPath(menuForm.parentMenuId) }}
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="icon" label="菜单图标">
                    <el-input v-model="menuForm.icon" clearable></el-input>
                </el-form-item>
                <el-form-item prop="keepAlive" label="缓存状态">
                    <el-switch
                        v-model="menuForm.keepAlive"
                        :active-value="true"
                        :inactive-value="false"
                        active-color="#13ce66"
                        inactive-color="#dddddd"
                    ></el-switch>
                </el-form-item>
                <el-form-item prop="status" label="是否启用">
                    <el-switch
                        v-model="menuForm.status"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#dddddd"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button @click="submit" type="primary">{{ isAddMenu ? "添 加" : "修 改" }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref } from "vue";
import { warningMsgBox } from "@/util/messageBox";
import { successMessage, warningMessage } from "@/util/message";
import { Menu } from "@/model/views";
import MenuList from "@/assets/js/menuList";

export default defineComponent({
    name: "MenuPage",
    setup() {
        let menuList = ref<Menu[]>([]);

        let menuFormRef = ref();
        const dialogVisible = ref(false);

        let isAddMenu = ref(true);

        let menuForm = reactive<Menu>({
            title: "",
            path: "",
            icon: "",
            parentMenuId: null,
            keepAlive: true,
            status: 1,
            children: [],
        });

        // 一级菜单 列表
        const parentMenuIdOptions = computed(() => {
            let val: Menu[] = [];
            menuList.value.forEach((item: Menu) => {
                val.push(Object.assign(JSON.parse(JSON.stringify(item)), { children: [] }));
            });
            return val;
        });

        const getMenuPathById = (id: number, list: Menu[]) => {
            let val: string | null = null;
            list.forEach((item) => {
                if (item.menuId === id) {
                    val = item.path;
                } else {
                    const nextVal = getMenuPathById(id, item.children);
                    nextVal && (val = nextVal);
                }
            });
            return val;
        };

        // 上级菜单
        const parentMenuPath = computed(() => {
            return (menuId: number | null) => {
                if (menuId || menuId !== null) {
                    return getMenuPathById(menuId, menuList.value);
                }
                return menuId;
            };
        });

        // 添加菜单
        const addMenu = async () => {
            dialogVisible.value = true;
            isAddMenu.value = true;
            await nextTick();
            menuFormRef.value.resetFields();
        };

        // 修改 menuList 里的 菜单
        const updateMenu = (menu: Menu) => {
            menu = JSON.parse(JSON.stringify(menuForm));
            const parentMenuId = menu.parentMenuId;
            if (!parentMenuId) {
                const index = menuList.value.findIndex((item) => item.menuId === menu.menuId);
                menuList.value[index] = menu;
            } else {
                const parentMenuIndex = menuList.value.findIndex((item) => item.menuId === parentMenuId);
                const index = menuList.value[parentMenuIndex].children.findIndex((item) => item.menuId === menu.menuId);
                menuList.value[parentMenuIndex].children[index] = menu;
            }
        };

        // 操作
        const operate = async (type: number, item: Menu) => {
            if (type === 0) {
                // 修改菜单
                dialogVisible.value = true;
                await nextTick();
                menuFormRef.value.clearValidate();
                isAddMenu.value = false;
                menuForm = Object.assign(menuForm, item);
            } else if (type === 1) {
                // 禁用/启用菜单
                dialogVisible.value = false;
                warningMsgBox(`确认${item.status === 0 ? "启用" : "禁用"}此菜单吗？`).then(() => {
                    item.status = item.status === 0 ? 1 : 0;
                    item.status === 0 ? warningMessage("已禁用") : successMessage("已启用");
                });
            }
        };

        const submit = () => {
            menuFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    warningMsgBox(`确定${isAddMenu.value ? "添加" : "修改"}吗？`)
                        .then(() => {
                            dialogVisible.value = false;
                            updateMenu(menuForm);
                            successMessage(`${isAddMenu.value ? "添加" : "修改"}成功！`);
                        })
                        .catch(() => {});
                } else {
                    return false;
                }
            });
        };

        const getMenuList = (): Promise<Menu[]> => {
            return new Promise((resolve) => {
                resolve(MenuList);
            });
        };

        const pageChange = (value: number) => {
            console.log(value);
        };

        const sizeChange = (value: number) => {
            console.log(value);
        };

        onMounted(async () => {
            menuList.value = await getMenuList();
        });

        return {
            menuList,
            operate,
            menuForm,
            dialogVisible,
            parentMenuIdOptions,
            menuFormRef,
            submit,
            isAddMenu,
            parentMenuPath,
            addMenu,
            pageChange,
            sizeChange,
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
