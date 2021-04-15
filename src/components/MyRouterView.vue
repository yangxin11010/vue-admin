<template>
    <router-view v-slot="{ Component }">
        <transition name="route-fade" mode="out-in">
            <keep-alive :include="keepAliveList">
                <component :is="Component"></component>
            </keep-alive>
        </transition>
    </router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { Tabs } from "@model/views";

export default defineComponent({
    name: "MyRouterView",
    setup() {
        const store = useStore();

        const openTabs = computed(() => store.getters.openTabs);

        const keepAliveList = computed(() => {
            if (openTabs.value) {
                return store.getters.tabsList
                    .map((item: Tabs[]) => {
                        return item.map((item2: Tabs) => item2.name);
                    })
                    .flat();
            } else {
                return [];
            }
        });
        return {
            keepAliveList,
        };
    },
});
</script>

<style lang="scss" scoped>
// 全局路由跳转动画
.route-fade-enter-active {
    transition: all 0.3s ease;
}

.route-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.route-fade-enter,
.route-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
