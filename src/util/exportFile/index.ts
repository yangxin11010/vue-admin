import { successMessage } from "@/util/message";
interface ExcelParams {
    header: string[];
    data: CustomData[];
    filterVal: string[];
    filename: string;
}

/**
 * @param params {params}
 * @returns 'success' {Promise}
 */

export function exportExcel(params: ExcelParams) {
    return new Promise<string>((resove) => {
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
            successMessage("Export Excel successfully");
            resove("success");
        });
    });
}

/**
 * @param params {params}
 * @returns 'success' {Promise}
 */
export function exportZip(params: ExcelParams) {
    return new Promise<string>((resove) => {
        if (!params.header) params.header = params.filterVal;
        params.data = params.data.map((item) => params.filterVal.map((item1) => item[item1]));
        import("@/vendor/Export2Zip").then((zip) => {
            zip.export_txt_to_zip(params.header, params.data, params.filename, params.filename);
            successMessage("Export Zip successfully");
            resove("success");
        });
    });
}
