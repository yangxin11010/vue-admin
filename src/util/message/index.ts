import { ElMessage } from "element-plus";

export function successMessage(message: string, duration: number = 2000) {
    return ElMessage({
        message,
        showClose: true,
        duration,
        type: "success",
    });
}

export function warningMessage(message: string, duration: number = 2000) {
    return ElMessage({
        message,
        showClose: true,
        duration,
        type: "warning",
    });
}

export function infoMessage(message: string, duration: number = 2000) {
    return ElMessage({
        message,
        showClose: true,
        duration,
        type: "info",
    });
}

export function errorMessage(message: string, duration: number = 2000) {
    return ElMessage({
        message,
        showClose: true,
        duration,
        type: "error",
    });
}

export default ElMessage;
