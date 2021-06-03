<template>
    <el-pagination v-bind="$attrs" :layout="pageLayout">
        <slot></slot>
    </el-pagination>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useResize } from "@/hooks";
import { ElPagination } from "element-plus";

export default defineComponent({
    name: "MyPagination",
    props: {
        layout: {
            type: String,
            default: "total,sizes,prev,pager,next,jumper",
        },
    },
    setup(props) {
        const { width } = useResize();
        const pageLayout = computed(() => {
            const layoutList = props.layout.split(","),
                sizesIndex = layoutList.findIndex((item) => item === "sizes"),
                pagerIndex = layoutList.findIndex((item) => item === "pager");
            layoutList[sizesIndex] = `${width.value > 800 ? "sizes" : ""}`;
            layoutList[pagerIndex] = `${width.value > 650 ? "pager" : ""}`;
            return layoutList.filter((item) => item.length > 0).join(",");
        });
        return {
            pageLayout,
        };
    },
    components: {
        ElPagination,
    },
});
</script>

<style lang="scss" scoped></style>
