<template>
    <div class="system">
        <el-input v-model="form.name"></el-input>
        <p v-clipboard:success="success" v-clipboard="123">{{ form.name }}</p>
        <input type="text" />
        <el-button type="primary" v-debounce:300="clickHandle">点击</el-button>
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
