<template>
    <div class="jsoneditor-page">
        <JsonEditor
            ref="jsonEditorRef"
            :options="options"
            mode="code"
            v-model="value"
            :value="value"
            @change="jsonChange"
        ></JsonEditor>
        <div class="jsonvalue">{{ value }}</div>
        <div class="jsonvalue">{{ showValue }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref } from "vue";

export default defineComponent({
    name: "JsonEditorPage",
    setup() {
        const jsonEditorRef = ref();
        const value = ref({ name: "张三", age: 21, sex: 1, address: "江苏省南京市" });

        const options = reactive({
            mode: "code",
        });

        const showValue = ref("");

        const jsonChange = (e: object) => {
            showValue.value = JSON.stringify(e);
        };

        return {
            jsonEditorRef,
            value,
            options,
            jsonChange,
            showValue,
        };
    },
    components: {
        JsonEditor: defineAsyncComponent(() => import("@/components/JsonEditor.vue")),
    },
});
</script>

<style lang="scss" scoped>
.jsoneditor-page {
    width: 100%;
    height: calc(100vh - 120px);
    padding-bottom: 100px;
}
.jsonvalue {
    margin-top: 10px;
}
</style>
