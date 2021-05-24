<template>
    <div class="MyDrawer" v-keyboard:s+e+t.press="keyboardEvent">
        <div v-if="modal" class="drawer-back" @click.stop="toggle" :class="{ showBack: open }"></div>
        <div class="drawer-box" :class="drawerBoxclassName" :style="{ width: defaultWidth }">
            <div v-if="showClose && showDrawerIcon" class="drawer-icon-box" :class="drawerIconClassName">
                <el-dropdown
                    class="drawer-icon-dropdown"
                    trigger="contextmenu"
                    :placement="`bottom-${direction === 'left' ? 'start' : 'end'}`"
                    ref="iconDrawerRef"
                    @command="handleCommand"
                >
                    <el-tooltip class="item" effect="dark" placement="left" :disabled="tipDisabled">
                        <template #content>
                            <p>支持右键点击：</p>
                            <p>1、隐藏按钮功能(支持键盘输入set显隐)</p>
                            <p>2、隐藏Tip提示功能</p>
                        </template>
                        <div class="drawer-icon" @click.stop="toggle" @mousedown="mouseClick">
                            <i :class="open ? openIcon : closeIcon"></i>
                        </div>
                    </el-tooltip>
                    <template #dropdown>
                        <el-dropdown-menu class="drawer-icon-dropdown-menu">
                            <el-dropdown-item :command="0">{{ $t("system.hideBtn") }}</el-dropdown-item>
                            <el-dropdown-item :command="1">
                                {{ tipDisabled ? $t("system.showTip") : $t("system.hideTip") }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="drawer-box-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed, onMounted } from "vue";
import { location } from "@/util/storage";

type Done = () => void;
type DrawerDirection = "right" | "left";

export default defineComponent({
    name: "MyDrawer",
    props: {
        width: {
            type: [Number, String],
            default: 260,
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            default: true,
        },
        // 打开时的按钮icon
        openIcon: {
            type: String,
            default: "el-icon-close",
        },
        // 关闭时的按钮icon
        closeIcon: {
            type: String,
            default: "el-icon-setting",
        },
        // 是否显示遮罩层
        modal: {
            type: Boolean,
            default: true,
        },
        // drawer 的位置
        direction: {
            type: String as PropType<DrawerDirection>,
            default: "right",
            validator: (val: DrawerDirection) => {
                return ["left", "right"].includes(val);
            },
        },
        // 关闭之前的回调
        beforeClose: {
            // eslint-disable-next-line no-unused-vars
            type: Function as PropType<(done: Done) => void>,
        },
    },
    setup(props) {
        const iconDrawerRef = ref(),
            open = ref(false),
            tipDisabled = ref(false),
            showDrawerIcon = ref(true);

        const drawerIconClassName = computed(() => {
            if (!props.showClose) return [];
            return [`${props.direction === "left" ? "drawer-icon-left" : "drawer-icon-right"}`];
        });

        const drawerBoxclassName = computed(() => {
            const rightClass = `drawer-box-right ${open.value ? "showRight" : "hideRight"}`;
            const leftClass = `drawer-box-left ${open.value ? "showLeft" : "hideLeft"}`;
            return [
                `${props.direction === "right" ? rightClass : props.direction === "left" ? leftClass : rightClass}`,
            ];
        });

        const defaultWidth = computed(() => {
            if (typeof props.width === "number") {
                return props.width + "px";
            }
            if (typeof props.width === "string") {
                return props.width;
            }
            return "260px";
        });

        const toggle = () => {
            if (open.value && props.beforeClose) {
                props.beforeClose(() => {
                    open.value = !open.value;
                });
            } else {
                open.value = !open.value;
            }
            // 隐藏 dropdown
            iconDrawerRef.value.visible = false;
        };

        const handleCommand = (e: number) => {
            if (e === 0) {
                keyboardEvent();
                return;
            }
            if (e === 1) {
                tipDisabled.value = !tipDisabled.value;
                location.setItem("global-setting-tip", tipDisabled.value);
                return;
            }
        };

        const keyboardEvent = () => {
            showDrawerIcon.value = !showDrawerIcon.value;
            location.setItem("global-setting-icon", showDrawerIcon.value);
        };

        onMounted(() => {
            const tipValue = location.getItem("global-setting-tip"),
                iconValue = location.getItem("global-setting-icon");
            tipValue !== null && (tipDisabled.value = tipValue);
            iconValue !== null && (showDrawerIcon.value = iconValue);
        });

        return {
            iconDrawerRef,
            open,
            close,
            toggle,
            defaultWidth,
            drawerIconClassName,
            drawerBoxclassName,
            tipDisabled,
            showDrawerIcon,
            handleCommand,
            ref,
            keyboardEvent,
        };
    },
});
</script>

<style lang="scss" scoped>
.MyDrawer {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1999;
}
.drawer-back {
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1999;
    position: fixed;
    left: 0;
    top: 0;
}
.showBack {
    width: 100vw;
    height: 100vh;
}
.drawer-box {
    height: 100vh;
    background-color: #fff;
    position: fixed;
    z-index: 2000;
}
.drawer-box-right {
    right: 0;
}
.drawer-box-left {
    left: 0;
}
.showLeft {
    transform: translate(0%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.hideLeft {
    transform: translate(-100%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.showRight {
    transform: translate(0%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.hideRight {
    transform: translate(100%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.drawer-icon-box {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 45vh;
    overflow: hidden;
}
.drawer-icon {
    width: 48px;
    height: 48px;
    background: #1890ff;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
    color: #fff;
    line-height: 48px;
}
.drawer-icon-right {
    left: -48px;
    border-radius: 6px 0 0 6px !important;
}
.drawer-icon-left {
    right: -48px;
    border-radius: 0 6px 6px 0 !important;
}
.drawer-box-body {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #9093994d;
        border-radius: 50px;
    }
}

:deep(.drawer-icon-dropdown .el-dropdown__popper) {
    top: 500px;
}
</style>
