<template>
    <div class="system"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";

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

        onMounted(() => {
            
        });

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
