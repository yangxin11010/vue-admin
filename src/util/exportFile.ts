import { ElMessage } from "@/util/message";
interface ExcelParams {
    header: string[];
    data: CustomData[];
    filterVal: string[];
    filename: string;
}

export function exportExcel(params: ExcelParams) {
    return new Promise((resove) => {
        if (!params.header) params.header = params.filterVal;
        params.data = params.data.map((item) => params.filterVal.map((item1) => item[item1]));
        import("@/vendor/Export2Excel").then((excel) => {
            excel.export_json_to_excel({
                header: params.header,
                data: params.data,
                filename: params.filename,
                autoWidth: true,
                bookType: "xlsx",
            });
            ElMessage({
                type: "success",
                message: "Export Excel successfully",
            });
            resove("success");
        });
    });
}

export function exportZip(params: ExcelParams) {
    return new Promise((resove) => {
        if (!params.header) params.header = params.filterVal;
        params.data = params.data.map((item) => params.filterVal.map((item1) => item[item1]));
        import("@/vendor/Export2Zip").then((zip) => {
            zip.export_txt_to_zip(params.header, params.data, params.filename, params.filename);
            ElMessage({
                type: "success",
                message: "Export Zip successfully",
            });
            resove("success");
        });
    });
}
