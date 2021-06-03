<template>
    <div class="menu">
        <handle-box>
            <el-button type="primary" @click="addMenu">添加菜单</el-button>
        </handle-box>
        <my-table
            :data="menuList"
            :show-header="true"
            border
            row-key="title"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :total="menuList.length"
            @page-change="pageChange"
            @size-change="sizeChange"
        >
            <el-table-column label="排序" prop="sort" align="center" width="100" sortable></el-table-column>
            <el-table-column label="菜单名称" prop="title" align="left" min-width="150">
                <template v-slot="{ row }">
                    <i :class="row.icon"></i>
                    <span style="margin-left: 5px;">{{ row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="菜单路径" prop="path" align="left" min-width="150"></el-table-column>
            <el-table-column label="菜单图标" prop="icon" align="left" min-width="200"></el-table-column>
            <el-table-column label="菜单别名" prop="alias" align="left" min-width="200">
                <template v-slot="{ row }">
                    <el-space wrap>
                        <template v-for="(item, index) in row.alias" :key="index">
                            <el-tag size="small" effect="plain">{{ item }}</el-tag>
                        </template>
                    </el-space>
                </template>
            </el-table-column>
            <el-table-column
                label="菜单项目路径 / 外链接"
                prop="realPath"
                align="left"
                min-width="250"
            ></el-table-column>
            <el-table-column label="缓存状态" prop="keepAlive" align="center">
                <template v-slot="{ row }">
                    <el-tag :type="row.keepAlive ? 'success' : 'danger'">
                        {{ row.keepAlive ? "开启" : "关闭" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="菜单状态" prop="status" align="center">
                <template v-slot="{ row }">
                    <el-tag :type="row.status === 0 ? 'danger' : 'success'">
                        {{ row.status === 0 ? "已禁用" : "已启用" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template v-slot="{ row }">
                    <el-button type="primary" @click="operate(0, row)">
                        修改
                    </el-button>
                    <el-button
                        :type="row.status === 0 ? 'primary' : 'danger'"
                        :disabled="row.status === 2"
                        @click="operate(1, row)"
                        v-permissions="['admin', 'boss']"
                    >
                        {{ row.status === 0 ? "启用" : "禁用" }}
                    </el-button>
                </template>
            </el-table-column>
        </my-table>

        <my-dialog :title="`${isAddMenu ? '添加' : '修改'}菜单`" v-model="dialogVisible" width="40%">
            <el-form :model="menuForm" ref="menuFormRef" label-width="80px">
                <el-form-item label="上级菜单" prop="parentMenuId">
                    <el-cascader
                        v-model="menuForm.parentMenuId"
                        :options="parentMenuIdOptions"
                        :props="{ checkStrictly: true, label: 'title', value: 'menuId', emitPath: false }"
                        clearable
                    ></el-cascader>
                </el-form-item>
                <el-form-item
                    prop="title"
                    label="菜单名称"
                    :rules="[{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]"
                >
                    <el-input v-model="menuForm.title" clearable placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item
                    prop="path"
                    label="菜单路径"
                    :rules="[{ required: true, message: '菜单路径不能为空', trigger: 'blur' }]"
                >
                    <el-input v-model="menuForm.path" clearable placeholder="请输入路径">
                        <template v-if="menuForm.parentMenuId !== null" #prepend>
                            {{ parentMenuPath(menuForm.parentMenuId) }}
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="icon" label="菜单图标">
                    <el-input
                        class="icon-input"
                        ref="iconInputRef"
                        v-model="menuForm.icon"
                        placeholder="请选择"
                        clearable
                        @focus="choseIconInputFocus"
                    >
                        <template v-if="menuForm.icon" #prepend><i :class="menuForm.icon"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="!isAddMenu" prop="icon" label="排序">
                    <el-input v-model="menuForm.sort" clearable> </el-input>
                </el-form-item>
                <el-form-item prop="alias" label="别名">
                    <el-space class="space" wrap>
                        <template v-for="(item, index) in menuForm.alias" :key="index">
                            <el-tag
                                size="large"
                                closable
                                effect="plain"
                                :disable-transitions="false"
                                @close="aliasTagClose(index)"
                            >
                                {{ item }}
                            </el-tag>
                        </template>
                        <el-input
                            class="alias-input"
                            v-if="aliasInputShow"
                            v-model="alias"
                            ref="aliasInputRef"
                            size="small"
                            @keyup.enter="aliasInputConfirm"
                            @blur="aliasInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="alias-btn" size="small" @click="showAliasInput">+ New Alias</el-button>
                    </el-space>
                </el-form-item>
                <el-form-item prop="realPath" label="项目路径">
                    <el-input v-model="menuForm.realPath" clearable> </el-input>
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
        </my-dialog>
        <my-drawer title="请选择图标" v-model="choseIconDrawer">
            <el-tabs type="border-card" tab-position="top">
                <el-tab-pane label="Element-UI Icons">
                    <el-space wrap size="large">
                        <template v-for="(item, index) in ElIcons" :key="index">
                            <div class="chose-icon" @click="changeIcon(item)"><i :class="item" /></div>
                        </template>
                    </el-space>
                </el-tab-pane>
                <el-tab-pane label="Np-Icons">
                    <el-space wrap size="large">
                        <template v-for="(item, index) in NpIcons" :key="index">
                            <div class="chose-icon" @click="changeIcon(item)"><i :class="item" /></div>
                        </template>
                    </el-space>
                </el-tab-pane>
            </el-tabs>
        </my-drawer>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref } from "vue";
import { warningMsgBox } from "@/util/messageBox";
import { successMessage, warningMessage } from "@/util/message";
import type { Menu } from "@/model/views";
import ElIcons from "@/assets/js/icons/el-icons";
import NpIcons from "@/assets/js/icons/np-icons";
import { getParentMenuList } from "@/util";
import { useStore } from "@/store";

export default defineComponent({
    name: "MenuPage",
    setup() {
        const store = useStore();
        const menuList = computed<Array<Menu>>(() => store.getters["user/menuList"]);

        const menuFormRef = ref();
        const dialogVisible = ref(false);

        const isAddMenu = ref(true);

        let menuForm = reactive<Menu>({
            title: "",
            path: "",
            icon: "",
            parentMenuId: null,
            keepAlive: true,
            status: 1,
            sort: 0,
            alias: [],
            realPath: "",
            children: [],
        });

        const removeChildren = (list: any[]) => {
            list.forEach(item => {
                if(item.children.length <= 0) {
                    delete item.children
                }else {
                    removeChildren(item.children)
                }
            })
            return list
        };

        // 一级菜单 列表
        const parentMenuIdOptions = computed(() => {
            return removeChildren(JSON.parse(JSON.stringify(menuList.value)));
        });

        // 上级菜单
        const parentMenuPath = computed(() => {
            return (menuId: number | null) => {
                if (menuId || menuId !== null) {
                    return getParentMenuList(menuId, menuList.value).map(item => item.path).join("");
                }
                return "";
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
                menuForm = Object.assign(menuForm, JSON.parse(JSON.stringify(item)));
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
                if (!valid) return false;
                warningMsgBox(`确定${isAddMenu.value ? "添加" : "修改"}吗？`)
                    .then(() => {
                        dialogVisible.value = false;
                        updateMenu(menuForm);
                        successMessage(`${isAddMenu.value ? "添加" : "修改"}成功！`);
                    })
                    .catch(() => {});
            });
        };

        const pageChange = (value: number) => {
            console.log(value);
        };

        const sizeChange = (value: number) => {
            console.log(value);
        };

        // 选择菜单图标
        const iconInputRef = ref();
        const choseIconDrawer = ref(false);
        const choseIconInputFocus = () => {
            choseIconDrawer.value = true;
            iconInputRef.value.blur();
        };
        const changeIcon = (item: string) => {
            menuForm.icon = item;
            choseIconDrawer.value = false;
        };

        // 新增别名
        const aliasInputRef = ref();
        const aliasInputShow = ref(false);
        const alias = ref("");
        const aliasTagClose = (index: number) => {
            menuForm.alias.splice(index, 1);
        };
        const aliasInputConfirm = () => {
            const val = "/" + alias.value.replace(/\//, "");
            if (alias.value && !menuForm.alias.includes(val)) {
                menuForm.alias.push(val);
            }
            aliasInputShow.value = false;
            alias.value = "";
        };
        const showAliasInput = async () => {
            aliasInputShow.value = true;
            await nextTick();
            aliasInputRef.value.focus();
        };

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
            choseIconDrawer,
            iconInputRef,
            choseIconInputFocus,
            NpIcons,
            ElIcons,
            changeIcon,
            aliasInputRef,
            aliasInputShow,
            alias,
            aliasInputConfirm,
            showAliasInput,
            aliasTagClose,
        };
    },
});
</script>

<style lang="scss" scoped>
.menu {
    width: 100%;
    height: 100%;
}
.chose-icon {
    padding: 5px;
    font-size: 26px;
    cursor: pointer;
    &:hover {
        background-color: #f5f7fa;
    }
}
.alias-input,
.alias-btn {
    width: 90px;
}

:deep(.icon-input .el-input-group__prepend) {
    background-color: #ffffff !important;
    font-size: 24px;
    padding: 0 10px;
}
</style>
