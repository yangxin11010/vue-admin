<template>
    <slot v-if="catchInject" :error="catchInject"></slot>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from "vue";
import { promiseInjectionKey } from "../help";
export default defineComponent({
    name: "Catch",
    setup() {
        const promise = inject(promiseInjectionKey);

        return {
            catchInject: computed(() => promise?.error),
        };
    },
});
</script>
