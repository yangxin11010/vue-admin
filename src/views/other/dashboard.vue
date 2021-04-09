<template>
    <div class="dashboard">
        <el-row :gutter="30">
            <template v-for="(item, index) in cardList" :key="index">
                <el-col :span="6" :xs="12">
                    <el-card shadow="hover" class="el-card-item">
                        <div
                            class="card-item disflex ju_bt curpot"
                            @mouseenter="mouseoperate(item, index, 0)"
                            @mouseleave="mouseoperate(item, index, 1)"
                        >
                            <div
                                :style="{
                                    color: index === mouseEnterStyle.index ? '#fff' : item.iconColor,
                                    background: index === mouseEnterStyle.index ? mouseEnterStyle.color : '#fff',
                                }"
                            >
                                <svg-icon class="card-item-icon" :icon-class="item.icon"></svg-icon>
                            </div>
                            <div>
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
                <el-card class="cCard" shadow="hover">
                    <template #header>
                        <div style="font-size: 16px;">
                            <span style="font-weight: bold;">ToDo List</span>
                            <el-button
                                style="float: right; padding: 3px 0;margin-right:10px;"
                                type="text"
                                @click="showToDoDialog"
                                >Add
                            </el-button>
                        </div>
                    </template>
                    <el-table :data="toDoList" :show-header="false">
                        <el-table-column width="35">
                            <template v-slot="{ row }">
                                <el-checkbox v-model="row.isFinish"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template v-slot="{ row }">
                                <span :class="{ checked: row.isFinish }">{{ row.things }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="120">
                            <template v-slot="{ row }">
                                <el-tag :type="row.isFinish ? 'success' : 'danger'" style="cursor: pointer">
                                    {{ row.isFinish ? "已完成" : "未完成" }}
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-tabs class="todoTabs" tab-position="left" type="border-card">
                        <el-tab-pane :label="`total (${getAllToDoList.length})`">
                            <ToDoTableItem
                                :data="getAllToDoList"
                                operateText="delete"
                                @del-and-back="delAndBack(0, $event)"
                            ></ToDoTableItem>
                        </el-tab-pane>
                        <el-tab-pane :label="`unfinished (${finishToDoList.length})`">
                            <ToDoTableItem
                                :data="finishToDoList"
                                operateText="delete"
                                @del-and-back="delAndBack(0, $event)"
                            ></ToDoTableItem>
                        </el-tab-pane>
                        <el-tab-pane :label="`finished (${noFinishToDoList.length})`">
                            <ToDoTableItem
                                :data="noFinishToDoList"
                                operateText="delete"
                                @del-and-back="delAndBack(0, $event)"
                            ></ToDoTableItem>
                        </el-tab-pane>
                        <el-tab-pane :label="`trash (${delToDoList.length})`">
                            <ToDoTableItem
                                :data="delToDoList"
                                operateText="reset"
                                showDel
                                @del-and-back="delAndBack(1, $event)"
                                @real-del="realDel"
                            ></ToDoTableItem>
                        </el-tab-pane>
                    </el-tabs> -->
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="待办事项" v-model="dialogVisible" width="30%" top="25vh">
            <el-form :model="toDoForm" ref="toDoFormRef" label-width="80px">
                <el-form-item
                    prop="things"
                    label="待办事项"
                    :rules="[{ required: true, message: '请输入待办事项', trigger: 'blur' }]"
                >
                    <el-input v-model="toDoForm.things"></el-input>
                </el-form-item>
                <el-form-item prop="isFinish" label="是否完成">
                    <el-select v-model="toDoForm.isFinish">
                        <el-option label="未完成" :value="false"></el-option>
                        <el-option label="已完成" :value="true"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addToDoList">添 加</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, onMounted, computed, ref, nextTick } from "vue";
import { DashboardCard } from "@ts/views";
import { ToDoItem } from "@ts/views";
import { ElMessage } from "element-plus";

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

        let toDoList = ref<ToDoItem[]>([
            { id: 1, things: "今天要修复100个bug", isFinish: false, isDel: false },
            { id: 2, things: "今天要修复100个bug", isFinish: false, isDel: false },
            { id: 3, things: "今天要写100行代码加几个bug吧", isFinish: false, isDel: false },
            { id: 4, things: "今天要修复100个bug", isFinish: false, isDel: false },
            { id: 5, things: "今天要修复100个bug", isFinish: true, isDel: true },
            { id: 6, things: "今天要写100行代码加几个bug吧", isFinish: true, isDel: false },
            { id: 7, things: "今天要修复100个bug", isFinish: false, isDel: false },
            { id: 8, things: "今天要修复100个bug", isFinish: true, isDel: false },
            { id: 9, things: "今天要写100行代码加几个bug吧", isFinish: true, isDel: false },
        ]);

        //全部待办事项
        const getAllToDoList = computed(() => {
            return toDoList.value.filter((item: ToDoItem) => {
                return item.isDel === false;
            });
        });

        //已完成待办事项
        const finishToDoList = computed(() => {
            return toDoList.value.filter((item: ToDoItem) => {
                return item.isFinish === true && item.isDel == false;
            });
        });
        //未完成待办事项
        const noFinishToDoList = computed(() => {
            return toDoList.value.filter((item: ToDoItem) => {
                return item.isFinish === false && item.isDel == false;
            });
        });
        //垃圾箱
        const delToDoList = computed(() => {
            return toDoList.value.filter((item: ToDoItem) => {
                return item.isDel === true;
            });
        });

        const getToDoById = (id: number) => {
            return toDoList.value.findIndex((item: ToDoItem) => {
                return item.id === id;
            });
        };

        const delAndBack = (type: number, row: ToDoItem) => {
            //0:删除 1:还原
            row.isDel = type === 0 ? true : false;
        };

        const realDel = (row: ToDoItem) => {
            toDoList.value.splice(getToDoById(row.id), 1);
        };

        const dialogVisible = ref(false);
        const toDoFormRef = ref();
        let toDoForm = reactive<ToDoItem>({
            id: Math.max(...toDoList.value.map((item: ToDoItem) => item.id)) + 1,
            things: "",
            isFinish: false,
            isDel: false,
        });

        const addToDoList = () => {
            dialogVisible.value = true;
            toDoFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    toDoList.value.unshift(JSON.parse(JSON.stringify(toDoForm)));
                    dialogVisible.value = false;
                    ElMessage({
                        showClose: true,
                        message: "添加成功",
                        type: "success",
                        duration: 2000,
                    });
                    toDoFormRef.value.resetFields();
                    toDoForm.id += 1;
                } else {
                    return false;
                }
            });
        };

        const showToDoDialog = async () => {
            dialogVisible.value = true;
            await nextTick();
            toDoFormRef.value.resetFields();
        };

        onMounted(() => {
            console.log(process.env);
        });

        return {
            cardList,
            mouseoperate,
            mouseEnterStyle,
            options,
            toDoList,
            getAllToDoList,
            finishToDoList,
            noFinishToDoList,
            delToDoList,
            delAndBack,
            realDel,
            dialogVisible,
            toDoForm,
            toDoFormRef,
            addToDoList,
            showToDoDialog,
        };
    },
    components: {
        Echars: defineAsyncComponent(() => import("@/components/Echarts.vue")),
        // ToDoTableItem: defineAsyncComponent(() => import("./components/ToDoTableItem.vue")),
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
    & > div {
        height: 100%;
    }
    & > div:nth-child(1) {
        width: 80px;
        height: 80px;
        margin: 14px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        .card-item-icon {
            width: 48px;
            height: 48px;
            margin: 16px;
        }
    }
    & > div:nth-child(2) {
        font-weight: bold;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-right: 20px;
        span {
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
.todoTabs {
    min-height: 323px;
}
.checked {
    color: #999999;
    text-decoration: line-through;
}
</style>

<style lang="scss">
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

.todoCard,
.todoCard > div {
    min-height: 423px;
}
</style>
