<template>
    <el-card class="cCard" shadow="hover" v-bind="$attrs">
        <template #header>
            <div style="font-size: 16px;">
                <span style="font-weight: bold;">ToDo List</span>
                <el-button style="float: right; padding: 3px 0;margin-right:10px;" type="text" @click="showToDoDialog"
                    >Add
                </el-button>
            </div>
        </template>
        <el-table height="326" :data="toDoList" v-loading="loading" :show-header="false" empty-text="No Things">
            <el-table-column width="35">
                <template v-slot="{ row }">
                    <el-checkbox v-model="row.isFinish"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column>
                <template v-slot="{ row }">
                    <span :class="{ checked: row.isFinish }">{{ row.things }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120" align="center">
                <template v-slot="{ row }">
                    <el-tag :type="row.isFinish ? 'success' : 'danger'" style="cursor: pointer">
                        {{ row.isFinish ? "已完成" : "未完成" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column width="50" align="center">
                <template v-slot="{ $index }">
                    <i @click="delToDo($index)" class="el-icon-close curpot"></i>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog title="待办事项" v-model="dialogVisible" width="30%">
        <el-form :model="toDoForm" ref="toDoFormRef" label-width="80px">
            <el-form-item
                prop="things"
                label="待办事项"
                :rules="[{ required: true, message: '请输入待办事项', trigger: 'blur' }]"
            >
                <el-input v-model="toDoForm.things"></el-input>
            </el-form-item>
            <el-form-item prop="isFinish" label="是否完成">
                <el-select v-model="toDoForm.isFinish">
                    <el-option label="未完成" :value="false"></el-option>
                    <el-option label="已完成" :value="true"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addToDoList">添 加</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, reactive, onMounted } from "vue";
import { successMessage } from "@/util/message";
import { ToDoItem } from "@/model/views/views";

export default defineComponent({
    name: "ToDoList",
    setup() {
        let loading = ref(false);

        let toDoList = ref<ToDoItem[]>([]);

        const dialogVisible = ref(false);
        const toDoFormRef = ref();
        let toDoForm = reactive<ToDoItem>({
            things: "",
            isFinish: false,
            isDel: false,
        });

        const addToDoList = () => {
            dialogVisible.value = true;
            toDoFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    toDoList.value.unshift(JSON.parse(JSON.stringify(toDoForm)));
                    dialogVisible.value = false;
                    successMessage("添加成功");
                    toDoFormRef.value.resetFields();
                } else {
                    return false;
                }
            });
        };

        const delToDo = (index: number) => {
            toDoList.value.splice(index, 1);
        };

        const showToDoDialog = () => {
            dialogVisible.value = true;
            nextTick(() => {
                toDoFormRef.value.resetFields();
            });
        };

        const getData = () => {
            return new Promise<ToDoItem[]>((resolve) => {
                const list = [
                    { things: "今天要修复100个bug", isFinish: false, isDel: false },
                    { things: "今天要修复100个bug", isFinish: false, isDel: false },
                    { things: "今天要写100行代码加几个bug吧", isFinish: false, isDel: false },
                    { things: "今天要修复100个bug", isFinish: false, isDel: false },
                    { things: "今天要修复100个bug", isFinish: true, isDel: true },
                    { things: "今天要写100行代码加几个bug吧", isFinish: true, isDel: false },
                    { things: "今天要修复100个bug", isFinish: false, isDel: false },
                    { things: "今天要修复100个bug", isFinish: true, isDel: false },
                    { things: "今天要写100行代码加几个bug吧", isFinish: true, isDel: false },
                ];
                resolve(list);
            });
        };

        onMounted(async () => {
            toDoList.value = await getData();
        });

        return {
            loading,
            toDoList,
            dialogVisible,
            toDoForm,
            toDoFormRef,
            addToDoList,
            delToDo,
            showToDoDialog,
        };
    },
});
</script>

<style lang="scss" scoped>
.FourZeroFour {
    width: 100%;
    height: 100%;
    flex-direction: column;
    & > div:nth-child(1) {
        width: 320px;
        height: 160px;
    }
}
.svgicon {
    transform: scale(20);
}
</style>
