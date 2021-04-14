<template>
    <div class="system">
        <Tinymce></Tinymce>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
    name: "System",
    setup() {
        let form = reactive({
            name: "",
        });
        const clickHandle = () => {
            console.log(1);
        };
        const success = (e: any) => {
            console.log(e);
        };
        const time: number = 300;

        return {
            form,
            clickHandle,
            time,
            success,
        };
    },
});
</script>

<style lang="scss" scoped></style>
