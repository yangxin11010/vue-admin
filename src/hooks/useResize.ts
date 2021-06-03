import { ref, watch } from "vue";
import useEventListener from "./useEventListener";

export default (fn?: (nextWidth: number[], nextHeight: number[]) => void) => {
    const width = ref(window.innerWidth),
        height = ref(window.innerHeight);
    useEventListener("resize", () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    });
    fn &&
        watch([width, height], (newValue, oldValue) => {
            fn(newValue, oldValue);
        });
    return {
        width,
        height,
    };
};
