<template>
    <my-drawer v-if="setting.showSetting" :direction="direction" :before-close="beforeClose">
        <div class="setting">
            <p class="title">{{ $t("system.title") }}</p>
            <div class="set-mode">
                <p class="set-mode-title">{{ $t("system.navMode") }}</p>
                <div class="set-mode-box">
                    <div class="set-mode-box-item set-mode-place set-mode-side" @click="changeNavTpe('side')">
                        <i v-if="navType === 'side'" class="set-mode-check el-icon-check"></i>
                    </div>
                    <div class="set-mode-box-item set-mode-place set-mode-top" @click="changeNavTpe('top')">
                        <i v-if="navType === 'top'" class="set-mode-check el-icon-check"></i>
                    </div>
                </div>
            </div>
            <div class="set-item">
                <div>{{ $t("system.direction") }}</div>
                <el-select v-model="direction" style="width: 80px;" size="mini">
                    <el-option label="left" value="left"></el-option>
                    <el-option label="right" value="right"></el-option>
                </el-select>
            </div>
            <div class="set-item">
                <div>{{ $t("system.sidebarLogo") }}</div>
                <el-switch
                    :value="openLogo"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 0)"
                    :disabled="['top'].includes(navType)"
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
                    :disabled="['top'].includes(navType)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>{{ $t("system.asideFixed") }}</div>
                <el-switch
                    :value="asideFixed"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    :disabled="['top'].includes(navType)"
                    @change="switchChange($event, 4)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>{{ $t("system.headerMenu") }}</div>
                <el-switch
                    :value="headerMenu"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    :disabled="['top'].includes(navType)"
                    @change="switchChange($event, 3)"
                ></el-switch>
            </div>
        </div>
    </my-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MyDrawer from "@/components/MyDrawer.vue";
import { setting } from "@/config";
import { useLocation } from "@/hooks";

export default defineComponent({
    setup() {
        const openLogo = useLocation({
                name: "global-setting-openLogo",
                value: setting.openLogo,
            }),
            openTabs = useLocation({
                name: "global-setting-openTabs",
                value: setting.openTabs,
            }),
            uniqueOpened = useLocation({
                name: "global-setting-uniqueOpened",
                value: true,
            }),
            headerMenu = useLocation({
                name: "global-setting-headerMenu",
                value: false,
                storage: "session",
            }),
            asideFixed = useLocation({
                name: "global-setting-asideFixed",
                value: false,
            }),
            navType = useLocation({
                name: "global-setting-navType",
                value: "side",
            }),
            direction = ref("right");

        const switchChange = (e: boolean, index: number) => {
            switch (index) {
                case 0:
                    openLogo.value = e;
                    break;
                case 1:
                    openTabs.value = e;
                    break;
                case 2:
                    uniqueOpened.value = e;
                    break;
                case 3:
                    headerMenu.value = e;
                    break;
                case 4:
                    asideFixed.value = e;
                    break;
            }
        };

        const changeNavTpe = (type: string) => {
            if (type === "top") {
                openLogo.value = true;
            }
            navType.value = type;
        };

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
            navType,
            changeNavTpe,
            direction,
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
.set-mode {
    margin-bottom: 20px;
}
.set-mode-box {
    display: flex;
    margin-top: 10px;
}
.set-mode-box-item {
    width: 50px;
    height: 45px;
    background-color: #f0f2f5;
    margin-right: 20px;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
    cursor: pointer;
    position: relative;
}
.set-mode-place::before {
    content: "";
    display: block;
    width: 13px;
    height: 100%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: #304156;
    position: relative;
}
.set-mode-place::after {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: #fff;
    position: absolute;
    top: 0;
}
.set-mode-side::before {
    z-index: 20;
}
.set-mode-side::after {
    z-index: 10;
}
.set-mode-top::before {
    background: #f0f2f5;
}
.set-mode-top::after {
    background: #304156;
}
.set-mode-check {
    position: absolute;
    right: 10px;
    top: 20px;
    font-size: 18px;
    color: #1890ff;
}
.set-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, 0.65);
}
</style>
