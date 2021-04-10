<template>
    <div class="system">
        <el-input v-model="form.name"></el-input>
        <p>{{ form.name }}</p>
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
        return {
            form,
        };
    },
});
</script>

<style lang="scss" scoped></style>>
