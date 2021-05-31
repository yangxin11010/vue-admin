import { onBeforeMount, onUnmounted, onActivated, onDeactivated } from "vue";
import mitter from "@/plugins/mitt";
import { useRoute } from "vue-router";

export default (value: () => void) => {
    const route = useRoute();

    function watchUpdate() {
        mitter.$on("update-page", value);
    }
    onActivated(() => {
        if (route.meta.keepAlive) {
            watchUpdate();
        }
    });
    onDeactivated(() => {
        mitter.$off("update-page", value);
    });
    onBeforeMount(() => {
        if (!route.meta.keepAlive) {
            watchUpdate();
        }
    });
    onUnmounted(() => {
        mitter.$off("update-page", value);
    });
};
