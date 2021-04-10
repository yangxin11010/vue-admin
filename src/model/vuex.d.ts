// vuex.d.ts
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        isLogin: boolean;
        collapse: boolean;
        token: string | null;
        tabsList: [Tabs[], Tabs[]];
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
