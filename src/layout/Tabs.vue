<template>
    <div
        v-if="openTabs"
        class="tabs disflex ju_bt align-it-cen"
        @mouseenter="mouseOperate(0, $event)"
        @mouseleave="mouseOperate(1, $event)"
        @contextmenu.prevent
    >
        <div class="tabs-l disflex align-it-cen" ref="tabsRef">
            <!-- 固定标签 -->
            <template v-for="(item, index) in keepTabsList" :key="item.path">
                <template v-if="index === 0">
                    <div class="tab-item" :class="{ tabs_hover: keepTabsIndex === index }" @click="tabsClick(item)">
                        <span class="tab-text" :class="{ 'tabs-keep-circle': keepTabsIndex === index }">
                            {{ $t(`aside.${item.path}`) }}
                        </span>
                    </div>
                </template>
                <template v-else>
                    <el-dropdown
                        placement="bottom"
                        size="medium"
                        @command="handleCommand($event, index)"
                        trigger="contextmenu"
                    >
                        <div class="tab-item" :class="{ tabs_hover: keepTabsIndex === index }" @click="tabsClick(item)">
                            <span class="tab-text" :class="{ 'tabs-keep-circle': keepTabsIndex === index }">
                                {{ $t(`aside.${item.path}`) }}
                            </span>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :command="2" icon="el-icon-remove">
                                    {{ $t("tabs.removeFixed") }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </template>
            <!-- 活动标签 -->
            <template v-for="(item, index) in tabsList" :key="item.path">
                <el-dropdown
                    placement="bottom"
                    size="medium"
                    @command="handleCommand($event, index)"
                    trigger="contextmenu"
                >
                    <div class="tab-item" :class="{ tabs_hover: tabsIndex === index }" @click="tabsClick(item)">
                        <span class="tab-text" :class="{ 'tabs-active-circle': tabsIndex === index }">
                            {{ $t(`aside.${item.path}`) }}
                        </span>
                        <span class="tab-close" @click.stop="closeTabs(index)"><i class="el-icon-close"></i></span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :command="0" icon="el-icon-circle-close">
                                {{ $t("tabs.closeNow") }}
                            </el-dropdown-item>
                            <template v-if="index > 0">
                                <el-dropdown-item :command="6" icon="el-icon-back">
                                    {{ $t("tabs.closeLeft") }}
                                </el-dropdown-item>
                            </template>
                            <template v-if="index < tabsList.length - 1">
                                <el-dropdown-item :command="7" icon="el-icon-right">
                                    {{ $t("tabs.closeRight") }}
                                </el-dropdown-item>
                            </template>
                            <el-dropdown-item :command="3" icon="el-icon-top">
                                {{ $t("tabs.closeOther") }}
                            </el-dropdown-item>
                            <el-dropdown-item :command="1" divided icon="el-icon-circle-plus">
                                {{ $t("tabs.keepFixed") }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </div>
        <!-- 标签选项 -->
        <div class="tabs-r disflex align-it-cen">
            <div class="update-page">
                <i :class="[tabsRotate, `${rotating ? 'rotating' : ''}`]" @click="refreshPage"></i>
            </div>
            <el-dropdown class="tabs-dropdown" placement="bottom" size="medium" @command="handleCommand($event, null)">
                <span class="tabs-dropdown-title">
                    <span>{{ $t("tabs.title") }}</span>
                    <i class="el-icon-arrow-down"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <template v-if="keepTabsIndex === -1">
                            <el-dropdown-item :command="0" icon="el-icon-circle-close">
                                {{ $t("tabs.closeNow") }}
                            </el-dropdown-item>
                        </template>
                        <template v-if="keepTabsIndex === -1 && tabsIndex > 0">
                            <el-dropdown-item :command="6" icon="el-icon-back">
                                {{ $t("tabs.closeLeft") }}
                            </el-dropdown-item>
                        </template>
                        <template v-if="keepTabsIndex === -1 && tabsIndex < tabsList.length - 1">
                            <el-dropdown-item :command="7" icon="el-icon-right">
                                {{ $t("tabs.closeRight") }}
                            </el-dropdown-item>
                        </template>
                        <el-dropdown-item :command="3" icon="el-icon-top">{{ $t("tabs.closeOther") }}</el-dropdown-item>
                        <el-dropdown-item :command="4" icon="el-icon-bottom">
                            {{ $t("tabs.closeAll") }}
                        </el-dropdown-item>
                        <template v-if="keepTabsIndex === -1">
                            <el-dropdown-item :command="1" divided icon="el-icon-circle-plus">
                                {{ $t("tabs.keepFixed") }}
                            </el-dropdown-item>
                        </template>
                        <template v-if="tabsIndex === -1 && $route.path !== '/dashboard'">
                            <el-dropdown-item :command="2" divided icon="el-icon-remove">
                                {{ $t("tabs.removeFixed") }}
                            </el-dropdown-item>
                        </template>
                        <el-dropdown-item :command="5" divided icon="np-icon-qingli">
                            {{ $t("tabs.clear") }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ElMessageBox from "@/util/messageBox";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import { globalColor } from "@/config";
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";
import { setting } from "@/config";
import { warningMessage } from "@/util/message"
import type { Tabs } from "@/model/views";

export default defineComponent({
    setup() {
        const router = useRouter(),
            route = useRoute(),
            store = useStore(),
            { t: $t } = useI18n(),
            tabsRef = ref(),
            allRoutes = router.getRoutes(),
            aliasOfParent = ref(""); //路由别名真名的路径

        // 保持固定的数组(keepTabsList)   未保持固定的数组(tabsList)
        const keepTabsList = computed<Array<Tabs>>(() => store.getters.tabsList[0]),
            tabsList = computed<Array<Tabs>>(() => store.getters.tabsList[1]),
            openTabs = ref(setting.openTabs);

        // 点击跳转
        const tabsClick = (item: Tabs) => {
            router.push(item.path);
        };

        // 未定固tab所在未固定数组的下标
        const tabsIndex = computed<number>(() =>
            store.getters.tabsList[1].findIndex((item: Tabs) => item.path === (aliasOfParent.value !== "" ? aliasOfParent.value :route.path))
        );
        // 固tab所在固定数组的下标
        const keepTabsIndex = computed<number>(() =>
            store.getters.tabsList[0].findIndex((item: Tabs) => item.path === (aliasOfParent.value !== "" ? aliasOfParent.value :route.path))
        );

        // 下拉操作
        const handleCommand = (e: number, index: number | null) => {
            switch (e) {
                case 0:
                    closeTabs(index !== null ? index : tabsIndex.value);
                    break;
                case 1:
                    store.dispatch("KEPP_TABS", index !== null ? index : tabsIndex.value);
                    break;
                case 2:
                    store.dispatch("REMOVE_KEEP_TABS", index !== null ? index : keepTabsIndex.value);
                    break;
                case 3:
                    if (keepTabsIndex.value !== -1 || tabsIndex.value === -1) {
                        // 固定
                        store.dispatch("REMOVE_TABS");
                    } else {
                        // 活跃
                        index !== null && router.push(tabsList.value[index].path);
                        store.dispatch("REMOVE_OTHER_TABS", index ? index : tabsIndex.value);
                    }
                    break;
                case 4:
                    if (keepTabsIndex.value === -1 && tabsIndex.value !== -1) {
                        router.push("/dashboard");
                    }
                    store.dispatch("REMOVE_TABS");
                    break;
                case 5:
                    ElMessageBox({
                        title: $t("tabs.clearTitle"),
                        message: $t("tabs.clearMsg"),
                        showCancelButton: true,
                        type: "warning",
                        cancelButtonText: $t("tabs.clearCancel"),
                        confirmButtonText: $t("tabs.clearConfirm"),
                    })
                        .then(() => {
                            store.dispatch("INIT_TABS");
                            router.push("/dashboard");
                        })
                        .catch(() => {});
                    break;
                case 6:
                    if (index !== null && tabsIndex.value !== -1 && tabsIndex.value < index) {
                        router.push(tabsList.value[index].path);
                    }
                    store.dispatch("REMOVE_LEFT_RIGHT_TABS", {
                        type: "left",
                        index: index !== null ? index : tabsIndex.value,
                    });
                    break;
                case 7:
                    if (index !== null && tabsIndex.value !== -1 && tabsIndex.value > index) {
                        router.push(tabsList.value[index].path);
                    }
                    store.dispatch("REMOVE_LEFT_RIGHT_TABS", {
                        type: "right",
                        index: index !== null ? index : tabsIndex.value,
                    });
                    break;
            }
        };

        // 关闭当前
        const closeTabs = (index: number) => {
            if (index === tabsIndex.value) {
                if (index === 0 && tabsList.value.length === 1) {
                    router.push(keepTabsList.value[keepTabsList.value.length - 1].path);
                } else if (index === tabsList.value.length - 1 && index !== 0) {
                    router.push(tabsList.value[index - 1].path);
                } else {
                    router.push(tabsList.value[index + 1].path);
                }
            }
            store.dispatch("REMOVE_TABS", index);
        };

        // 设置距离
        const scroll = (e: any) => {
            tabsRef.value.scrollLeft += e.deltaY;
        };
        // 监听鼠标移入移除事件
        const mouseOperate = (index: number) => {
            if (index === 0) {
                //Firefox使用addEventListener添加滚轮事件
                if (document.addEventListener) {
                    //firefox
                    document.addEventListener("DOMMouseScroll", scroll, false);
                }
                //Safari与Chrome属于同一类型
                window.onmousewheel = scroll;
            } else if (index === 1) {
                document.removeEventListener("DOMMouseScroll", scroll, false);
                window.onmousewheel = null;
            }
        };


        // 监听路由变化 添加Tabs
        watch(
            () => route.path,
            (newValue: string) => {
                aliasOfParent.value = "";
                const currentRoute = allRoutes.filter(item => item.path === newValue)[0];
                if(currentRoute.aliasOf !== undefined){
                    // 路由别名添加tabs
                    newValue = currentRoute.aliasOf.path
                    aliasOfParent.value = newValue;
                }
                if (newValue === "/dashboard") return;
                if (
                    keepTabsList.value.findIndex((item) => item.path === newValue) === -1 &&
                    tabsList.value.findIndex((item) => item.path === newValue) === -1 &&
                    route.name &&
                    route.meta.title &&
                    openTabs
                ) {
                    store.dispatch("ADD_TABS", {
                        name: route.name,
                        title: route.meta.title,
                        path: newValue,
                        keepAlive: route.meta.keepAlive,
                    });
                }
            }
        );

        const rotating = ref(false);

        const refreshPage = () => {
            rotating.value = true;
            setTimeout(() => {
                rotating.value = false;
            }, 800);
            warningMessage("This is a Demo!")
        };

        onMounted(() => {
            // 路由别名 选中tabs 
            const currentRoute = allRoutes.filter(item => item.path === route.path)[0];
            if(currentRoute.aliasOf !== undefined){
                aliasOfParent.value = currentRoute.aliasOf.path
            }
            const openLogoValue = location.getItem("global-setting-openTabs");
            openLogoValue !== null && (openTabs.value = openLogoValue);
            mitter.$on("changeOpenTabs", (value) => {
                openTabs.value = value;
            });
        });

        return {
            keepTabsList,
            tabsList,
            tabsClick,
            tabsIndex,
            keepTabsIndex,
            closeTabs,
            collapse: computed<boolean>(() => store.getters.collapse),
            handleCommand,
            mouseOperate,
            tabsRef,
            openTabs,
            refreshPage,
            rotating,
            tabsBColor: globalColor.tabsBColor,
            tabsTColor: globalColor.tabsTColor,
            tabsAColor: globalColor.tabsAColor,
            tabsATColor: globalColor.tabsATColor,
            tabsBeforKColor: globalColor.tabsBeforKColor,
            tabsBeforAColor: globalColor.tabsBeforAColor,
            tabsRotate: globalColor.tabsRotate,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.tabs {
    height: 30px;
    min-height: 34px;
    max-height: 34px;
    font-size: 12px;
    border-bottom: 1px solid #d8dce5;
    user-select: none;
    -moz-user-select: none;
    padding-top: 3px;
}
.tabs-l {
    flex: 1;
    padding-left: 10px;
    overflow-x: auto;
    user-select: none;
    position: relative;
    z-index: 90;
    &::-webkit-scrollbar {
        display: none;
    }
}
.tab-item {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    height: 26px;
    border: 1px solid #d8dce5;
    color: v-bind(tabsTColor);
    background: v-bind(tabsBColor);
    padding: 0 8px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 2px;
    &:hover {
        @extend .tabs_hover;
    }
}
.tab-text {
    white-space: nowrap;
}
.tab-close {
    width: 18px;
    height: 18px;
    text-align: center;
    border-radius: 50%;
    margin-left: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > i {
        transform: scale(0.6);
        position: relative;
        top: 1px;
    }
    transition: all 0.5s linear;
    &:hover {
        background-color: #b4bccc;
        color: #fff;
    }
}
.tabs-keep-circle::before,
.tabs-active-circle::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    // position: relative;
    margin-right: 5px;
}

.tabs-keep-circle::before {
    background: v-bind(tabsBeforKColor);
}
.tabs-active-circle::before {
    background: v-bind(tabsBeforAColor);
}
.tabs-r {
    height: 100%;
    cursor: pointer;
    box-shadow: -5px 0 5px #d6d3d3;
    position: relative;
    z-index: 100;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
}
.tabs-dropdown-title {
    height: 100%;
    // line-height: 30px;
    border-radius: 2px;
    font-size: 12px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.tabs-dropdown > span > i {
    margin-left: 5px;
}
.tabs_hover {
    background-color: v-bind(tabsAColor) !important;
    color: v-bind(tabsATColor) !important;
}
.update-page {
    width: 26px;
    height: 26px;
    line-height: 26px;
    margin-right: 10px;
    font-size: 20px;
}

/deep/ {
    .tabs-dropdown {
        height: 26px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: v-bind(tabsAColor) !important;
        color: v-bind(tabsATColor) !important;
    }
}
</style>
