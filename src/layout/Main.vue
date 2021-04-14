<template>
    <div class="main main-scroll-box">
        <div :class="{ 'main-box': !mainStyleList.includes($route.path) }">
            <slot></slot>
        </div>
        <el-backtop class="backtop" target=".main-scroll-box"></el-backtop>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
    setup() {
        const mainStyleList: string[] = ["/dashboard", "/personCenter"];

        onMounted(() => {});

        return {
            mainStyleList,
        };
    },
});
</script>

<style lang="scss" scoped>
.main {
    background-color: #f0f2f5;
    padding: 10px 10px 0;
    min-height: calc(100% - 30px);
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
    background-color: $main-color;
    color: #fff;
    opacity: 0.3;
    &:hover {
        opacity: 1;
        transition: all 0.3s linear;
    }
}
</style>
