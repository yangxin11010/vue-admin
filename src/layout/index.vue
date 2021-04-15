<template>
    <div class="home">
        <el-container class="container">
            <v-aside></v-aside>
            <el-main
                class="main overhide"
                :style="{
                    width: `calc(100% - ${collapse ? '64' : '200'}px)`,
                }"
            >
                <el-header height="60px" class="header">
                    <v-header></v-header>
                </el-header>
                <el-container class="container_main" direction="vertical">
                    <v-tabs v-if="openTabs"></v-tabs>
                    <v-main>
                        <my-router-view></my-router-view>
                    </v-main>
                </el-container>
            </el-main>
        </el-container>
        <v-setting></v-setting>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { Header, Aside, Tabs, Main, Setting } from "./components";
import MyRouterView from "@/components/MyRouterView.vue";

export default defineComponent({
    setup() {
        const store = useStore();

        return {
            collapse: computed(() => store.getters.collapse),
            openTabs: computed(() => store.getters.openTabs),
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
