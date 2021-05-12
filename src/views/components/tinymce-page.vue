<template>
    <div class="tinymce">
        <div class="disflex ju_bt" style="450px">
            <Tinymce width="100%" v-model="textarea"></Tinymce>
        </div>
        <div class="htmlContent" v-html="textarea"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from "vue";

export default defineComponent({
    name: "TinymcePage",
    setup() {
        let textarea = ref("<h1 style='text-align: center;'>Welcome to the TinyMCE demo!</h1>");
        return {
            textarea,
        };
    },
    components: {
        Tinymce: defineAsyncComponent(() => import("@/components/tinymce/index.vue")),
    },
});
</script>

<style lang="scss" scoped>
.tinymce {
    width: 100%;
    min-height: calc(100vh - 120px);
}
.htmlContent {
    width: 100%;
    height: 500px;
    margin-top: 20px;
    overflow: auto;
    padding: 20px;
    border: 1px solid #ddd;
}
</style>
