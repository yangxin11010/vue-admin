import { App } from "vue";
import MyElTable from "./MyElTable.vue";
import HandleBox from "./HandleBox.vue";

export default {
    install: (app: App) => {
        app.component("MyElTable", MyElTable);
        app.component("HandleBox", HandleBox);
    },
};
