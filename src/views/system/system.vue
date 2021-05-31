<template>
    <div class="system">
        <el-button type="primary" @click="clickHandle">click</el-button>
        <p>{{ $store.getters["setting/name"] }}</p>
        <p>{{ age }}</p>
        <p>{{ page }}</p>
        <Promise ref="promiseRef" :promise="loginIngo">
            <Then v-slot="{ result }">
                <p>code: {{ result.code }}</p>
                <data-list :value="result.data.list" v-slot="{ data }">
                    <p v-for="(item, index) in data" :key="index">{{ item.title }}</p>
                </data-list>
            </Then>
            <Catch v-slot="{ error }">
                {{ error }}
            </Catch>
        </Promise>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { usePageUpdate } from "@/hooks";
import { useGlobal } from "@/plugins/vue-global-store";
import $api from "@/api";
import { useStore } from "@/store";

export default defineComponent({
    name: "System",
    setup() {
        onMounted(() => {});
        const page = ref(1),
            promiseRef = ref(),
            store = useStore();
        const mystore = useGlobal();

        usePageUpdate(() => {});

        const clickHandle = () => {
            // mystore.commit("SET_AGE", Math.floor(Math.random() * 10));
            store.dispatch("setting/SET_NAME", "李四");
            // page.value++;
            // promiseRef.value.axios();
        };

        const loginIngo = () => {
            return $api.goods.queryGoods({
                page: page.value,
                size: 10,
            });
        };

        const log = (e: any) => {
            console.log(e);
        };

        return {
            clickHandle,
            age: computed(() => mystore.state.age),
            loginIngo,
            log,
            page,
            promiseRef,
        };
    },
});
</script>

<style lang="scss" scoped></style>
