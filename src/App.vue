<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, ComponentInternalInstance } from "vue";
export default defineComponent({
    name: "App",
    setup() {
        const info = "项目地址：https://gitee.com/yangxin11010/vue-admin";
        const style = "font-size: 12px;color: #333;";

        const app = getCurrentInstance() as ComponentInternalInstance;

        onMounted(() => {
            console.log(app);
            console.log("%c%s", style, info);
        });

        return {};
    },
});
</script>

<style lang="scss">
@import "@/assets/css/index.scss";
@import "@/assets/css/variables.scss";
@import "@/assets/css/animation.scss";
@import "@/assets/css/element-global.scss";
@import "@/assets/css/np-icons.scss";
.app {
    height: 100%;
}
</style>
