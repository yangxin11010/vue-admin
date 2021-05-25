<script lang="ts">
import { defineComponent, onMounted, h } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
    name: "Redirect",
    setup() {
        const route = useRoute(),
            router = useRouter();
        onMounted(() => {
            console.log(route.params.path);
            console.log(route.query);
            router.replace({ path: "/" + route.params.path, query: route.query });
        });
        return () => h("span");
    },
});
</script>
