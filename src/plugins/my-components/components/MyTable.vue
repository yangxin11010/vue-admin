<template>
    <div class="my-table">
        <el-table v-bind="$attrs" size="medium">
            <slot></slot>
            <template #append>
                <slot name="append"></slot>
            </template>
        </el-table>
        <div class="pagination" v-if="pagination">
            <my-pagination
                :small="small"
                :background="background"
                :page-sizes="pageSize"
                v-model:current-page="page"
                :total="total"
                :prev-text="prevText"
                :next-text="nextText"
                :disabled="disabled"
                :hide-on-single-page="hideOnSinglePage"
                @current-change="emitHandle('page-change', $event)"
                @size-change="emitHandle('size-change', $event)"
                @prev-click="emitHandle('prev-click', $event)"
                @next-click="emitHandle('next-click', $event)"
            >
                <slot name="pagination"></slot>
            </my-pagination>
            <div>
                <slot name="bottom"></slot>
            </div>
        </div>
    </div>
</template>

<!--
    el-table,el-pagination 属性合并到 my-table
    新增属性：
        @parmas  {Boolean}  pagination  [true]   是否显示分页
    修改的属性:
        el-table: 
            无
        el-pagination:
            @parmas  {Event}  @current-change --修改为-> @page-change
-->

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import MyPagination from "./MyPagination.vue";
import { ElTable } from "element-plus";

export default defineComponent({
    name: "MyTable",
    inheritAttrs: false,
    props: {
        pagination: {
            type: Boolean,
            default: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
        background: {
            type: Boolean,
            default: true,
        },
        pageSize: {
            type: Array as PropType<number[]>,
            default: () => [10, 20, 50, 100],
        },
        currentPage: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
        },
        prevText: {
            type: String,
        },
        nextText: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        hideOnSinglePage: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        const emitHandle = (eventName: string, value: number) => {
            ctx.emit(eventName, value);
        };

        let page = ref(props.currentPage);

        return {
            emitHandle,
            page,
        };
    },
    components: {
        ElTable,
        MyPagination,
    },
});
</script>

<style lang="scss" scoped>
.my-table .pagination {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
</style>
