<template>
    <div class="my-el-table">
        <el-table v-bind="$attrs" size="medium">
            <slot></slot>
        </el-table>
        <div class="pagination" v-if="pagination">
            <el-pagination
                :small="small"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
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
            </el-pagination>
            <div>
                <slot name="bottom"></slot>
            </div>
        </div>
    </div>
</template>

<!--
    el-table,el-pagination 属性合并到 my-el-table
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
export default defineComponent({
    name: "MyElTable",
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

        // ctx.slots.default() 报警告  Non-function value encountered for default slot. Prefer function slots for b
        // return () => {
        //     return h("div", { class: "my-el-table" }, [
        //         ctx.slots.operate && ctx.slots.operate().length > 0
        //             ? h(
        //                   "div",
        //                   {
        //                       class: "handle-box",
        //                   },
        //                   ctx.slots.operate().map((item) => {
        //                       return h("div", {}, item);
        //                   })
        //               )
        //             : "",
        //         ctx.slots.default
        //             ? h(
        //                   ElTable,
        //                   {
        //                       ...ctx.attrs,
        //                   },
        //                   ctx.slots.default()
        //               )
        //             : "",
        //         props.pagination
        //             ? h(
        //                   "div",
        //                   {
        //                       class: "pagination",
        //                   },
        //                   [
        //                       h(
        //                           ElPagination,
        //                           {
        //                               small: props.small,
        //                               background: props.background,
        //                               layout: "total, sizes, prev, pager, next, jumper",
        //                               pageSizes: props.pageSize,
        //                               currentPage: page,
        //                               total: props.total,
        //                               prevText: props.prevText,
        //                               nextText: props.nextText,
        //                               disabled: props.disabled,
        //                               hideOnSinglePage: props.hideOnSinglePage,
        //                               onCurrentChange: ($event: number) => {
        //                                   emitHandle("page-change", $event);
        //                               },
        //                               onSizeChange: ($event: number) => {
        //                                   emitHandle("page-change", $event);
        //                               },
        //                               onPrevClick: ($event: number) => {
        //                                   emitHandle("prev-click", $event);
        //                               },
        //                               onNextClick: ($event: number) => {
        //                                   emitHandle("next-click", $event);
        //                               },
        //                           },
        //                           ctx.slots.pagination && ctx.slots.pagination()
        //                       ),
        //                       h("div", {}, ctx.slots.bottom && ctx.slots.bottom()),
        //                   ]
        //               )
        //             : "",
        //     ]);
        // };
    },
});
</script>

<style lang="scss" scoped>
.my-el-table .pagination {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
</style>
