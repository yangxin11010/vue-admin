import { Module } from "vuex";

export type LayoutSize = "default" | "medium" | "small" | "mini";

export interface State {
    layoutSize: LayoutSize;
}

const setting: Module<State, any> = {
    namespaced: true,
    state: {
        layoutSize: "small",
    },
    getters: {
        layoutSize: (state) => state.layoutSize,
    },
    mutations: {
        SET_LAYOUTSIZE(state, value: LayoutSize) {
            state.layoutSize = value;
        },
    },
    actions: {
        SET_LAYOUTSIZE({ commit }, value: LayoutSize) {
            commit("SET_LAYOUTSIZE", value);
        },
    },
};

export default setting;
