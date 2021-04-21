<template>
    <div class="dashboard">
        <el-row :gutter="30" style="margin-bottom: 0;">
            <template v-for="(item, index) in cardList" :key="index">
                <el-col :span="6" :xs="12">
                    <el-card shadow="hover" class="el-card-item">
                        <div
                            class="card-item disflex ju_bt curpot"
                            @mouseenter="mouseoperate(item, index, 0)"
                            @mouseleave="mouseoperate(item, index, 1)"
                        >
                            <div
                                class="card-item-icon-box"
                                :style="{
                                    color: index === mouseEnterStyle.index ? '#fff' : item.iconColor,
                                    background: index === mouseEnterStyle.index ? mouseEnterStyle.color : '#fff',
                                }"
                            >
                                <svg-icon class="card-item-icon" :icon-class="item.icon"></svg-icon>
                            </div>
                            <div class="card-item-body">
                                <span>{{ item.title }}</span>
                                <span>{{ item.num }}</span>
                            </div>
                        </div>
                    </el-card>
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
                    <div class="bottom-el-card-item">
                        <p>Vue</p>
                        <el-progress :percentage="70"></el-progress>
                    </div>
                    <div class="bottom-el-card-item">
                        <p>JavaScript</p>
                        <el-progress :percentage="18"></el-progress>
                    </div>
                    <div class="bottom-el-card-item">
                        <p>Css</p>
                        <el-progress :percentage="12"></el-progress>
                    </div>
                    <div class="bottom-el-card-item">
                        <p>ESLint</p>
                        <el-progress :percentage="100" status="success"></el-progress>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" :xs="14" :sm="14" :md="18">
                <ToDoList></ToDoList>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, onMounted } from "vue";
import { DashboardCard } from "@/model/views/views";
// import {} from "@/assets/css/variables.scss";

export default defineComponent({
    name: "Dashboard",
    setup() {
        const cardList: DashboardCard[] = [
            { icon: "usergroup", iconColor: "#40c9c6", title: "New Visits", num: "102,400" },
            { icon: "message", iconColor: "#36a3f7", title: "Messages", num: "81,212" },
            { icon: "money", iconColor: "#f4516c", title: "Purchases", num: "9,280" },
            { icon: "shopcar", iconColor: "#34bfa3", title: "Shoppings", num: "13,600" },
        ];

        // 鼠标移入的样式
        let mouseEnterStyle = reactive({
            color: "",
            index: -1,
        });
        const mouseoperate = (item: DashboardCard, index: number, type: number) => {
            if (type === 1) {
                mouseEnterStyle.color = "";
                mouseEnterStyle.index = -1;
                return;
            }
            mouseEnterStyle.color = item.iconColor;
            mouseEnterStyle.index = index;
        };

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

        onMounted(() => {
            console.log(process.env);
        });
        const scroll = (e: any) => {
            console.log(e);
        };

        return {
            cardList,
            mouseoperate,
            mouseEnterStyle,
            options,
            scroll,
        };
    },
    components: {
        Echars: defineAsyncComponent(() => import("@/components/Echarts.vue")),
        ToDoList: defineAsyncComponent(() => import("@/components/ToDoList.vue")),
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
.card-item {
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.card-item-icon-box {
    width: 80px;
    height: 80px;
    margin: 14px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
}
.card-item-icon {
    width: 48px;
    height: 48px;
    margin: 16px;
}
.card-item-body {
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-right: 20px;
    & > span {
        &:nth-child(1) {
            line-height: 18px;
            font-size: 16px;
            margin-bottom: 12px;
            color: rgba(0, 0, 0, 0.45);
        }
        &:nth-child(2) {
            font-size: 20px;
            color: #666;
        }
    }
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
.checked {
    color: #999999;
    text-decoration: line-through;
}
/deep/ {
    .el-card-item {
        height: 108px;
        .el-card,
        .el-card__body {
            width: 100%;
            height: 100%;
            padding: 0;
            border: none;
        }
    }
    .bottom-el-card {
        font-size: 14px;
        .el-card,
        .el-card__header {
            width: 100%;
            padding: 0;
            border: none;
        }
    }
}
</style>
