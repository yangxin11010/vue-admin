<template>
    <div class="system">
        <p>{{ age }}</p>
        <el-button type="primary" @click="clickHandle">click</el-button>
        <el-input v-model="input" style="width: 300px;"></el-input>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { usePageUpdate } from "@/hooks";
import { useGlobal } from "@/hooks/vue-global-store";

export default defineComponent({
    name: "System",
    setup() {
        onMounted(() => {});
        const input = ref("");
        const store = useGlobal();

        watch(input, (value) => {
            console.log(value);
        });

        usePageUpdate(() => {});

        const clickHandle = () => {
            store.commit("SET_AGE", Math.floor(Math.random() * 10));
        };

        return {
            input,
            clickHandle,
            age: computed(() => store.state.age),
        };
    },
});
</script>

<style lang="scss" scoped></style>
