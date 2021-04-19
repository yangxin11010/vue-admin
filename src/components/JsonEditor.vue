<template>
    <div class="jsonEditor" ref="jsonEditorRef"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, PropType, watch } from "vue";
const JSONEditor = require("jsoneditor");
import "jsoneditor/dist/jsoneditor.min.css";

type Mode = "code" | "form" | "text" | "tree" | "view" | "preview";

export default defineComponent({
    name: "JsonEditor",
    props: {
        // 配置 文档: https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
        options: {
            type: Object as PropType<object>,
            default: () => {},
        },
        // 节点名称
        name: {
            type: String,
            default: "",
        },
        // 模式
        mode: {
            type: String as PropType<Mode>,
            default: "code",
        },
        // 默认值
        value: {
            type: Object,
            default: () => {},
        },
        // 展开或收起 mode 为 ["tree", "view", "form"] 模式下有效
        collapse: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        const jsonEditorRef = ref();

        const options = reactive({
            name: props.name,
            mode: props.mode,
            modes: ["code", "form", "text", "tree", "view", "preview"],
            onChange: function() {
                ctx.emit("change", getValue());
                // ctx.emit("update:modelValue", getTextValue());
            },
        });

        let editor = ref();

        const setValue = (val: object) => {
            editor.value.set(val);
        };

        const getValue = () => {
            return editor.value.get();
        };
        const getTextValue = () => {
            return editor.value.get();
        };

        watch(
            () => props.collapse,
            () => {
                isCollapse();
            }
        );

        // 展开或收起
        const isCollapse = () => {
            if (["tree", "view", "form"].includes(editor.value.getMode())) {
                props.collapse ? editor.value.collapseAll() : editor.value.expandAll();
            }
        };

        const init = () => {
            // 自定义配置
            const userOptions = JSON.parse(JSON.stringify(props.options));
            delete userOptions.mode;
            delete userOptions.modes;
            const mergeOptions = Object.assign(options, userOptions);
            // 默认值
            editor.value = new JSONEditor(jsonEditorRef.value, mergeOptions, props.value);
            ctx.emit("change", getValue());
            isCollapse();
        };

        const destroy = () => {
            editor.value.destroy();
        };

        onMounted(() => {
            init();
        });

        onUnmounted(() => {
            destroy();
        });

        return {
            jsonEditorRef,
            setValue,
            getValue,
            getTextValue,
        };
    },
});
</script>

<style lang="scss" scoped>
.jsonEditor {
    width: 100%;
    height: 100%;
}
</style>
