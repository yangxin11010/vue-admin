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
                        <router-view v-slot="{ Component }">
                            <transition name="fade" mode="out-in">
                                <keep-alive :include="keepAliveList">
                                    <component :is="Component"></component>
                                </keep-alive>
                            </transition>
                        </router-view>
                    </v-main>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from "vue";
import { useStore } from "@/store/index";
import { Tabs } from "@/model/views";

export default defineComponent({
    setup() {
        const store = useStore();

        const keepAliveList = computed(() =>
            store.getters.tabsList
                .map((item: Tabs[]) => {
                    return item.map((item2: Tabs) => item2.name);
                })
                .flat()
        );

        return {
            collapse: computed(() => store.getters.collapse),
            keepAliveList,
        };
    },
    components: {
        vHeader: defineAsyncComponent(() => import("@/layout/Header.vue")),
        vAside: defineAsyncComponent(() => import("@/layout/Aside.vue")),
        vTabs: defineAsyncComponent(() => import("@/layout/Tabs.vue")),
        vMain: defineAsyncComponent(() => import("@/layout/Main.vue")),
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

.fade-enter-active {
    transition: all 0.3s ease;
}

.fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
