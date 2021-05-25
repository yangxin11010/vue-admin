import { App } from "vue";
import MyElTable from "./MyElTable.vue";
import HandleBox from "./HandleBox.vue";
import FlexBox from "./FlexBox.vue";

export default {
    install: (app: App) => {
        app.component("MyElTable", MyElTable);
        app.component("HandleBox", HandleBox);
        app.component("FlexBox", FlexBox);
    },
};
