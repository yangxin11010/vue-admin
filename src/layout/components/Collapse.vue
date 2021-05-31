<template>
    <div class="collapse" @click="click" :style="{ 'font-size': size + 'px' }">
        <i :class="collapse ? 'np-icon-unfold' : 'np-icon-fold'"></i>
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
        const collapse = computed<boolean>(() => store.getters["setting/collapse"]);

        const click = () => {
            store.dispatch("setting/SET_COLLAPSE", !collapse.value);
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
        background-color: rgba(0, 0, 0, 0.025);
    }
}
</style>
