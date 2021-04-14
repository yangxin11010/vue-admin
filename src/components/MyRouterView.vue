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
import { useStore } from "@/store/index";
import { Tabs } from "@ts/views";

export default defineComponent({
    name: "MyRouterView",
    props: {},
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
