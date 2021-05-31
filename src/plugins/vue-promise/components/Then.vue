<template>
    <slot v-if="thenInject" :result="thenInject"></slot>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from "vue";
import { promiseInjectionKey } from "../help";
export default defineComponent({
    name: "Then",
    setup() {
        const promise = inject(promiseInjectionKey);

        return {
            thenInject: computed(() => promise?.result),
        };
    },
});
</script>
