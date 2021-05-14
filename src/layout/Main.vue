<template>
    <div class="main main-scroll-box">
        <div :class="{ 'main-box': !mainStyleList.includes($route.path) }">
            <slot></slot>
        </div>
        <el-backtop class="backtop" target=".main-scroll-box"></el-backtop>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mainStyleList, globalColor } from "@/config";

export default defineComponent({
    setup() {
        return {
            mainStyleList,
            backTopBColor: globalColor.backTopBColor,
            backTopTColor: globalColor.backTopTColor,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.main {
    background-color: #f0f2f5;
    padding: 10px 10px 0 !important;
    min-height: calc(100% - 34px);
    overflow-y: auto;
    overflow-x: hidden;
    @include scrollStyle;
}
.main-box {
    width: 100%;
    background-color: #ffffff;
    min-height: 100%;
    padding: 10px;
    border-radius: 5px;
}
.backtop {
    background-color: v-bind(backTopBColor);
    color: v-bind(backTopTColor);
    opacity: 0.3;
    &:hover {
        opacity: 1;
        transition: all 0.3s linear;
    }
}
</style>
