import { createGlobal } from "@/plugins/vue-global-store";

interface State {
    name: string;
    age: number;
}

const store = createGlobal<State>({
    state: {
        name: "张三",
        age: 18,
    },
    behavior: {
        SET_NAME(state, value) {
            state.name = value;
        },
        SET_AGE(state, value) {
            state.age = value;
        },
    },
});

export default store;
