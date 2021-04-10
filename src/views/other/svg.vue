<template>
    <div class="svgpage">
        <el-tabs type="border-card" tab-position="top">
            <el-tab-pane label="svgIcons">
                <div class="icon-list disflex flex-w ju_ar">
                    <template v-for="(item, index) in iconsList" :key="index">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`<svg-icon icon-class=&quot;${item}&quot; />`"
                            placement="top"
                        >
                            <div class="icon-item" @click="copyText(`<svg-icon icon-class=&quot;${item}&quot; />`)">
                                <i><svg-icon :icon-class="item"></svg-icon></i>
                                <span>{{ item }}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Element-UI Icons">
                <div class="icon-list disflex flex-w ju_ar">
                    <template v-for="(item, index) in ElIcons" :key="index">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`<i class=&quot;${item}&quot; />`"
                            placement="top"
                        >
                            <div class="icon-item" @click="copyText(`<i class=&quot;${item}&quot; />`)">
                                <i :class="item" />
                                <span>{{ item }}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, ComponentInternalInstance } from "vue";
import { ElMessage } from "element-plus";
import ElIcons from "@/util/el-icons";

export default defineComponent({
    name: "SvgPage",
    setup() {
        const app = getCurrentInstance() as ComponentInternalInstance;
        const iconsList: string[] = [
            "404",
            "personcenter",
            "nav_close",
            "nav_open",
            "search",
            "yaoshi",
            "fullscreen",
            "exit-fullscreen",
            "message",
            "money",
            "shopcar",
            "usergroup",
        ];

        const copyText = (val: string) => {
            app.appContext.config.globalProperties
                .$copyText(val)
                .then(() => {
                    ElMessage({
                        type: "success",
                        message: "Copy successfully",
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: "error",
                        message: "Copy failed",
                    });
                });
        };

        return {
            ElIcons: ref(ElIcons),
            iconsList,
            copyText,
        };
    },
});
</script>

<style lang="scss" scoped>
.icon-item {
    width: 120px;
    height: 120px;
    text-align: center;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        color: #1890ff;
    }
    i {
        font-size: 35px;
    }
    span {
        font-size: 14px !important;
        margin-top: 10px;
    }
}</style
>>
