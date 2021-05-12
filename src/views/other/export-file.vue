<template>
    <div class="exportExcel">
        <handle-box>
            <el-input type="text" v-model="exportFileName" :placeholder="$t('export.input-plc')" clearable></el-input>
            <el-button type="primary" @click="exportTable(0)">{{ $t("export.excel-btn") }}</el-button>
            <el-button type="primary" @click="exportTable(1)">{{ $t("export.zip-btn") }}</el-button>
        </handle-box>
        <my-el-table
            v-loading="loading"
            :data="tableData"
            border
            :page="page"
            :total="total"
            @page-change="pageChange"
            @size-change="sizeChange"
        >
            <el-table-column label="id" prop="_id" align="center" width="80" sortable></el-table-column>
            <el-table-column label="img_url" prop="img_url" align="center" width="80">
                <template v-slot="{ row }">
                    <el-image
                        style="width: 50px;height:50px;"
                        fit="scale-down"
                        :src="row.img_url"
                        :alt="row.title"
                        :preview-src-list="[row.img_url]"
                        hide-on-click-modal
                        lazy
                    />
                    <!-- <img style="width: 50px;height:50px;" :src="row.img_url" :alt="row.title" /> -->
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
        </my-el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import { exportExcel, exportZip } from "@/util/exportFile";
import { warningMsgBox } from "@/util/messageBox";
import $api from "@/api";

export default defineComponent({
    name: "ExportFile",
    setup() {
        let tableData = ref<any>([]);

        let loading = ref(false);

        let state = reactive({
            page: 1,
            size: 10,
            total: 0,
        });

        const pageChange = (e: number) => {
            state.page = e;
            getData();
        };
        const sizeChange = (e: number) => {
            state.size = e;
            getData();
        };

        let exportFileName = ref("");

        const exportTable = (type: number) => {
            warningMsgBox(`确定导出${type === 0 ? "Excel" : "Zip"}吗？`)
                .then(() => {
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
                })
                .catch(() => {});
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
            pageChange,
            sizeChange,
        };
    },
});
</script>

<style lang="scss" scoped></style>
