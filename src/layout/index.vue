<template>
    <div class="home">
        <el-container class="container">
            <v-aside></v-aside>
            <el-main
                class="main overhide"
                :style="{
                    width: `calc(100% - ${collapse ? '64' : '250'}px)`,
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
import { defineComponent, computed, onMounted, ref } from "vue";
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Tabs from "./Tabs.vue";
import Main from "./Main.vue";
import Setting from "./Setting.vue";
import { useStore } from "@/store";
import MyRouterView from "@/components/MyRouterView.vue";
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";
import { setting } from "@/config";

export default defineComponent({
    setup() {
        const store = useStore();
        const openTabs = ref(setting.openTabs);

        onMounted(() => {
            const openLogoValue = location.getItem("global-setting-openTabs");
            openLogoValue !== null && (openTabs.value = openLogoValue);
            mitter.$on("changeOpenTabs", (value) => {
                openTabs.value = value;
            });
        });

        return {
            collapse: computed(() => store.getters.collapse),
            openTabs,
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
