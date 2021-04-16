<template>
    <div class="header disflex ju_bt align-it-cen">
        <div class="header-l disflex align-it-cen">
            <Collapse></Collapse>
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="header-r disflex ju_bt align-it-cen">
            <el-tooltip
                effect="dark"
                :content="messageNum !== 0 ? $t('message.have', { value: messageNum }) : $t('message.no')"
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
            <el-tooltip
                effect="dark"
                :content="isScreenfull ? $t('fullscreen.exit') : $t('fullscreen.full')"
                placement="bottom-end"
            >
                <div class="fullscreen header-r-item">
                    <Screenfull parent @screenfull="screenfull"></Screenfull>
                </div>
            </el-tooltip>
            <el-dropdown
                class="header-dropdown"
                placement="bottom-end"
                size="medium"
                trigger="click"
                @command="langSelect"
            >
                <div class="header-r-item lang-icon">
                    <svg-icon icon-class="language" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="zh" :disabled="langIndex === 'zh'">中文</el-dropdown-item>
                        <el-dropdown-item command="en" :disabled="langIndex === 'en'">English</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
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
import { defineComponent, ref, onMounted, defineAsyncComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import mitter from "@/plugins/mitt";
import { openWindow } from "@/util/util";
import { useI18n } from "vue-i18n";

export default defineComponent({
    setup() {
        const store = useStore(),
            router = useRouter();

        const { locale } = useI18n();

        let langIndex = computed(() => store.getters.lang);

        const langSelect = (e: string) => {
            locale.value = e;
            store.dispatch("SET_LANG", e);
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
                    openWindow("https://gitee.com/yangxin11010/vue-admin");
                    break;
                case 3:
                    store.dispatch("LOGIN_OUT");
                    store.dispatch("INIT_TABS");
                    router.push("/login");
                    break;
            }
        };

        // 未读消息
        const messageNum = ref(0);

        const getData = () => {
            messageNum.value = 4;
        };

        const isScreenfull = ref(false);
        const screenfull = (e: any) => {
            isScreenfull.value = e.screenfull;
        };

        onMounted(() => {
            getData();
            // 监听 消息中心 清除未读消息
            mitter.$on("clearNoReadMessage", () => {
                messageNum.value = 0;
            });
        });

        return {
            isScreenfull,
            langIndex,
            langSelect,
            handleCommand,
            messageNum,
            screenfull,
        };
    },
    components: {
        Collapse: defineAsyncComponent(() => import("@/components/Collapse.vue")),
        Screenfull: defineAsyncComponent(() => import("@/components/Screenfull.vue")),
        Breadcrumb: defineAsyncComponent(() => import("@/components/Breadcrumb.vue")),
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

.breadcrumb {
    color: #fff;
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
.lang-icon {
    color: #fff;
    font-size: 16px;
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
.breadcrumbList-enter-active,
.breadcrumbList-leave-active {
    transition: all 1s ease;
}
.breadcrumbList-enter-from,
.breadcrumbList-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/deep/ {
    .header-dropdown {
        height: 100%;
    }
    .el-badge__content {
        border: none;
    }
}
</style>
