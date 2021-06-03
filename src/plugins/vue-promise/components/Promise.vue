<template>
    <slot></slot>
</template>

<script lang="ts">
import { defineComponent, PropType, onBeforeMount, provide, reactive } from "vue";
import { promiseInjectionKey, PromiseResponse } from "../help";
export default defineComponent({
    name: "Promise",
    props: {
        promise: {
            type: Function as PropType<() => void>,
        },
    },
    setup(props) {
        const result = reactive<PromiseResponse>({
            result: null,
            error: null,
        });

        provide(promiseInjectionKey, result);

        const http = async () => {
            if (!props.promise) {
                result.error = "promise can not find";
            } else {
                try {
                    result.result = await props.promise();
                } catch (error) {
                    result.error = error;
                }
            }
        };

        onBeforeMount(() => {
            http();
        });

        return {
            http,
        };
    },
});
</script>
