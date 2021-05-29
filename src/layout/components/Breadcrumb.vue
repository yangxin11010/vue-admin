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
                {{ $t("breadcrumb") }}
            </span>
        </el-breadcrumb-item>
        <transition-group appear name="breadcrumbList">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
                <span class="breadcrumb" :class="[`${$route.path === item.path ? 'chose' : ''}`]">
                    {{ $t(`aside.${item.path}`) }}
                </span>
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
        const breadcrumbList = ref<RouteLocationMatched[]>([]);

        const setBreadcrumb = () => {
            breadcrumbList.value = [];
            const lastRoute = route.matched[route.matched.length - 1];
            if (route.path === "/dashboard" || (lastRoute.aliasOf && lastRoute.aliasOf.path === "/dashboard")) return;
            route.matched.forEach((item, index) => {
                let value = item;
                if (index === route.matched.length - 1 && lastRoute.aliasOf) {
                    value = lastRoute.aliasOf;
                }
                item.meta.title && breadcrumbList.value.push(value);
            });
        };

        watch(
            () => route.path,
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
    color: rgba(0, 0, 0, 0.45);
}
.hoverClass:hover {
    color: #1890ff;
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
.chose {
    color: rgba(0, 0, 0, 0.65);
}
</style>
