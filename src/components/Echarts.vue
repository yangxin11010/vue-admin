<template>
    <div class="echars">
        <div class="overhide" ref="echartsRef" :style="{ minWidth: defaultWidth }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch, onUnmounted, onActivated, computed } from "vue";
import * as Echarts from "echarts";
import { useStore } from "@/store";
import { location } from "@/util/storage";
import mitter from "@/plugins/mitt";

export default defineComponent({
    name: "Echars",
    props: {
        width: {
            type: [String, Number],
            default: "100%",
        },
        options: {
            type: Object as PropType<Echarts.EChartsCoreOption>,
            required: true,
        },
    },
    setup(props) {
        const store = useStore(),
            asideFixed = ref(false);
        const defaultWidth = computed(() => {
            if (typeof props.width === "string") {
                return props.width;
            } else if (typeof props.width === "number") {
                return `${props.width}px`;
            } else {
                return "100%";
            }
        });

        let echartsRef = ref();

        let echarts: Echarts.ECharts;

        const refresh = () => {
            echarts.clear();
            echarts.resize();
            echarts.setOption(props.options);
        };

        const resize = () => {
            echarts.resize();
        };

        watch(
            () => store.getters["setting/collapse"],
            () => {
                if (asideFixed.value) return;
                setTimeout(() => {
                    refresh();
                }, 400);
            }
        );

        watch(
            () => props.options,
            (val) => {
                echarts.setOption(val);
            },
            {
                deep: true,
            }
        );

        onActivated(() => {
            refresh();
        });

        onMounted(() => {
            echarts = Echarts.init(echartsRef.value);
            echarts.setOption(props.options);
            window.addEventListener("resize", resize);
            const asideFixedValue = location.getItem("global-setting-asideFixed");

            // aside 类型
            asideFixedValue !== null && (asideFixed.value = asideFixedValue);
            mitter.$on("changeAsideFixed", (value) => {
                asideFixed.value = value;
            });
        });

        onUnmounted(() => {
            window.removeEventListener("resize", resize);
        });

        return {
            echartsRef,
            refresh,
            defaultWidth,
        };
    },
});
</script>

<style lang="scss" scoped>
.echars {
    width: 100%;
    height: 100%;
    overflow-x: auto;
}
.echars > div {
    height: 100%;
}
</style>
