<template>
    <slot v-if="promiseInject" :data="valueRef">1</slot>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, ref, watch, inject, computed } from "vue";
import { promiseInjectionKey } from "../help";
export default defineComponent({
    name: "DataList",
    props: {
        value: {
            type: Array as PropType<Array<any>>,
        },
        deep: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const valueRef = ref<any>([]);
        const promise = inject(promiseInjectionKey);
        onBeforeMount(() => {
            valueRef.value = valueRef.value.concat(props.value);
        });
        watch(
            () => props.value,
            (value) => {
                valueRef.value = valueRef.value.concat(value);
            },
            {
                deep: props.deep,
            }
        );
        return {
            valueRef: computed(() => valueRef.value),
            promiseInject: computed(() => promise?.result),
        };
    },
});
</script>
