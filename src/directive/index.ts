import { successMessage, errorMessage } from "@/util/message";
import Clipboard from "clipboard";
// http://dmauro.github.io/Keypress/
import Keypress from "keypress.js";
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
            let timer: any = null;
            return function() {
                if (timer !== null) {
                    clearTimeout(timer);
                }
                el.addEventListener("click", () => {
                    timer = setTimeout(binding.value, binding.arg ? Number(binding.arg) : 0);
                });
            }();
        });

        /**
         * 滚动条监听
         * @param {string} arg  "bottom" | ""
         * @return {Function}
         */
        app.directive("scroll", {
            mounted(el, binding) {
                el._listener = () => {
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                    if (binding.arg === "bottom" && scrollTop + windowHeight == scrollHeight) {
                        binding.value();
                        return;
                    }
                    binding.value(scrollTop);
                };
                window.addEventListener("scroll", el._listener);
            },
            unmounted(el) {
                window.removeEventListener("scroll", el._listener);
                delete el._listener;
            },
        });

        app.directive("clipboard", {
            mounted: (el, binding) => {
                if (binding.arg === "success" && typeof binding.value === "function") {
                    el._v_clipboard_success = binding.value;
                    return;
                }
                if (binding.arg === "error" && typeof binding.value === "function") {
                    el._v_clipboard_error = binding.value;
                    return;
                }
                const clipboard = new Clipboard(el, {
                    text() {
                        return binding.value as string;
                    },
                    action() {
                        return binding.arg === "cut" ? "cut" : "copy";
                    },
                });
                clipboard.on("success", (e) => {
                    successMessage("Copy successfully");
                    el._v_clipboard_success(e);
                });
                clipboard.on("error", (e) => {
                    errorMessage("Copy failed");
                    el._v_clipboard_error(e);
                });
                el._v_clipboard = clipboard;
            },
            updated: (el, binding) => {
                if (binding.arg === "success") {
                    el._v_clipboard_success = binding.value;
                    return;
                }
                if (binding.arg === "error") {
                    el._v_clipboard_error = binding.value;
                    return;
                }
                el._v_clipboard.text = function() {
                    return binding.value;
                };
                el._v_clipboard.action = function() {
                    return binding.arg === "cut" ? "cut" : "copy";
                };
            },
            unmounted: (el, binding) => {
                if (binding.arg === "success") {
                    delete el._v_clipboard_success;
                    return;
                }
                if (binding.arg === "error") {
                    delete el._v_clipboard_error;
                    return;
                }
                el._v_clipboard.destroy();
                delete el._v_clipboard;
            },
        });

        /**
         * v-keyboard:[params]="event"
         *      @params: 键盘事件的code(支持组合按键 以+号分割)值
         *      @ event:  事件
         *          .press 将组合按键改为连续按键
         * v-keyboard:text="value"  text必传 value 为键盘事件参数
         */
        app.directive("keyboard", {
            mounted: (el, binding) => {
                if (binding.arg === "text") {
                    el._v_value = binding.value;
                    return;
                }
                const args = (binding.arg as string).toLowerCase(),
                    { press } = binding.modifiers;
                el._listener = new Keypress.Listener();
                el._listener[`${press ? "sequence_combo" : "simple_combo"}`](args.split("+").join(" "), function(
                    e: KeyboardEvent
                ) {
                    binding.value && binding.value(e, { ...el._v_value });
                });
            },
            updated: (el, binding) => {
                if (binding.arg === "text") {
                    el._v_value = binding.value;
                }
            },
            unmounted: (el) => {
                el._listener.destroy();
                delete el._v_value;
                delete el._listener;
            },
        });

        /**
         * 权限 [admin,]
         */
        app.directive("permissions", (el, binding) => {
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
