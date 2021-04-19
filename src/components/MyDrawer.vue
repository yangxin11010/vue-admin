<template>
    <div class="MyDrawer">
        <div v-if="modal" class="drawer-back" @click.stop="toggle" :class="{ showBack: open }"></div>
        <div class="drawer-box" :class="drawerBoxclassName" :style="{ width: defaultWidth }">
            <div v-if="showClose" class="drawer-icon" :class="drawerIconClassName" @click.stop="toggle">
                <i :class="open ? openIcon : closeIcon"></i>
            </div>
            <div class="drawer-box-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from "vue";

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
        let open = ref(false);

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
            } else if (typeof props.width === "string") {
                return props.width;
            } else {
                return "260px";
            }
        });

        const toggle = () => {
            if (open.value && props.beforeClose) {
                props.beforeClose(() => {
                    open.value = !open.value;
                });
            } else {
                open.value = !open.value;
            }
        };

        return {
            open,
            close,
            toggle,
            defaultWidth,
            drawerIconClassName,
            drawerBoxclassName,
        };
    },
});
</script>

<style lang="scss" scoped>
.MyDrawer {
    z-index: 10000;
    position: fixed;
    left: 0;
    top: 0;
}
.drawer-back {
    background-color: rgba(0, 0, 0, 0.2);
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
.drawer-icon {
    width: 48px;
    height: 48px;
    background: #1890ff;
    position: absolute;
    top: 45vh;
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
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #9093994d;
        border-radius: 50px;
    }
}
</style>
