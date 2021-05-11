<template>
    <div class="collapse" @click="click" :style="{ 'font-size': size + 'px' }">
        <svg-icon :iconClass="collapse ? 'nav_open' : 'nav_close'"></svg-icon>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
    name: "Collapse",
    props: {
        size: {
            type: Number,
            default: 22,
        },
    },
    setup() {
        const store = useStore();
        const collapse = computed<boolean>(() => store.getters.collapse);

        const click = () => {
            store.dispatch("SET_COLLAPSE", !collapse.value);
        };

        return {
            collapse,
            click,
        };
    },
});
</script>

<style lang="scss" scoped>
.collapse {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
        background-color: #434a50;
    }
}
</style>
