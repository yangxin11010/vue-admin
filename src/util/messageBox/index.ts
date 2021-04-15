import { ElMessageBox } from "element-plus";

export function successMsgBox(message: string) {
    return ElMessageBox({
        title: "提示",
        message,
        showCancelButton: true,
        type: "success",
    });
}

export function warningMsgBox(message: string) {
    return ElMessageBox({
        title: "提示",
        message,
        showCancelButton: true,
        type: "warning",
    });
}

export function infoMsgBox(message: string) {
    return ElMessageBox({
        title: "提示",
        message,
        showCancelButton: true,
        type: "info",
    });
}

export function errorMsgBox(message: string) {
    return ElMessageBox({
        title: "提示",
        message,
        showCancelButton: true,
        type: "error",
    });
}

export default ElMessageBox;
