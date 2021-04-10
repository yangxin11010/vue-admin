// store.ts
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { InjectionKey } from "vue";
import { Tabs } from "@/model/views";

export interface KeyValue {
    key: string;
    value: any;
}

export interface State {
    isLogin: boolean;
    collapse: boolean;
    token: string | null;
    tabsList: [Tabs[], Tabs[]];
}

export const key: InjectionKey<Store<State>> = Symbol();

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key);
}

const store = createStore<State>({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            reducer(state) {
                return {
                    isLogin: state.isLogin,
                    collapse: state.collapse,
                    token: state.token,
                    tabsList: state.tabsList,
                };
            },
        }),
        createPersistedState({
            storage: window.localStorage,
            reducer(state) {
                return {};
            },
        }),
    ],
    state: {
        isLogin: false,
        collapse: true,
        token: null,
        tabsList: [[{ name: "Dashboard", title: "首页", path: "/dashboard" }], []],
    },
    getters: {
        isLogin: (state) => state.isLogin,
        collapse: (state) => state.collapse,
        token: (state) => state.token,
        tabsList: (state) => state.tabsList,
    },
    mutations: {
        LOGIN(state, value: string) {
            state.isLogin = true;
            state.token = value;
        },
        LOGIN_OUT(state) {
            state.isLogin = false;
            state.token = null;
        },
        SET_COLLAPSE(state, value: boolean) {
            state.collapse = value;
        },
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
            state.tabsList = [[{ name: "Dashboard", title: "首页", path: "/dashboard" }], []];
        },
    },
    actions: {
        LOGIN({ commit }, value: string) {
            commit("LOGIN", value);
        },
        LOGIN_OUT({ commit }) {
            commit("LOGIN_OUT");
        },
        SET_COLLAPSE({ commit }, value: boolean) {
            commit("SET_COLLAPSE", value);
        },
        ADD_TABS({ commit }, value: Tabs) {
            commit("ADD_TABS", value);
        },
        REMOVE_TABS({ commit }, value?: number) {
            commit("REMOVE_TABS", value);
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
});

export default store;
