<template>
    <div class="menu">
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="addMenu">添加菜单</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span="24">
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
                            <el-tag :type="row.status === 0 ? 'danger' : 'primary'">
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
                            >
                                {{ row.status === 0 ? "启用" : "禁用" }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog title="新增菜单" v-model="dialogVisible" width="40%">
            <el-form :model="menuForm" ref="menuFormRef" label-width="80px">
                <el-form-item label="上级菜单" prop="parentMenuId">
                    <el-select v-model="menuForm.parentMenuId">
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
                    <el-input v-model="menuForm.title"></el-input>
                </el-form-item>
                <el-form-item
                    prop="path"
                    label="菜单路径"
                    :rules="[{ required: true, message: '请输入菜单路径', trigger: 'blur' }]"
                >
                    <el-input v-model="menuForm.path">
                        <template v-if="menuForm.parentMenuId !== null" #prepend>
                            {{ parentMenuPath(menuForm.parentMenuId) }}
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="icon" label="菜单图标">
                    <el-input v-model="menuForm.icon"></el-input>
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
import { ElMessageBox } from "element-plus";
import ElMessage from "@/util/message/index";
import { Menu } from "@ts/views";
import MenuList from "@/assets/js/menuList";

export default defineComponent({
    name: "MenuPage",
    setup() {
        let menuList = ref<Menu[]>([]);

        const getMenuList = (): Promise<Menu[]> => {
            return new Promise((resolve) => {
                resolve(MenuList);
            });
        };

        const dialogVisible = ref(false);
        let menuForm = reactive<Menu>({
            title: "",
            path: "",
            icon: "",
            parentMenuId: null,
            isEdit: false,
            status: 1,
            children: [],
        });

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
                    return;
                } else {
                    val = getMenuPathById(id, item.children);
                }
            });
            return val;
        };

        const parentMenuPath = computed(() => {
            return (menuId: number | null) => {
                if (menuId || menuId !== null) {
                    return getMenuPathById(menuId, menuList.value);
                }
                return menuId;
            };
        });

        let isAddMenu = ref(true);

        const addMenu = async () => {
            dialogVisible.value = true;
            isAddMenu.value = true;
            await nextTick();
            menuFormRef.value.resetFields();
        };

        // 操作
        const operate = async (type: number, item?: Menu) => {
            if (type === 0 && item) {
                // 修改菜单
                dialogVisible.value = true;
                await nextTick();
                menuFormRef.value.clearValidate();
                isAddMenu.value = false;
                menuForm = Object.assign(menuForm, item);
            } else if (type === 1 && item) {
                dialogVisible.value = false;
                // 禁用菜单
                item.status = item.status === 0 ? 1 : 0;
                ElMessage({
                    message: item.status === 0 ? "已禁用" : "已启用",
                    type: item.status === 0 ? "info" : "success",
                });
            }
        };

        let menuFormRef = ref();

        const submit = () => {
            menuFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    ElMessageBox({
                        title: "提示",
                        message: isAddMenu.value ? "确定添加吗？" : "确定修改吗？",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        showCancelButton: true,
                        type: "warning",
                    })
                        .then(() => {
                            dialogVisible.value = false;
                            console.log(menuForm);
                        })
                        .catch(() => {});
                } else {
                    return false;
                }
            });
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
