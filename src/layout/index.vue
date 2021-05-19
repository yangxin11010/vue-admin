<template>
    <div class="home">
        <el-container class="container">
            <v-aside :fixed="asideFixed"></v-aside>
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
                    <v-tabs></v-tabs>
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
import { defineComponent, computed, ref, onBeforeMount } from "vue";
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Tabs from "./Tabs.vue";
import Main from "./Main.vue";
import Setting from "./Setting.vue";
import { useStore } from "@/store";
import MyRouterView from "@/components/MyRouterView.vue";
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";

export default defineComponent({
    setup() {
        const store = useStore(),
            asideFixed = ref(false);

        onBeforeMount(() => {
            const asideFixedValue = location.getItem("global-setting-asideFixed");

            // aside 类型
            asideFixedValue !== null && (asideFixed.value = asideFixedValue);
            mitter.$on("changeAsideFixed", (value) => {
                asideFixed.value = value;
            });
        });

        return {
            asideFixed,
            collapse: computed<boolean>(() => store.getters.collapse),
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
