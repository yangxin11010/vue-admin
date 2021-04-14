import Clipboard from "clipboard";
import { successMessage, errorMessage } from "@/util/message";
import { App } from "vue";
/**
 * 防抖
 * @param {number} arg  0
 * @return {Function}
 */

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
    },
};
