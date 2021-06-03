<template>
    <el-dialog v-bind="$attrs" :width="defaultWidth">
        <slot></slot>
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { ElDialog } from "element-plus";
import { useResize } from "@/hooks";

export default defineComponent({
    name: "MyDialog",
    props: {
        width: {
            type: [String, Number],
            default: "50%",
        },
    },
    setup(props) {
        const { width } = useResize();
        const defaultWidth = computed(() => {
            const dWidth = typeof props.width === "string" ? props.width : props.width + "px";
            return width.value > 1000 ? dWidth : width.value > 800 ? "70%" : width.value > 500 ? "80%" : "100%";
        });

        return {
            defaultWidth,
        };
    },
    components: {
        ElDialog,
    },
});
</script>

<style lang="scss" scoped>
.flex-box {
    display: flex;
}
</style>
