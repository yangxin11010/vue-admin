import { Module } from "vuex";
import type {  Tabs } from "@model/views";


export interface State {
    tabsList: [Tabs[], Tabs[]];
}

const setting: Module<State, any> = {
    namespaced: true,
    state: {
        tabsList: [[{ name: "Dashboard", title: "首页", path: "/dashboard", keepAlive: true }], []],
    },
    getters: {
        tabsList: (state) => state.tabsList,
    },
    mutations: {
        ADD_TABS(state, value: Tabs) {
            state.tabsList[1].push(value);
        },
        REMOVE_TABS(state, value?: number) {
            if (value || value === 0) {
                state.tabsList[1].splice(value, 1);
            } else {
                state.tabsList[1] = [];
            }
        },
        REMOVE_LEFT_RIGHT_TABS(state, value: { type: "left" | "right"; index: number }) {
            const begin = value.type === "left" ? 0 : value.index + 1,
                end = value.type === "left" ? value.index : state.tabsList[1].length - 1;
            state.tabsList[1].splice(begin, end);
        },
        REMOVE_OTHER_TABS(state, value: number) {
            state.tabsList[1] = [state.tabsList[1][value]];
        },
        KEPP_TABS(state, value: number) {
            state.tabsList[0].push(state.tabsList[1][value]);
        },
        REMOVE_KEEP_TABS(state, value: number) {
            state.tabsList[1].push(state.tabsList[0][value]);
            state.tabsList[0].splice(value, 1);
        },
        INIT_TABS(state) {
            state.tabsList = [[{ name: "Dashboard", title: "首页", path: "/dashboard", keepAlive: true }], []];
        },
    },
    actions: {
        ADD_TABS({ commit }, value: Tabs) {
            commit("ADD_TABS", value);
        },
        REMOVE_TABS({ commit }, value?: number) {
            commit("REMOVE_TABS", value);
        },
        REMOVE_LEFT_RIGHT_TABS({ commit }, value: { type: "left" | "right"; index: number }) {
            commit("REMOVE_LEFT_RIGHT_TABS", value);
        },
        REMOVE_OTHER_TABS({ commit }, value: number) {
            commit("REMOVE_OTHER_TABS", value);
        },
        KEPP_TABS({ commit }, value: number) {
            commit("KEPP_TABS", value);
            commit("REMOVE_TABS", value);
        },
        REMOVE_KEEP_TABS({ commit }, value: number) {
            commit("REMOVE_KEEP_TABS", value);
        },
        INIT_TABS({ commit }) {
            commit("INIT_TABS");
        },
    },
};

export default setting;
