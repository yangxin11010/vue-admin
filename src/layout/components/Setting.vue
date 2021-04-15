<template>
    <my-drawer :before-close="beforeClose">
        <div class="setting">
            <p class="title">系统布局设置</p>
            <div class="set-item">
                <div>侧边栏 Logo</div>
                <el-switch
                    :value="openLogo"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 0)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>开启 Tags-View</div>
                <el-switch
                    :value="openTabs"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 1)"
                ></el-switch>
            </div>
        </div>
    </my-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import MyDrawer from "@/components/MyDrawer.vue";
import { useStore } from "@/store";

export default defineComponent({
    setup() {
        const store = useStore();
        // my-drawer 关闭前 回调
        let openLogo = computed(() => store.getters.openLogo);
        let openTabs = computed(() => store.getters.openTabs);

        const switchChange = (e: boolean, index: number) => {
            if (index === 0) {
                store.dispatch("CHANGE_LOGO", e);
            } else if (index === 1) {
                store.dispatch("CHANGE_Tabs", e);
            }
        };

        const beforeClose = (done: () => void) => {
            console.warn("my-drawer is colsed");
            done();
        };
        return {
            beforeClose,
            openLogo,
            openTabs,
            switchChange,
        };
    },
    components: {
        MyDrawer,
    },
});
</script>

<style lang="scss" scoped>
.setting {
    padding: 30px 20px 20px;
    font-size: 14px;
}
.title {
    font-weight: bold;
    margin-bottom: 20px;
}
.set-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.65);
}
</style>
