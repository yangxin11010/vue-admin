<template>
    <el-drawer v-bind="$attrs" :size="defaultSize">
        <slot></slot>
        <template #title>
            <slot name="title"></slot>
        </template>
    </el-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { ElDrawer } from "element-plus";
import { useResize } from "@/hooks";

export default defineComponent({
    name: "MyDrawer",
    props: {
        size: {
            type: [String, Number],
            default: "30%",
        },
    },
    setup(props) {
        const { width } = useResize();

        const defaultSize = computed(() => {
            const dSize = typeof props.size === "string" ? props.size : props.size + "px";
            return width.value > 1000 ? dSize : width.value > 800 ? "40%" : width.value > 500 ? "50%" : "80%";
        });

        return {
            defaultSize,
        };
    },
    components: {
        ElDrawer,
    },
});
</script>

<style lang="scss" scoped></style>
