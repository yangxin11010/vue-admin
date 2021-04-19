<template>
    <div class="charts disflex ju_bt flex-w">
        <div style="margin-bottom: 20px;width: 100%;">
            <div><Echarts :options="options1"></Echarts></div>
            <p>2002全国宏观经济指标</p>
        </div>
        <div>
            <div><Echarts :options="options2"></Echarts></div>
            <p>AQI 分布（平行坐标）</p>
        </div>
        <div>
            <div><Echarts :options="options3"></Echarts></div>
            <p>AQI - 雷达图</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive } from "vue";
import Options1 from "./common/options1";
import Options2 from "./common/options2";
import Options3 from "./common/options3";

export default defineComponent({
    name: "Charts",
    setup() {
        return {
            options1: reactive(Options1),
            options2: reactive(Options2),
            options3: reactive(Options3),
        };
    },
    components: {
        Echarts: defineAsyncComponent(() => import("@/components/Echarts.vue")),
    },
});
</script>

<style lang="scss" scoped>
.charts {
    background-color: #f0f2f5;
    width: 100%;
    min-height: calc(100vh - 120px);
    & > div {
        width: 49.4%;
        min-height: 500px;
        text-align: center;
        background: #fff;
        & > div {
            height: 90%;
            padding: 10px;
        }
        & > p {
            margin-top: 10px;
            color: #293c55;
        }
    }
}
</style>
