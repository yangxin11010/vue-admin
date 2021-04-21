<template>
    <div
        class="tabs disflex ju_bt align-it-cen"
        @mouseenter="mouseOperate(0, $event)"
        @mouseleave="mouseOperate(1, $event)"
    >
        <ul class="tabs-l disflex align-it-cen" ref="tabsRef">
            <template v-for="item in keepTabsList" :key="item.path">
                <li class="tab-item" :class="{ tabs_hover: $route.path === item.path }" @click="tabsClick(item)">
                    <span class="tab-text" :class="{ 'tabs-black-circle': $route.path === item.path }">
                        {{ $t(`aside.${item.path}`) }}
                    </span>
                </li>
            </template>
            <template v-for="(item, index) in tabsList" :key="item.path">
                <li class="tab-item" :class="{ tabs_hover: $route.path === item.path }" @click="tabsClick(item)">
                    <span class="tab-text" :class="{ 'tabs-white-circle': $route.path === item.path }">
                        {{ $t(`aside.${item.path}`) }}
                    </span>
                    <span class="tab-close" @click.stop="closeTabs(index)"><i class="el-icon-close"></i></span>
                </li>
            </template>
        </ul>
        <div class="tabs-r disflex align-it-cen">
            <el-dropdown class="tabs-dropdown" placement="bottom" size="medium" @command="handleCommand">
                <span class="tabs-dropdown-title">
                    <span>{{ $t("tabs.title") }}</span>
                    <i class="el-icon-arrow-down"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-if="keepTabsIndex === -1" :command="0">
                            {{ $t("tabs.closeNow") }}
                        </el-dropdown-item>
                        <el-dropdown-item v-if="keepTabsIndex === -1" :command="1">
                            {{ $t("tabs.keepFixed") }}
                        </el-dropdown-item>
                        <el-dropdown-item v-if="tabsIndex === -1 && $route.path !== '/dashboard'" :command="2">
                            {{ $t("tabs.removeFixed") }}
                        </el-dropdown-item>
                        <el-dropdown-item :command="3">{{ $t("tabs.closeOther") }}</el-dropdown-item>
                        <el-dropdown-item :command="4">{{ $t("tabs.closeAll") }}</el-dropdown-item>
                        <el-dropdown-item :command="5" divided>{{ $t("tabs.clear") }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import ElMessageBox from "@/util/messageBox";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

import { Tabs } from "@/model/views/views";

export default defineComponent({
    setup() {
        const router = useRouter(),
            route = useRoute(),
            store = useStore(),
            { t: $t } = useI18n(),
            tabsRef = ref();

        // 保持固定的数组
        const keepTabsList = computed(() => store.getters.tabsList[0]);

        // 为保持固定的数组
        const tabsList = computed(() => store.getters.tabsList[1]);

        const openTabs = computed(() => store.getters.openTabs);

        // 点击跳转
        const tabsClick = (item: Tabs) => {
            router.push(item.path);
        };

        // 未定固tab所在未固定数组的下标
        const tabsIndex = computed(() => store.getters.tabsList[1].findIndex((item: Tabs) => item.path === route.path));
        // 固tab所在固定数组的下标
        const keepTabsIndex = computed(() =>
            store.getters.tabsList[0].findIndex((item: Tabs) => item.path === route.path)
        );

        // 下拉操作
        const handleCommand = (e: number) => {
            switch (e) {
                case 0:
                    closeTabs(tabsIndex.value);
                    break;
                case 1:
                    store.dispatch("KEPP_TABS", tabsIndex.value);
                    break;
                case 2:
                    store.dispatch("REMOVE_KEEP_TABS", keepTabsIndex.value);
                    break;
                case 3:
                    if (keepTabsIndex.value !== -1 && tabsIndex.value === -1) {
                        store.dispatch("REMOVE_TABS");
                    } else {
                        store.dispatch("REMOVE_OTHER_TABS", tabsIndex.value);
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

        watch(
            () => route.path,
            (newValue: string) => {
                if (newValue === "/dashboard") return;
                if (
                    keepTabsList.value.findIndex((item: Tabs) => item.path === newValue) === -1 &&
                    tabsList.value.findIndex((item: Tabs) => item.path === newValue) === -1 &&
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

        return {
            keepTabsList,
            tabsList,
            tabsClick,
            tabsIndex,
            keepTabsIndex,
            closeTabs,
            collapse: computed(() => store.getters.collapse),
            handleCommand,
            mouseOperate,
            tabsRef,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.tabs {
    height: 30px;
    font-size: 12px;
    border-bottom: 1px solid #d8dce5;
}
.tabs-l {
    width: calc(100% - 105px);
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    height: 25px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 2px;
}
.tab-text {
    white-space: nowrap;
}
.tab-close {
    width: 16px;
    height: 16px;
    text-align: center;
    border-radius: 50%;
    margin-left: 2px;
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
.tabs-black-circle::before,
.tabs-white-circle::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    // position: relative;
    margin-right: 5px;
}

.tabs-black-circle::before {
    background: #fff;
}
.tabs-white-circle::before {
    background: #fff;
}
.tabs-r {
    height: 100%;
    cursor: pointer;
    box-shadow: -5px 0 5px #d6d3d3;
    position: relative;
    z-index: 100;
    padding-left: 10px;
    padding-right: 10px;
}
.tabs-dropdown-title {
    height: 100%;
    text-align: center;
    line-height: 26px;
    color: #fff;
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
    background-color: $main-color !important;
    color: #fff !important;
}
/deep/ {
    .tabs-dropdown {
        height: 24px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: $main-color !important;
    }
}
</style>
