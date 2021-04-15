<template>
    <div class="echars">
        <div class="overhide" ref="echartsRef"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch, onUnmounted } from "vue";
import * as Echarts from "echarts";
import { useStore } from "@/store";

export default defineComponent({
    name: "Echars",
    props: {
        options: {
            type: Object as PropType<Echarts.EChartsCoreOption>,
            required: true,
        },
        echartsEvent: {
            type: String,
        },
    },
    setup(props) {
        const store = useStore();

        let echartsRef = ref();

        let echarts: Echarts.ECharts;

        watch(
            () => store.getters.collapse,
            () => {
                setTimeout(() => {
                    echarts.clear();
                    echarts.resize();
                    echarts.setOption(props.options);
                }, 400);
            }
        );

        const resize = () => {
            echarts.resize();
        };

        onMounted(() => {
            echarts = Echarts.init(echartsRef.value);
            echarts.setOption(props.options);
            window.addEventListener("resize", resize);
        });


        onUnmounted(() => {
            window.removeEventListener("resize", resize);
        });

        return {
            echartsRef,
            resize,
        };
    },
});
</script>

<style lang="scss" scoped>
.echars,
.echars > div {
    width: 100%;
    height: 100%;
}
</style>
