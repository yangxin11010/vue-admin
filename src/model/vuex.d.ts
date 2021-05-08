// vuex.d.ts
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { LayoutSize } from "@/store"


declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        lang: string;
        isLogin: boolean;
        collapse: boolean;
        token: string | null;
        tabsList: [Tabs[], Tabs[]];
        permissions: string[];
        layoutSize: LayoutSize;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
