import { ElMessage as Message } from "element-plus";

interface MessageInterface {
    message?: string;
    type?: "success" | "warning" | "info" | "error";
    iconClass?: string;
    dangerouslyUseHTMLString?: boolean;
    duration?: number;
    showClose?: boolean;
    center?: boolean;
    onClose?: () => void;
    offset?: number;
}

export function ElMessage(options: MessageInterface) {
    return Message({
        message: options.message ? options.message : "message",
        type: options.type ? options.type : "info",
        iconClass: options.iconClass ? options.iconClass : "",
        dangerouslyUseHTMLString: options.dangerouslyUseHTMLString ? options.dangerouslyUseHTMLString : false,
        duration: options.duration ? options.duration : 2000,
        showClose: options.showClose ? options.showClose : false,
        center: options.center ? options.center : false,
        onClose: options.onClose ? options.onClose : () => {},
        offset: options.offset ? options.offset : 20,
    });
}
