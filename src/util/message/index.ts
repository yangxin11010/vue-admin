import { ElMessage } from "element-plus";

export function successMessage(message: string, duration?: number) {
    return ElMessage({
        message,
        showClose: true,
        duration: duration ? duration : 3000,
        type: "success",
    });
}

export function warningMessage(message: string, duration?: number) {
    return ElMessage({
        message,
        showClose: true,
        duration: duration ? duration : 3000,
        type: "warning",
    });
}

export function infoMessage(message: string, duration?: number) {
    return ElMessage({
        message,
        showClose: true,
        duration: duration ? duration : 3000,
        type: "info",
    });
}

export function errorMessage(message: string, duration?: number) {
    return ElMessage({
        message,
        showClose: true,
        duration: duration ? duration : 3000,
        type: "error",
    });
}

export default ElMessage;
