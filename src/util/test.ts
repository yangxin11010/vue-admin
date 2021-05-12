import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
    name: "Test",
    setup() {
        const user = reactive({
            name: "张三",
            age: 18,
        });
        return {
            ...toRefs(user),
        };
    },
});
