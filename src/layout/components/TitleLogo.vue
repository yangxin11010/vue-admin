<template>
    <el-menu v-if="openLogo" class="logo-box" :collapse="fixed ? false : collapse" router :collapse-transition="!fixed">
        <el-menu-item class="logo-title" index="/">
            <img class="logo" :src="logo" :alt="title" />
            <template #title>
                <span class="title">{{ title }}</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "@/store";
import { setting } from "@/config";
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";
export default defineComponent({
    name: "TitleLogo",
    props: {
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
    setup() {
        const store = useStore();
        const openLogo = ref(setting.openLogo);
        onMounted(() => {
            const openLogoValue = location.getItem("global-setting-openLogo");
            // 侧边栏Logo
            openLogoValue !== null && (openLogo.value = openLogoValue);
            mitter.$on("changeOpenLogo", (value) => {
                openLogo.value = value;
            });
        });
        return {
            collapse: computed<boolean>(() => store.getters.collapse),
            openLogo,
            setting,
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
    background-color: #2b2f3a !important;
    height: 60px;
    line-height: 60px;
}
.logo {
    width: 40px;
    height: 40px;
    position: relative;
    left: -6px;
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
