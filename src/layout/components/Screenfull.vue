<template>
    <svg-icon :style="{fontSize: size + 'px'}" ref="svgRef" :icon-class="isFullScreen ? activeIcon : defaultIcon" @click="clickHandle"></svg-icon>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { warningMessage } from "@/util/message";
import Screenfull from "screenfull";

export default defineComponent({
    name: "Screenfull",
    props: {
        size: {
            type: Number,
            default: 20,
        },
        activeIcon: {
            type: String,
            default: "exit-fullscreen",
        },
        defaultIcon: {
            type: String,
            default: "fullscreen",
        },
        // true: 将点击事件挂载到父元素上; false: 应用于自身
        parent: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        // 全屏
        const isFullScreen = ref(false);
        const svgRef = ref();

        const fullScreen = () => {
            if (!Screenfull.isEnabled) {
                warningMessage("浏览器不支持全屏");
                return false;
            }

            Screenfull.toggle();
        };

        const clickHandle = () => {
            if (props.parent) return;
            fullScreen();
        };

        onMounted(() => {
            Screenfull.isEnabled &&
                Screenfull.onchange(() => {
                    isFullScreen.value = !isFullScreen.value;
                    ctx.emit("screenfull", { screenfull: isFullScreen.value });
                });
            if (props.parent) {
                // 将 点击事件 移动至 当前组件的父元素
                svgRef.value.$el.parentNode.onclick = () => {
                    fullScreen();
                };
            }
        });

        return {
            clickHandle,
            isFullScreen,
            fullScreen,
            svgRef,
        };
    },
});
</script>
