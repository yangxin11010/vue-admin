import { successMessage, errorMessage } from "@/util/message";
import Clipboard from "clipboard";
import Store from "@/store";
import { App } from "vue";

export default {
    install: (app: App) => {
        /**
         * 防抖
         * @param {number} arg  0
         * @return {Function}
         */
        app.directive("debounce", (el, binding) => {
            let timer: any;
            el.addEventListener("click", () => {
                console.log(binding);
                if (timer) clearTimeout(timer);
                timer = setTimeout(
                    () => {
                        binding.value();
                    },
                    binding.arg ? Number(binding.arg) : 0
                );
            });
        });

        /**
         * 滚动条监听
         * @param {string} arg  "bottom" | ""
         * @return {Function}
         */
        app.directive("scroll", {
            mounted(el, binding) {
                window.addEventListener("scroll", () => {
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                    switch (binding.arg) {
                        case "bottom":
                            if (scrollTop + windowHeight == scrollHeight) binding.value();
                            break;
                        default:
                            binding.value(scrollTop);
                            break;
                    }
                });
            },
            unmounted() {
                window.removeEventListener("scroll", () => {});
            },
        });

        app.directive("clipboard", {
            mounted: (el, binding) => {
                if (binding.arg === "success") {
                    el._v_clipboard_success = binding.value;
                } else if (binding.arg === "error") {
                    el._v_clipboard_error = binding.value;
                } else {
                    const clipboard = new Clipboard(el, {
                        text() {
                            return binding.value;
                        },
                        action() {
                            return binding.arg === "cut" ? "cut" : "copy";
                        },
                    });
                    clipboard.on("success", (e) => {
                        successMessage("Copy successfully");
                        const callback = el._v_clipboard_success;
                        callback && callback(e); // eslint-disable-line
                    });
                    clipboard.on("error", (e) => {
                        errorMessage("Copy failed");
                        const callback = el._v_clipboard_error;
                        callback && callback(e); // eslint-disable-line
                    });
                    el._v_clipboard = clipboard;
                }
            },
            updated: (el, binding) => {
                if (binding.arg === "success") {
                    el._v_clipboard_success = binding.value;
                } else if (binding.arg === "error") {
                    el._v_clipboard_error = binding.value;
                } else {
                    el._v_clipboard.text = function() {
                        return binding.value;
                    };
                    el._v_clipboard.action = function() {
                        return binding.arg === "cut" ? "cut" : "copy";
                    };
                }
            },
            unmounted: (el, binding) => {
                if (binding.arg === "success") {
                    delete el._v_clipboard_success;
                } else if (binding.arg === "error") {
                    delete el._v_clipboard_error;
                } else {
                    el._v_clipboard.destroy();
                    delete el._v_clipboard;
                }
            },
        });

        // v-keyboard:Enter="clickHandle"  Enter: 键盘事件的code值 clickHandle 为绑定的事件(事件擦参数(e,...))
        // v-keyboard:text="value"  text必传 value 为键盘事件参数
        app.directive("keyboard", {
            mounted: (el, binding) => {
                if (binding.arg === "text") {
                    el._v_value = binding.value;
                } else {
                    const keyDown = (e: KeyboardEvent) => {
                        const args = binding.arg as string,
                            code = e.code;
                        if (code.toLowerCase() === args.toLowerCase()) {
                            binding.value && binding.value(e, el._v_value);
                        }
                    };
                    el._v_event = keyDown;
                    window && window.addEventListener("keydown", keyDown);
                }
            },
            updated: (el, binding) => {
                if (binding.arg === "text") {
                    el._v_value = binding.value;
                }
            },
            unmounted: (el) => {
                window && window.removeEventListener("keydown", el._v_event);
                delete el._v_value;
                delete el._v_event;
            },
        });

        app.directive("permissions", (el, binding) => {
            // 权限 [admin,]
            const userPermissions = Store.getters.permissions,
                btnPermissions = binding.value;
            if (btnPermissions && btnPermissions instanceof Array) {
                const flag = userPermissions.some((item: string) => {
                    return btnPermissions.includes(item);
                });
                if (!flag) el.remove();
            } else {
                throw new Error(`need roles! Like v-permissions="['admin','editor']"`);
            }
        });
    },
};
