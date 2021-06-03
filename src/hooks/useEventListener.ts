import { onBeforeMount, onBeforeUnmount, onActivated, onDeactivated } from "vue";
export default (key: string, fn: () => void) => {
    onBeforeMount(() => {
        window.addEventListener(key, fn);
    });
    onBeforeUnmount(() => {
        window.removeEventListener(key, fn);
    });
    onActivated(() => {
        window.addEventListener(key, fn);
    });
    onDeactivated(() => {
        window.removeEventListener(key, fn);
    });
};
