<template>
    <div class="jsonEditor" ref="jsonEditorRef"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, PropType, watch } from "vue";
import JSONEditor, { JSONEditorOptions, JSONEditorMode } from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

export default defineComponent({
    name: "JsonEditor",
    props: {
        // 配置 文档: https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
        options: {
            type: Object as PropType<JSONEditorOptions>,
            default: () => ({}),
        },
        // 节点名称
        name: {
            type: String,
            default: "",
        },
        // 模式
        mode: {
            type: String as PropType<JSONEditorMode>,
            default: "code",
        },
        // 默认值 存在 value 失效
        modelValue: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: [Object, String],
            default: () => ({}),
        },
        // 展开或收起 mode 为 ["tree", "view", "form"] 模式下有效
        collapse: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        const jsonEditorRef = ref();
        let editor: JSONEditor;

        const options = reactive<JSONEditorOptions>({
            name: props.name,
            mode: props.mode,
            modes: ["code", "form", "text", "tree", "view", "preview"],
            onChange: function() {
                ctx.emit("update:modelValue", getValue());
                if (!props.modelValue && props.value) {
                    ctx.emit("change", getValue());
                }
            },
        });

        const setValue = (val: object) => {
            editor.set(val);
        };

        const getValue = () => {
            return editor.get();
        };
        const getTextValue = () => {
            return editor.get();
        };

        watch(
            () => props.collapse,
            () => {
                isCollapse();
            }
        );

        // 展开或收起
        const isCollapse = () => {
            if (["tree", "view", "form"].includes(editor.getMode())) {
                props.collapse ? editor.collapseAll() : editor.expandAll();
            }
        };

        const init = () => {
            // 自定义配置
            const userOptions: JSONEditorOptions = JSON.parse(JSON.stringify(props.options));
            delete userOptions.mode;
            delete userOptions.modes;
            const mergeOptions = Object.assign(options, userOptions);
            // 默认值

            editor = new JSONEditor(
                jsonEditorRef.value,
                mergeOptions,
                props.modelValue ? props.modelValue : props.value
            );
            if (!props.modelValue && props.value) {
                ctx.emit("change", getValue());
            }
            isCollapse();
        };

        const destroy = () => {
            editor.destroy();
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
