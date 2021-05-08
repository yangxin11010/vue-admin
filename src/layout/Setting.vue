<template>
    <my-drawer v-if="setting.showSetting" :before-close="beforeClose">
        <div class="setting">
            <p class="title">{{ $t("system.title") }}</p>
            <div class="set-item">
                <div>{{ $t("system.sidebarLogo") }}</div>
                <el-switch
                    :value="openLogo"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 0)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>{{ $t("system.tagsView") }}</div>
                <el-switch
                    :value="openTabs"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 1)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>{{ $t("system.asideOpen") }}</div>
                <el-switch
                    :value="uniqueOpened"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 2)"
                ></el-switch>
            </div>
        </div>
    </my-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MyDrawer from "@/components/MyDrawer.vue";
import { setting } from "@/config";
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";

export default defineComponent({
    setup() {
        const openLogo = ref(setting.openLogo),
            openTabs = ref(setting.openTabs),
            uniqueOpened = ref(true);

        const switchChange = (e: boolean, index: number) => {
            let eventName = "",
                locationName = "";
            switch (index) {
                case 0:
                    openLogo.value = e;
                    eventName = "changeOpenLogo";
                    locationName = "openLogo";
                    break;
                case 1:
                    openTabs.value = e;
                    eventName = "changeOpenTabs";
                    locationName = "openTabs";
                    break;
                case 2:
                    uniqueOpened.value = e;
                    eventName = "changeUniqueOpened";
                    locationName = "uniqueOpened";
                    break;
            }
            mitter.$emit(eventName, e);
            location.setItem(`global-setting-${locationName}`, e);
        };

        onMounted(() => {
            const openLogoValue = location.getItem("global-setting-openLogo"),
                openTabsValue = location.getItem("global-setting-openTabs"),
                uniqueOpenedValue = location.getItem("global-setting-uniqueOpened");

            // 侧边栏Logo
            openLogoValue !== null && (openLogo.value = openLogoValue);
            // Tabs-View
            openTabsValue !== null && (openTabs.value = openTabsValue);
            // 是否保持一个子菜单的展开
            uniqueOpenedValue !== null && (uniqueOpened.value = uniqueOpenedValue);
        });

        // my-drawer 关闭前 回调
        const beforeClose = (done: () => void) => {
            console.warn("my-drawer is colsed");
            done();
        };
        return {
            beforeClose,
            openLogo,
            openTabs,
            switchChange,
            setting,
            uniqueOpened,
        };
    },
    components: {
        MyDrawer,
    },
});
</script>

<style lang="scss" scoped>
.setting {
    padding: 30px 20px 20px;
    font-size: 14px;
}
.title {
    font-weight: bold;
    margin-bottom: 20px;
}
.set-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.65);
}
</style>
