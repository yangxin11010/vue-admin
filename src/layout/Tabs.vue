<template>
    <div
        class="tabs disflex ju_bt align-it-cen"
        @mouseenter="mouseOperate(0, $event)"
        @mouseleave="mouseOperate(1, $event)"
    >
        <ul class="tabs-l disflex align-it-cen" ref="tabsRef">
            <template v-for="(item, index) in tabsList" :key="index">
                <li :class="{ tabs_hover: index === tabsIndex }" @click="tabsClick(item)">
                    <span :class="{ 'tabs-l-circle': index === tabsIndex }">{{ item.title }}</span>
                    <span v-if="index !== 0" @click.stop="closeTabs(index)"><i class="el-icon-close"></i></span>
                </li>
            </template>
        </ul>
        <div class="tabs-r disflex align-it-cen">
            <el-dropdown class="tabs-dropdown" placement="bottom" size="medium" @command="handleCommand">
                <span>
                    <span>标签选项</span>
                    <i class="el-icon-arrow-down"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-if="tabsIndex !== 0" :command="0">关闭当前</el-dropdown-item>
                        <el-dropdown-item :command="1">关闭其他</el-dropdown-item>
                        <el-dropdown-item :command="2">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store/index";
import { Tabs } from "@ts/views";

export default defineComponent({
    setup() {
        const router = useRouter(),
            route = useRoute(),
            store = useStore(),
            tabsRef = ref();

        const tabsList = computed(() => store.getters.tabsList);

        const tabsClick = (item: Tabs) => {
            router.push(item.path);
        };

        const tabsIndex = computed(() => tabsList.value.findIndex((item: Tabs) => item.path === route.path));

        const handleCommand = (e: number) => {
            switch (e) {
                case 0:
                    closeTabs(tabsIndex.value);
                    break;
                case 1:
                    store.dispatch("REMOVE_OTHER_TABS", tabsIndex.value);
                    break;
                case 2:
                    store.dispatch("REMOVE_TABS");
                    router.push("/dashboard");
                    break;
            }
        };

        const closeTabs = (index: number) => {
            if (index === 0) return;
            if (index === tabsIndex.value) {
                if (index === tabsList.value.length - 1) {
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
                    tabsList.value.findIndex((item: Tabs) => item.path === newValue) === -1 &&
                    route.name &&
                    route.meta.title
                ) {
                    store.dispatch("ADD_TABS", {
                        name: route.name,
                        title: route.meta.title,
                        path: newValue,
                    });
                }
            }
        );

        return {
            tabsList,
            tabsClick,
            tabsIndex,
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
    li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        height: 25px;
        padding: 0 8px;
        cursor: pointer;
        margin-right: 5px;
        border-radius: 2px;
        span {
            white-space: nowrap;
        }
        span:nth-child(2) {
            width: 16px;
            height: 16px;
            text-align: center;
            border-radius: 50%;
            margin-left: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
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
    }
}

.tabs-l-circle::before {
    content: "";
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    // position: relative;
    margin-right: 5px;
}
.tabs-r {
    width: 105px;
    height: 100%;
    padding-right: 10px;
    cursor: pointer;
    padding-left: 5px;
    box-shadow: -5px 0 5px #d6d3d3;
    position: relative;
    z-index: 100;
}
.tabs-dropdown span {
    background-color: $main-color !important;
    color: #fff;
    height: 16px;
    border-radius: 2px;
    font-size: 12px;
    padding: 6px 7.2px 4px;
}
.tabs_hover {
    background-color: $main-color !important;
    color: #fff !important;
}
</style>
