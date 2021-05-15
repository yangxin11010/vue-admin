<template>
    <div class="message" v-loading="loading">
        <el-table :data="tableData" size="medium">
            <el-table-column type="expand">
                <template v-slot="{ row }">
                    <el-card shadow="hover">
                        {{ row.title }}
                    </el-card>
                </template>
            </el-table-column>
            <el-table-column label="title" prop="title">
                <template v-slot="{ row, $index }">
                    <p class="textOver" :class="{ badge: $index < messageNum }">{{ row.title }}</p>
                </template>
            </el-table-column>
            <el-table-column label="date" prop="date" width="200" align="center"></el-table-column>
            <el-table-column label="isRead" width="150" align="center">
                <template #header>
                    <el-popconfirm title="确认清除吗？" icon="el-icon-warning" @confirm="clearNoRead">
                        <template #reference>
                            <el-link
                                href="javascript:void(0);"
                                :underline="false"
                                type="danger"
                                style="font-size:12px;"
                                :disabled="messageNum <= 0"
                            >
                                清除未读
                            </el-link>
                        </template>
                    </el-popconfirm>
                </template>
                <template v-slot="{ $index }">
                    <el-tag :type="$index < messageNum ? 'danger' : 'success'">
                        {{ $index >= messageNum ? "已读" : "未读" }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import mitter from "@/plugins/mitt";

export default defineComponent({
    name: "Message",
    setup() {
        let tableData = ref<object[]>([]),
            messageNum = ref(0),
            loading = ref(true);

        const clearNoRead = () => {
            messageNum.value = 0;
            mitter.$emit("clearNoReadMessage");
        };

        const getData = () => {
            setTimeout(() => {
                tableData.value = [
                    {
                        title:
                            "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
                        date: "2020-06-18 20:00:00",
                    },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2020-03-18 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2020-01-18 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-12-18 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-11-18 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-10-16 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-09-22 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-08-05 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-07-10 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-06-11 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-05-20 20:00:00" },
                    { title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护", date: "2019-04-19 20:00:00" },
                ];
                messageNum.value = 4;
                loading.value = false;
            }, 1000);
        };

        onMounted(() => {
            getData();
        });

        return {
            tableData,
            messageNum,
            loading,
            clearNoRead,
        };
    },
});
</script>

<style lang="scss" scoped>
.message {
    width: 100%;
    height: 100%;
}
.badge::before {
    content: "*";
    color: red;
    font-size: 22px;
}

:deep(.el-table__expanded-cell) {
    background-color: #f0f2f5;
    &:hover {
        background-color: #f0f2f5 !important;
    }
}
</style>
