<template>
    <div class="system">
        {{ name }}
        <el-button type="primary" @click="clickHandle">click</el-button>
        <el-input v-model="input" style="width: 300px;"></el-input>
        <el-select v-model="input" style="width: 100px;">
            <el-option label="left" value="left"></el-option>
            <el-option label="right" value="right"></el-option>
        </el-select>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { usePageUpdate } from "@/hooks";
import { useStore } from "@/store";

export default defineComponent({
    name: "System",
    setup() {
        onMounted(() => {});
        const store = useStore();
        const input = ref("");

        usePageUpdate(() => {
            console.log(1);
        });

        const clickHandle = () => {
            store.dispatch("setting/SET_NAME", "李四");
        };

        return {
            input,
            clickHandle,
            name: computed(() => store.getters["setting/name"]),
        };
    },
});
</script>

<style lang="scss" scoped></style>
