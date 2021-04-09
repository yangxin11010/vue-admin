<template>
    <el-table :data="data" :show-header="false">
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
        <el-table-column width="120">
            <template v-slot="{ row }">
                <el-tag :type="row.isFinish ? 'success' : 'danger'" style="cursor: pointer">
                    {{ row.isFinish ? "finish" : "unfinish" }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column :width="showDel ? '120' : '50'">
            <template v-slot="{ row }">
                <el-button type="text" @click="delAndBack(row)">
                    {{ operateText }}
                </el-button>
                <el-button v-if="showDel" type="text" @click="realDel(row)">
                    delete
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ToDoItem } from "@ts/views";

export default defineComponent({
    name: "ToDoTableItem",
    props: {
        data: {
            type: Array,
            required: true,
        },
        operateText: {
            type: String,
            default: "操作",
        },
        showDel: {
            type: Boolean,
            default: false,
        },
    },
    setup(_props, ctx) {
        const delAndBack = (item: ToDoItem) => {
            ctx.emit("delAndBack", item);
        };
        const realDel = (item: ToDoItem) => {
            ctx.emit("realDel", item);
        };
        return {
            delAndBack,
            realDel,
        };
    },
});
</script>

<style lang="scss" scoped>
.checked {
    color: #999999;
    text-decoration: line-through;
}
</style>
