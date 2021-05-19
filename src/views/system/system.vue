<template>
    <div class="system">
        <el-button type="primary" @click="clickHandle">click</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
    name: "System",
    setup() {
        const clickHandle = () => {};

        onMounted(() => {});

        return {
            clickHandle,
        };
    },
});
</script>

<style lang="scss" scoped></style>
