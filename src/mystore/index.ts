import { createGlobal, useGlobal as useBaseGlobal, GlobalState } from "@/plugins/vue-global-store";

interface State {
    name: string;
    age: number;
}

// export const InjectKey: InjectionKey<GlobalState<State>> = Symbol();

//  root module
const store = createGlobal<State>({
    state: {
        name: "张三",
        age: 18,
    },
    behavior: {
        SET_NAME(state, value: string) {
            state.name = value;
        },
        SET_AGE(state, value: number) {
            state.age = value;
        },
    },
});

export const useGlobal = () => {
    return useBaseGlobal<State>();
};

//  user module
export const user = createGlobal<State>({
    name: "user",
    state: {
        name: "李四",
        age: 20,
    },
    behavior: {
        SET_NAME(state, value: string) {
            state.name = value;
        },
        SET_AGE(state, value: number) {
            state.age = value;
        },
    },
});

export const useUserGlobal = () => {
    return useBaseGlobal<State>("user");
};

// setting module

interface SetState {
    collspan: boolean;
    count: number;
}

const settingKey = Symbol("setting");
export const setting = createGlobal<SetState>({
    name: settingKey,
    state: {
        collspan: true,
        count: 0,
    },
    behavior: {
        SET_NAME(state, value: boolean) {
            state.collspan = value;
        },
        SET_COUNT(state, value: number) {
            state.count = value;
        },
    },
});

export const useSetGlobal = () => {
    return useBaseGlobal<SetState>(settingKey);
};

export default store;
