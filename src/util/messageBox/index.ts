import { ElMessageBox } from "element-plus";

export function successMsgBox(message: string, title: string = "提示") {
    return ElMessageBox({
        title,
        message,
        showCancelButton: true,
        type: "success",
    });
}

export function warningMsgBox(message: string, title: string = "提示") {
    return ElMessageBox({
        title,
        message,
        showCancelButton: true,
        type: "warning",
    });
}

export function infoMsgBox(message: string, title: string = "提示") {
    return ElMessageBox({
        title,
        message,
        showCancelButton: true,
        type: "info",
    });
}

export function errorMsgBox(message: string, title: string = "提示") {
    return ElMessageBox({
        title,
        message,
        showCancelButton: true,
        type: "error",
    });
}

export default ElMessageBox;
