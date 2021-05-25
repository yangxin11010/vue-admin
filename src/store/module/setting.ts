import { Module } from "vuex";

export type LayoutSize = "default" | "medium" | "small" | "mini";

export interface State {
    name: string;
}

const setting: Module<State, any> = {
    namespaced: true,
    state: {
        name: "张三",
    },
    getters: {
        name: (state) => state.name,
    },
    mutations: {
        SET_NAME(state, value: string) {
            state.name = value;
        },
    },
    actions: {
        SET_NAME({ commit }, value: string) {
            commit("SET_NAME", value);
        },
    },
};

export default setting;
