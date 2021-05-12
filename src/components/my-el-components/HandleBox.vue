<template>
    <el-space class="space" wrap>
        <slot></slot>
    </el-space>
</template>

<!-- 
    继承  el-space 所有属性  
    新增 
        @params {Number} bottom  2
-->

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "HandleBox",
});
</script>

<style lang="scss" scoped>
.space {
    margin-bottom: 2px !important;
}
/deep/ {
    .el-space__item {
        padding-bottom: 10px !important;
    }
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
