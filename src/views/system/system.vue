<template>
    <div class="system">
        <el-button type="primary" @click="clickHandle">click</el-button>
        <el-input v-model="input" style="width: 300px;"></el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { usePageUpdate } from "@/hooks";

export default defineComponent({
    name: "System",
    setup() {
        onMounted(() => {});
        const input = ref("");

        usePageUpdate(() => {
            console.log(1);
        });

        const clickHandle = () => {};

        return {
            input,
            clickHandle,
        };
    },
});
</script>

<style lang="scss" scoped></style>
