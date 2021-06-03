<template>
    <el-menu
        v-if="openLogo"
        class="logo-box"
        :collapse="modeState ? false : fixed ? false : collapse"
        router
        :background-color="backGColor"
        :collapse-transition="!fixed"
    >
        <el-menu-item class="logo-title" index="/">
            <img class="logo" :src="logo" :alt="title" />
            <template #title>
                <span class="title">{{ title }}</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { useStore, NavType } from "@/store";
import { setting } from "@/config";
import { globalColor } from "@/config";
export default defineComponent({
    name: "TitleLogo",
    props: {
        mode: {
            type: String as PropType<"horizontal" | "vertical">,
            default: "vertical",
        },
        logo: {
            type: String,
            default: setting.logo,
        },
        title: {
            type: String,
            default: setting.logoText,
        },
        fixed: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const store = useStore();
        const openLogo = computed<boolean>(() => store.getters["setting/openLogo"]),
            navType = computed<NavType>(() => store.getters["setting/navType"]);

        const backGColor = computed(() => {
            return ["top"].includes(navType.value) ? globalColor.asideBColor : "#2b2f3a";
        });

        return {
            collapse: computed<boolean>(() => store.getters["setting/collapse"]),
            modeState: computed(() => props.mode === "horizontal"),
            openLogo,
            setting,
            navType,
            backGColor,
        };
    },
});
</script>

<style lang="scss" scoped>
.logo-box {
    width: 250px;
    border: none !important;
    height: 60px;
    overflow: hidden;
}
.logo-title {
    height: 60px;
    line-height: 60px;
}
.logo {
    width: 40px;
    height: 40px;
    position: relative;
    left: -8px;
}
.title {
    width: 130px;
    display: inline-block;
    color: #fff;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
