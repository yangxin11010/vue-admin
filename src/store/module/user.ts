import type { Module } from "vuex";
import type { Menu } from "@model/views";
import type { RootState } from "../index";

export interface UserState {
    isLogin: boolean;
    token: string | null;
    permissions: string[];
    menuList: Menu[];
}

const setting: Module<UserState, RootState> = {
    namespaced: true,
    state: {
        isLogin: false,
        token: null,
        permissions: ["boss", "admin"],
        menuList: [],
    },
    getters: {
        isLogin: state => state.isLogin,
        token: state => state.token,
        permissions: state => state.permissions,
        menuList: state => state.menuList,
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
        SET_PERMISSIONS(state, value: string[]) {
            state.permissions = value;
        },
        SET_MENULIST(state, value: Menu[]) {
            state.menuList = value;
        },
    },
    actions: {
        LOGIN({ commit }, value: string) {
            commit("LOGIN", value);
        },
        LOGIN_OUT({ commit }) {
            commit("LOGIN_OUT");
        },
        SET_PERMISSIONS({ commit }, value: string[]) {
            commit("SET_PERMISSIONS", value);
        },
        SET_MENULIST({ commit }, value: Menu[]) {
            commit("SET_MENULIST", value);
        },
    },
};

export default setting;
