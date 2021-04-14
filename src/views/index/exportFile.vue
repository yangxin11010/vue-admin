<template>
    <div class="exportExcel">
        <div class="handle-box">
            <div>
                <el-input type="text" v-model="exportFileName" placeholder="export filename" clearable></el-input>
            </div>
            <div><el-button type="primary" @click="exportTable(0)">导出 Excel</el-button></div>
            <div><el-button type="primary" @click="exportTable(1)">导出 Zip</el-button></div>
        </div>
        <el-table v-loading="loading" :data="tableData" border>
            <el-table-column label="id" prop="_id" align="center" width="80" sortable></el-table-column>
            <el-table-column label="img_url" prop="img_url" align="center" width="80">
                <template v-slot="{ row }">
                    <img style="width: 50px;height:50px;" :src="row.img_url" :alt="row.title" />
                </template>
            </el-table-column>
            <el-table-column label="title" prop="title" align="center" width="250"></el-table-column>
            <el-table-column label="price" prop="price" align="center" width="80" sortable></el-table-column>
            <el-table-column label="mack" prop="mack" align="center" width="150">
                <template v-slot="{ row }">
                    <div v-html="row.mack"></div>
                </template>
            </el-table-column>
            <el-table-column label="supplier" prop="supplier" align="center"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100]"
                v-model:current-page="page"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import { exportExcel, exportZip } from "@/util/exportFile";
import $api from "@/api/index";
export default defineComponent({
    name: "ExportFile",
    setup() {
        let tableData = ref([]);

        let loading = ref(false);

        let state = reactive({
            page: 1,
            size: 10,
            total: 0,
        });

        const handleCurrentChange = (e: number) => {
            state.page = e;
            getData();
        };
        const handleSizeChange = (e: number) => {
            state.size = e;
            getData();
        };

        let exportFileName = ref("");

        const exportTable = (type: number) => {
            const header = ["id", "title", "price", "mack", "supplier", "img_url"];
            const filterVal = ["_id", "title", "price", "mack", "supplier", "img_url"];
            if (type === 0) {
                exportExcel({
                    header,
                    data: tableData.value,
                    filterVal,
                    filename: exportFileName.value,
                });
            } else if (type === 1) {
                exportZip({
                    header,
                    filterVal,
                    data: tableData.value,
                    filename: exportFileName.value,
                });
            }
        };

        const getData = async () => {
            loading.value = true;
            const {
                data: { list, pageCount },
            } = await $api.goods.queryGoods({
                page: state.page,
                size: state.size,
            });
            tableData.value = list;
            state.total = pageCount;
            loading.value = false;
        };

        onMounted(() => {
            getData();
        });

        return {
            tableData,
            loading,
            ...toRefs(state),
            exportTable,
            exportFileName,
            handleCurrentChange,
            handleSizeChange,
        };
    },
});
</script>

<style lang="scss" scoped></style>
