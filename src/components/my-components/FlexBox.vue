<template>
    <div class="flex-box" :style="styleParams">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type FlexWrap = "nowrap" | "row-wrap" | "wrap-reverse";
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
type AlignItems = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
type AlignContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";

export default defineComponent({
    name: "FlexBox",
    props: {
        flexDirection: {
            type: String as PropType<FlexDirection>,
            default: "row",
        },
        flexWrap: {
            type: String as PropType<FlexWrap>,
            default: "nowrap",
        },
        flexFlow: {
            type: String,
            default: "row nowrap",
        },
        justifyContent: {
            type: String as PropType<JustifyContent>,
            default: "flex-start",
        },
        alignItems: {
            type: String as PropType<AlignItems>,
            default: "center",
        },
        alignContent: {
            type: String as PropType<AlignContent>,
            default: "stretch",
        },
    },
    setup(props) {
        const styleParams = computed(() => {
            return {
                flexDirection: props.flexDirection,
                flexWrap: props.flexWrap,
                flexFlow: props.flexFlow,
                justifyContent: props.justifyContent,
                alignItems: props.alignItems,
                alignContent: props.alignContent,
            };
        });
        return {
            styleParams,
        };
    },
});
</script>

<style lang="scss" scoped>
.flex-box {
    display: flex;
}
</style>
