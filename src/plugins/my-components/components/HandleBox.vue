<template>
    <el-space class="space" wrap>
        <slot></slot>
    </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElSpace } from "element-plus";

export default defineComponent({
    name: "HandleBox",
    components: {
        ElSpace,
    },
});
</script>

<style lang="scss" scoped>
.space {
    margin-bottom: 2px !important;
}
:deep(.el-space__item) {
    padding-bottom: 10px !important;
}
</style>

<!--
<script lang="ts">
import { defineComponent, h } from "vue";
export default defineComponent({
    name: "HandleBox",
    props: {
        
    },
    setup(props, ctx) {
        return () =>
            h(
                "div",
                {
                    class: "handle-box",
                },
                ctx.slots.default && ctx.slots.default().map((item) => h("div", item))
            );
    },
});
</script>

<style lang="scss" scoped>
.handle-box {
    display: flex;
    flex-wrap: wrap;
    & > div {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>
-->
