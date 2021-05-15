<template>
    <div class="dashboard">
        <el-row :gutter="30" style="margin-bottom: 0;">
            <template v-for="(item, index) in cardList" :key="index">
                <el-col :span="6" :xs="12">
                    <card class="el-card-item" shadow="hover" v-bind="item"></card>
                </el-col>
            </template>
        </el-row>
        <div class="echars">
            <Echars ref="dabEcharts" :options="options"></Echars>
        </div>
        <el-row :gutter="30">
            <el-col :span="6" :xs="10" :sm="10" :md="6">
                <el-card shadow="hover" class="bottom-el-card">
                    <template #header>
                        <img
                            @click="imgHandle"
                            style="height: 220px;"
                            src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
                        />
                    </template>
                    <project-percent :data="projectPercentList"></project-percent>
                </el-card>
            </el-col>
            <el-col :span="18" :xs="14" :sm="14" :md="18">
                <ToDoList></ToDoList>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, onMounted, ref } from "vue";
import type { DashboardCard } from "@/model/views";
import type { ProjectPercent } from "@model/views";
export default defineComponent({
    name: "Dashboard",
    setup() {
        const cardList: DashboardCard[] = [
            { icon: "usergroup", iconColor: "#40c9c6", title: "New Visits", num: "102,400" },
            { icon: "message", iconColor: "#36a3f7", title: "Messages", num: "81,212" },
            { icon: "money", iconColor: "#f4516c", title: "Purchases", num: "9,280" },
            { icon: "shopcar", iconColor: "#34bfa3", title: "Shoppings", num: "13,600" },
        ];

        const options = reactive({
            title: { text: "未来一周气温变化", subtext: "纯属虚构" },
            tooltip: { trigger: "axis" },
            legend: { data: ["最高气温", "最低气温"] },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: { yAxisIndex: "none" },
                    dataView: { readOnly: false },
                    magicType: { type: ["line", "bar"] },
                    restore: {},
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            },
            yAxis: {
                type: "value",
                axisLabel: { formatter: "{value} °C" },
            },
            series: [
                {
                    name: "最高气温",
                    type: "line",
                    data: [10, 11, 13, 11, 12, 12, 9],
                    markPoint: {
                        data: [
                            { type: "max", name: "最大值" },
                            { type: "min", name: "最小值" },
                        ],
                    },
                    markLine: {
                        data: [{ type: "average", name: "平均值" }],
                    },
                },
                {
                    name: "最低气温",
                    type: "line",
                    data: [1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
                    },
                    markLine: {
                        data: [
                            { type: "average", name: "平均值" },
                            [
                                {
                                    symbol: "none",
                                    x: "90%",
                                    yAxis: "max",
                                },
                                {
                                    symbol: "circle",
                                    label: { position: "start", formatter: "最大值" },
                                    type: "max",
                                    name: "最高点",
                                },
                            ],
                        ],
                    },
                },
            ],
        });

        const projectPercentList = ref<Array<ProjectPercent>>([
            { title: "Vue", num: 52.6 },
            { title: "TypeScript", num: 42.1 },
            { title: "JavaScript", num: 1.3 },
            { title: "Scss", num: 3.7 },
            { title: "ESLint", num: 100, status: "success" },
        ])

        onMounted(() => {
            console.log(process.env);
        });

        return {
            projectPercentList,
            cardList,
            options,
        };
    },
    components: {
        Echars: defineAsyncComponent(() => import("@/components/Echarts.vue")),
        ToDoList: defineAsyncComponent(() => import("@/components/ToDoList.vue")),
        ProjectPercent: defineAsyncComponent(() => import("@/components/ProjectPercent.vue")),
        Card: defineAsyncComponent(() => import("@/components/Card.vue")),
    },
});
</script>

<style lang="scss" scoped>
.dashboard {
    padding: 20px 20px 0;
    & > div {
        margin-bottom: 32px;
    }
}
.el-card-item {
    height: 108px;
    margin-bottom: 20px;
}
.echars {
    width: 100%;
    height: 366px;
    padding: 16px 16px 0px;
    background-color: #fff;
}
.bottom-el-card-item {
    margin-bottom: 5px;
    p {
        margin-bottom: 5px;
    }
}
:deep(.bottom-el-card) {
    font-size: 14px;
    .el-card,
    .el-card__header {
        width: 100%;
        padding: 0;
        border: none;
    }
}
</style>
