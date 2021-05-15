<template>
    <div class="main main-scroll-box">
        <div :class="{ 'main-box': !formatMainStyleList.includes($route.path) }">
            <slot></slot>
        </div>
        <el-backtop class="backtop" target=".main-scroll-box"></el-backtop>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { mainStyleList, globalColor } from "@/config";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();

        const formatMainStyleList = computed(() => {
            // 获取路由列表
            const allRouters = router.getRoutes();
            // 获取 样式列表 里的路由 name
            const routeList = allRouters.filter((item) => mainStyleList.includes(item.path)).map((item) => item.name);
            // 通过 name 获取 样式列表里 的 path 和 别名 path
            const newMainStyleList = allRouters
                .filter((item) => routeList.includes(item.name))
                .map((item) => item.path);
            return newMainStyleList;
        });

        return {
            formatMainStyleList,
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
