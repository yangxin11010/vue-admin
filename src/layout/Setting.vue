<template>
    <Drawer v-if="setting.showSetting" :direction="direction" :before-close="beforeClose">
        <div class="setting">
            <p class="title">{{ $t("system.title") }}</p>
            <div class="set-mode">
                <p class="set-mode-title">{{ $t("system.navMode") }}</p>
                <div class="set-mode-box">
                    <div
                        class="set-mode-box-item set-mode-place set-mode-side"
                        @click="handleOperateSetting('side', 5)"
                    >
                        <i v-if="navType === 'side'" class="set-mode-check el-icon-check"></i>
                    </div>
                    <div class="set-mode-box-item set-mode-place set-mode-top" @click="handleOperateSetting('top', 5)">
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
                    :disabled="asideFixedCpd"
                    @change="handleOperateSetting($event, 3)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>{{ $t("system.headerMenu") }}</div>
                <el-switch
                    :value="headerMenu"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    :disabled="headerMenuCpd"
                    @change="switchChange($event, 4)"
                ></el-switch>
            </div>
        </div>
    </Drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from "vue";
import Drawer from "@/components/Drawer.vue";
import { setting } from "@/config";
import { useResize } from "@/hooks";
import { useStore } from "@/store";
import { warningMessage } from "@/util/message";
import { useI18n } from "vue-i18n";
import { getSystemType } from "@/util";

export default defineComponent({
    setup() {
        const store = useStore(),
            { t: $t } = useI18n(),
            openLogo = computed(() => store.getters["setting/openLogo"]),
            openTabs = computed(() => store.getters["setting/openTabs"]),
            uniqueOpened = computed(() => store.getters["setting/uniqueOpened"]),
            headerMenu = computed(() => store.getters["setting/headerMenu"]),
            asideFixed = computed(() => store.getters["setting/asideFixed"]),
            navType = computed(() => store.getters["setting/navType"]),
            isHandleAsideFixed = computed(() => store.getters["setting/isHandleAsideFixed"]),
            direction = ref("right"),
            windowResizeRef = ref(false);

        // 设置 setting 值
        const switchChange = (e: boolean | string, index: number) => {
            let key: string = "";
            switch (index) {
                case 0:
                    key = "openLogo";
                    break;
                case 1:
                    key = "openTabs";
                    break;
                case 2:
                    key = "uniqueOpened";
                    break;
                case 3:
                    key = "asideFixed";
                    break;
                case 4:
                    key = "headerMenu";
                    break;
                case 5:
                    key = "navType";
                    break;
                case 6:
                    key = "isHandleAsideFixed";
                    break;
            }
            key && store.dispatch("setting/SET_SETTING", { key, value: e });
        };

        // 禁止 窗口变化 设置 setting 值
        const handleOperateSetting = (e: boolean | string, index: number) => {
            switch (index) {
                case 3:
                    switchChange(e, index);
                    switchChange(e, 6);
                    break;
                case 5:
                    // 如果为手机端 禁止 设置为top
                    if (width.value < 500 && getSystemType() && e === "top") {
                        warningMessage($t("system.navTypeMsg"));
                        break;
                    }
                    switchChange(e, index);
                    break;
            }
        };

        // 监听窗口宽度变化
        const { width } = useResize(([width]) => {
            if (width < 1366) {
                windowResizeRef.value = true;
                switchChange("side", 5);
                switchChange(!windowResizeRef.value, 4);
            } else {
                windowResizeRef.value = false;
            }
            // else if(768 <= value){

            // }
            // else if(992 <= value){

            // }
            // else if(1200 <= value){

            // }
            // else if(1920 <= value){

            // }
            if (!isHandleAsideFixed.value) {
                switchChange(windowResizeRef.value, 3);
            }
        });

        // Drawer 关闭前 回调
        const beforeClose = (done: () => void) => {
            console.warn("Drawer is colsed");
            done();
        };

        // 控制 headerMenu switch 开关是否禁用
        const headerMenuCpd = computed(() => {
            return [["top"].includes(navType.value), windowResizeRef.value, getSystemType()].some((item) => item);
        });

        const asideFixedCpd = computed(() => {
            return [["top"].includes(navType.value), getSystemType()].some((item) => item);
        });

        onBeforeMount(() => {
            if (getSystemType()) {
                handleOperateSetting(true, 3);
            }
        });

        return {
            beforeClose,
            openLogo,
            openTabs,
            switchChange,
            handleOperateSetting,
            setting,
            uniqueOpened,
            asideFixed,
            headerMenu,
            navType,
            direction,
            headerMenuCpd,
            asideFixedCpd,
        };
    },
    components: {
        Drawer,
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
