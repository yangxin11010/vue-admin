<template>
    <div class="system">
        <el-button type="primary" @click="clickHandle">click</el-button>
        <p>mystore: {{ age }}</p>
        <p>userstore: {{ userage }}</p>
        <p>setstore: {{ count }}</p>
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
import { useGlobal, useUserGlobal, useSetGlobal } from "@/mystore";
import $api from "@/api";
// import { useStore } from "@/store";

export default defineComponent({
    name: "System",
    setup() {
        const page = ref(1),
            promiseRef = ref(),
            mystore = useGlobal(),
            userstore = useUserGlobal(),
            setstore = useSetGlobal();
        // store = useStore();

        usePageUpdate(() => {});

        const clickHandle = () => {
            mystore.commit("SET_AGE", Math.floor(Math.random() * 10));
            userstore.commit("SET_AGE", Math.floor(Math.random() * 10));
            setstore.commit("SET_COUNT", setstore.state.count + 1);
            // mystore.commit("SET_AGE", Math.floor(Math.random() * 10));
            // store.dispatch("setting/SET_NAME", "李四");
            // page.value++;
            // promiseRef.value.http();
        };
        onMounted(() => {});

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
            loginIngo,
            log,
            page,
            promiseRef,
            age: computed(() => mystore.state.age),
            userage: computed(() => userstore.state.age),
            count: computed(() => setstore.state.count),
        };
    },
});
</script>

<style lang="scss" scoped></style>
