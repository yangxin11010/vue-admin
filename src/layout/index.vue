<template>
    <div class="home">
        <el-container class="container">
            <v-aside v-if="['side'].includes(navType)" :fixed="asideFixed"></v-aside>
            <!-- <el-main
                class="main overhide"
                :style="{
                    width: `calc(100% - ${collapse ? '64' : '250'}px)`,
                }"
            > -->
            <el-main class="main overhide">
                <el-header height="60px" class="header">
                    <v-header></v-header>
                </el-header>
                <el-container class="container_main" direction="vertical">
                    <v-tabs @screenfull="changeMainScreenfull"></v-tabs>
                    <v-main ref="mainRef">
                        <my-router-view></my-router-view>
                    </v-main>
                </el-container>
            </el-main>
        </el-container>
        <v-setting></v-setting>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Tabs from "./Tabs.vue";
import Main from "./Main.vue";
import Setting from "./Setting.vue";
import { useStore } from "@/store";
import MyRouterView from "@/components/MyRouterView.vue";
import { warningMessage } from "@/util/message";
import ScreenFull from "screenfull";

export default defineComponent({
    setup() {
        const store = useStore(),
            asideFixed = computed<boolean>(() => store.getters["setting/asideFixed"]),
            navType = computed<boolean>(() => store.getters["setting/navType"]),
            mainRef = ref();

        const changeMainScreenfull = () => {
            if (!ScreenFull.isEnabled) {
                warningMessage("浏览器不支持全屏");
                return false;
            }
            ScreenFull.toggle(mainRef.value.$el);
        };

        return {
            mainRef,
            asideFixed,
            collapse: computed<boolean>(() => store.getters["setting/collapse"]),
            navType,
            changeMainScreenfull,
        };
    },
    components: {
        vHeader: Header,
        vAside: Aside,
        vTabs: Tabs,
        vMain: Main,
        vSetting: Setting,
        MyRouterView,
    },
});
</script>

<style lang="scss" scoped>
.home,
.container,
.aside,
.main {
    height: 100%;
}
.header,
.main {
    padding: 0;
}
.container_main {
    height: calc(100% - 60px);
}
</style>
