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
                    <v-tabs></v-tabs>
                    <v-main>
                        <my-router-view></my-router-view>
                    </v-main>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from "vue";
import { useStore } from "@/store/index";

export default defineComponent({
    setup() {
        const store = useStore();

        return {
            collapse: computed(() => store.getters.collapse),
        };
    },
    components: {
        vHeader: defineAsyncComponent(() => import("@/layout/Header.vue")),
        vAside: defineAsyncComponent(() => import("@/layout/Aside.vue")),
        vTabs: defineAsyncComponent(() => import("@/layout/Tabs.vue")),
        vMain: defineAsyncComponent(() => import("@/layout/Main.vue")),
        MyRouterView: defineAsyncComponent(() => import("@/components/MyRouterView.vue")),
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
