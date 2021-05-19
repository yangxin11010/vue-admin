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
            <div class="set-item">
                <div>{{ $t("system.asideFixed") }}</div>
                <el-switch
                    :value="asideFixed"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 4)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>{{ $t("system.headerMenu") }}</div>
                <el-switch
                    :value="headerMenu"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 3)"
                ></el-switch>
            </div>
        </div>
    </my-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MyDrawer from "@/components/MyDrawer.vue";
import { setting } from "@/config";
import { location, session } from "@/util/storage";
import mitter from "@/plugins/mitt";

export default defineComponent({
    setup() {
        const openLogo = ref(setting.openLogo),
            openTabs = ref(setting.openTabs),
            uniqueOpened = ref(true),
            headerMenu = ref(false),
            asideFixed = ref (false);

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
                case 3:
                    headerMenu.value = e;
                    eventName = "changeHeaderMenu";
                    session.setItem("global-setting-headerMenu", e);
                    break;
                case 4:
                    asideFixed.value = e;
                    eventName = "changeAsideFixed";
                    locationName = "asideFixed";
                    break;
            }
            eventName && mitter.$emit<boolean>(eventName, e);
            locationName && location.setItem(`global-setting-${locationName}`, e);
        };

        onMounted(() => {
            const openLogoValue: boolean = location.getItem("global-setting-openLogo"),
                openTabsValue: boolean = location.getItem("global-setting-openTabs"),
                uniqueOpenedValue: boolean = location.getItem("global-setting-uniqueOpened"),
                asideFixedValue: boolean = location.getItem("global-setting-asideFixed"),
                headerMenuValue: boolean = session.getItem("global-setting-headerMenu");
            // 侧边栏Logo
            openLogoValue !== null && (openLogo.value = openLogoValue);
            // Tabs-View
            openTabsValue !== null && (openTabs.value = openTabsValue);
            // 是否保持一个子菜单的展开
            uniqueOpenedValue !== null && (uniqueOpened.value = uniqueOpenedValue);
            // aside 类型
            asideFixedValue !== null && (asideFixed.value = asideFixedValue);
            // header menu
            headerMenuValue !== null && (headerMenu.value = headerMenuValue);
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
            asideFixed,
            headerMenu,
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
