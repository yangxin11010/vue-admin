import { Module } from "vuex";

export type LayoutSize = "default" | "medium" | "small" | "mini";

export interface State {
    lang: string;
    collapse: boolean;
    layoutSize: LayoutSize;
}

const setting: Module<State, any> = {
    namespaced: true,
    state: {
        lang: "zh-cn",
        collapse: true,
        layoutSize: "small",
    },
    getters: {
        lang: (state) => state.lang,
        collapse: (state) => state.collapse,
        layoutSize: (state) => state.layoutSize,
    },
    mutations: {
        SET_LANG(state, value: string) {
            state.lang = value;
        },
        SET_COLLAPSE(state, value: boolean) {
            state.collapse = value;
        },
        SET_LAYOUTSIZE(state, value: LayoutSize) {
            state.layoutSize = value;
        },
    },
    actions: {
        SET_LANG({ commit }, value: string) {
            commit("SET_LANG", value);
        },
        SET_COLLAPSE({ commit }, value: boolean) {
            commit("SET_COLLAPSE", value);
        },
        SET_LAYOUTSIZE({ commit }, value: LayoutSize) {
            commit("SET_LAYOUTSIZE", value);
        },
    },
};

export default setting;
