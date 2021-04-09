<template>
    <div class="header disflex ju_bt align-it-cen">
        <div class="header-l disflex align-it-cen">
            <div class="collapse" @click="collapseHandle">
                <svg-icon :iconClass="collapse ? 'nav_open' : 'nav_close'"></svg-icon>
            </div>
            <el-breadcrumb>
                <el-breadcrumb-item :to="{ path: '/' }">
                    <span
                        class="breadcrumb"
                        :class="{
                            curpot: breadcrumbList.length > 0,
                            hoverClass: breadcrumbList.length > 0,
                        }"
                        style="font-weight: normal"
                        >首页</span
                    >
                </el-breadcrumb-item>
                <template v-for="(item, index) in breadcrumbList" :key="index">
                    <el-breadcrumb-item>
                        <span class="breadcrumb">{{ item }}</span>
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
        <div class="header-r disflex ju_bt align-it-cen">
            <el-tooltip
                effect="dark"
                :content="messageNum !== 0 ? `有${messageNum}条未读消息` : '消息中心'"
                placement="bottom-end"
            >
                <router-link class="h100p" to="/message">
                    <div class="header-r-item" style="font-size:20px;">
                        <template v-if="messageNum > 0">
                            <el-badge is-dot type="danger"><i class="el-icon-bell"/></el-badge>
                        </template>
                        <template v-else>
                            <i class="el-icon-bell" />
                        </template>
                    </div>
                </router-link>
            </el-tooltip>
            <el-tooltip effect="dark" :content="isFullScreen ? '取消全屏' : '全屏'" placement="bottom-end">
                <div class="fullscreen header-r-item" @click="fullScreen">
                    <svg-icon :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
                </div>
            </el-tooltip>
            <el-dropdown
                class="header-dropdown"
                placement="bottom-end"
                size="medium"
                trigger="click"
                @command="handleCommand"
            >
                <div class="header-r-item">
                    <div class="user-header">
                        <el-avatar
                            :size="40"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                        ></el-avatar>
                        <i class="el-icon-caret-bottom" />
                    </div>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :command="0">个人中心</el-dropdown-item>
                        <el-dropdown-item :command="1">首页</el-dropdown-item>
                        <el-dropdown-item :command="2">项目地址</el-dropdown-item>
                        <el-dropdown-item :command="3" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store/index";
import { ElMessage } from "element-plus";
import Screenfull from "screenfull";
import mitter from "@/plugins/mitt";

export default defineComponent({
    setup() {
        const store = useStore(),
            route = useRoute(),
            router = useRouter();

        const collapse = computed(() => store.getters.collapse);
        const collapseHandle = () => {
            store.dispatch("SET_COLLAPSE", !collapse.value);
        };

        // 面包屑
        let breadcrumbList = ref<string[]>([]);

        watch(
            () => route.meta.title,
            (newValue) => {
                if (route.path === "/dashboard") {
                    breadcrumbList.value = [];
                } else {
                    breadcrumbList.value = [newValue as string];
                }
            }
        );

        // 全屏
        const isFullScreen = ref(false);

        const fullScreen = () => {
            if (!Screenfull.isEnabled) {
                ElMessage({
                    showClose: true,
                    message: "浏览器不支持全屏",
                    type: "warning",
                    duration: 1000,
                });
                return false;
            }

            Screenfull.toggle();
        };

        const handleCommand = (e: number) => {
            switch (e) {
                case 0:
                    router.push("/personCenter");
                    break;
                case 1:
                    router.push("/dashboard");
                    break;
                case 2:
                    ElMessage({
                        showClose: true,
                        message: "暂无！",
                        type: "info",
                        duration: 1000,
                        center: true,
                    });
                    break;
                case 3:
                    store.dispatch("LOGIN_OUT");
                    router.push("/login");
                    break;
            }
        };

        // 未读消息
        const messageNum = ref(0);

        const getData = () => {
            messageNum.value = 4;
        };

        onMounted(() => {
            getData();
            if (route.path !== "/dashboard") {
                breadcrumbList.value = [route.meta.title as string];
            }
            if (Screenfull.isEnabled) {
                Screenfull.onchange(() => {
                    isFullScreen.value = !isFullScreen.value;
                });
            }
            // 监听 消息中心 清除未读消息
            mitter.$on("clearNoReadMessage", () => {
                messageNum.value = 0;
            });
        });

        return {
            collapse,
            collapseHandle,
            breadcrumbList,
            fullScreen,
            isFullScreen,
            handleCommand,
            messageNum,
        };
    },
});
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 100%;
    background-color: $main-color;
    color: #ffffff;
    user-select: none;
    a {
        color: #ffffff;
    }
}
.collapse {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 22px;
    margin-right: 10px;
    &:hover {
        background-color: #434a50;
    }
}
.breadcrumb {
    color: #fff;
}
.hoverClass:hover {
    color: #1890ff;
}
.header-r {
    padding-right: 10px;
    height: 100%;
}
.header-r .header-r-item {
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: #263445;
    }
}
.fullscreen {
    font-size: 22px;
}
.user-header {
    width: 100%;
    // height: 100%;
}
.user-header i {
    font-size: 13px;
    margin-left: 5px;
    color: #fff;
    position: relative;
    top: -15px;
}
</style>
<style lang="scss">
.header-dropdown {
    height: 100%;
}
.el-badge__content {
    border: none;
}
</style>
