<template>
    <slot v-if="isShow"></slot>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
    name: "Permissions",
    props: {
        value: {
            type: Array as PropType<Array<string>>,
            default: () => [],
        },
    },
    setup(props) {
        const store = useStore(),
            isShow = computed<boolean>(() => {
                if (props.value.length <= 0) return true;
                return store.getters.permissions.some((item: string) => {
                    return props.value.includes(item);
                });
            });

        return {
            isShow,
        };
    },
});
</script>

<style lang="scss" scoped></style>
