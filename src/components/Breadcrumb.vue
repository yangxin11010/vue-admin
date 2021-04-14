<template>
    <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">
            <span
                class="breadcrumb"
                :class="{
                    curpot: breadcrumbList.length > 0,
                    hoverClass: breadcrumbList.length > 0,
                }"
                style="font-weight: normal"
            >
                首页
            </span>
        </el-breadcrumb-item>
        <transition-group appear name="breadcrumbList">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
                <span class="breadcrumb">{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";

export default defineComponent({
    name: "Breadcrumb",
    props: {},
    setup() {
        const route = useRoute();
        let breadcrumbList = ref<RouteLocationMatched[]>([]);

        const setBreadcrumb = () => {
            breadcrumbList.value = [];
            if (route.path === "/dashboard") return;
            route.matched.forEach((item) => {
                item.meta.title && breadcrumbList.value.push(item);
            });
        };

        watch(
            () => route.meta.title,
            () => {
                setBreadcrumb();
            }
        );

        onMounted(() => {
            setBreadcrumb();
        });

        return {
            breadcrumbList,
        };
    },
});
</script>

<style lang="scss" scoped>
.breadcrumb {
    color: #fff;
}
.breadcrumbList-enter-active,
.breadcrumbList-leave-active {
    transition: all 0.5s;
}
.breadcrumbList-enter-from,
.breadcrumbList-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.breadcrumbList-leave-active {
    position: absolute;
}
</style>
