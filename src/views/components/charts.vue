<template>
    <div class="charts">
        <el-row>
            <el-col>
                <div class="charts-item">
                    <div class="echarts"><Echarts width="1000px" :options="options1"></Echarts></div>
                    <p>2002全国宏观经济指标</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12" :xs="24">
                <div class="charts-item">
                    <div class="echarts"><Echarts width="500px" :options="options2"></Echarts></div>
                    <p>AQI 分布（平行坐标）</p>
                </div>
            </el-col>
            <el-col :span="12" :xs="24">
                <div class="charts-item">
                    <div class="echarts"><Echarts width="500px" :options="options3"></Echarts></div>
                    <p>AQI - 雷达图</p>
                </div>
            </el-col>
        </el-row>
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
}
.charts-item {
    width: 100%;
    min-height: 500px;
    text-align: center;
    background: #fff;
    & > p {
        color: #293c55;
        padding-bottom: 10px;
    }
}
.echarts {
    width: 100%;
    height: 500px;
    padding: 10px;
}
</style>
