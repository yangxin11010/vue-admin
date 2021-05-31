<template>
    <div class="header disflex ju_bt align-it-cen">
        <div class="header-l disflex align-it-cen">
            <template v-if="navType === 'side'">
                <Collapse class="header-color"></Collapse>
                <template v-if="!headerMenu">
                    <Breadcrumb></Breadcrumb>
                </template>
                <template v-else>
                    <HeaderMenu style="margin-left: -10px;"></HeaderMenu>
                </template>
            </template>
            <template v-else>
                <Aside mode="horizontal"></Aside>
            </template>
        </div>
        <div class="header-r disflex ju_bt align-it-cen">
            <!-- 搜索 -->
            <div v-if="['side'].includes(navType)" class="" style="padding: 0;">
                <Search></Search>
            </div>
            <!-- 消息 -->
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
            <!-- 全屏 -->
            <el-tooltip
                effect="dark"
                :content="isScreenfull ? $t('fullscreen.exit') : $t('fullscreen.full')"
                placement="bottom-end"
            >
                <div class="fullscreen header-r-item">
                    <Screenfull parent @screenfull="screenfull"></Screenfull>
                </div>
            </el-tooltip>
            <!-- element-ui 组件大小 -->
            <el-dropdown
                class="header-dropdown"
                placement="bottom"
                size="medium"
                trigger="click"
                @command="changeLayoutSize"
            >
                <div class="header-r-item layout-size">
                    <svg-icon icon-class="layout-size" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <template v-for="item in ['Mini', 'Small', 'Medium', 'large']" :key="item">
                            <el-dropdown-item
                                :command="item.toLowerCase()"
                                :disabled="layoutSize === item.toLowerCase()"
                            >
                                {{ item }}
                            </el-dropdown-item>
                        </template>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- 语言 -->
            <el-dropdown
                class="header-dropdown"
                placement="bottom-end"
                size="medium"
                trigger="click"
                @command="changeLang"
            >
                <div class="header-r-item lang-icon">
                    <svg-icon icon-class="language" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <template v-for="locale in availableLocales" :key="`locale-${locale}`">
                            <el-dropdown-item :command="locale" :disabled="langIndex === locale">
                                {{ langSetting[locale] }}
                            </el-dropdown-item>
                        </template>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- 头像 -->
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
                        <el-dropdown-item :command="0" icon="el-icon-user">
                            {{ $t("header.personCenter") }}
                        </el-dropdown-item>
                        <el-dropdown-item :command="1" icon="np-icon-shouye1">
                            {{ $t("header.dashboard") }}
                        </el-dropdown-item>
                        <el-dropdown-item :command="2" icon="np-icon-lianjie">
                            {{ $t("header.projectAddress") }}
                        </el-dropdown-item>
                        <el-dropdown-item :command="4" icon="np-icon-Vue" divided>Vue 3.0</el-dropdown-item>
                        <el-dropdown-item :command="5" icon="np-icon-typescript">TypeScript</el-dropdown-item>
                        <el-dropdown-item :command="6" icon="el-icon-eleme">Element Plus</el-dropdown-item>
                        <el-dropdown-item :command="7" icon="np-icon-scss">Scss</el-dropdown-item>
                        <el-dropdown-item :command="3" icon="np-icon-tuichudenglu" divided>
                            {{ $t("header.logOut") }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, getCurrentInstance, ComponentInternalInstance } from "vue";
import Collapse from "./components/Collapse.vue";
import Screenfull from "./components/Screenfull.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import HeaderMenu from "./components/HeaderMenu.vue";
import Aside from "./Aside.vue";
import Search from "./components/Search.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { openWindow } from "@/util";
import { useI18n } from "vue-i18n";
import { availableLocales, langSetting } from "@/lang";
import mitter from "@/plugins/mitt";
import { successMessage } from "@/util/message";
import { globalColor } from "@/config";
import { useLocation } from "@/hooks";

export default defineComponent({
    setup() {
        const store = useStore(),
            // route = useRoute(),
            router = useRouter(),
            app = getCurrentInstance() as ComponentInternalInstance;

        const { locale } = useI18n();

        const langIndex = computed<string>(() => store.getters["setting/lang"]),
            layoutSize = computed<string>(() => store.getters["setting/layoutSize"]),
            headerMenu = useLocation({
                name: "global-setting-headerMenu",
                value: false,
                isWatch: true,
                storage: "session",
            }),
            navType = useLocation({
                name: "global-setting-navType",
                value: "side",
                isWatch: true,
            });

        const changeLayoutSize = (e: string) => {
            app.appContext.config.globalProperties.$ELEMENT.size = e;
            successMessage("Switch Size Success");
            store.dispatch("setting/SET_LAYOUTSIZE", e);
            window.location.reload();
            // 页面被keepAlive 缓存下来 无法更新页面 需要强制刷新页面
            // router.replace({
            //     path: "/redirect" + route.fullPath,
            // });
        };

        const changeLang = (e: string) => {
            locale.value = e;
            store.dispatch("setting/SET_LANG", e);
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
                    store.dispatch("user/LOGIN_OUT");
                    store.dispatch("tabs/INIT_TABS");
                    router.push("/login");
                    break;
                case 4:
                    openWindow("https://www.vue3js.cn/docs/zh/");
                    break;
                case 5:
                    openWindow("https://www.tslang.cn/");
                    break;
                case 6:
                    openWindow("https://element-plus.gitee.io/#/zh-CN/component/installation");
                    break;
                case 7:
                    openWindow("https://www.sass.hk/");
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

        const headerBColor = computed(() => {
            return ["top"].includes(navType.value) ? globalColor.asideBColor : globalColor.headerBColor;
        });

        const headerComColor = computed(() => {
            return ["top"].includes(navType.value) ? "#fff" : "rgba(0, 0, 0, 0.65)";
        });

        const headerItemHover = computed(() => {
            return ["top"].includes(navType.value) ? globalColor.headerHColor : "rgba(0, 0, 0, 0.025)";
        });

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
            changeLang,
            handleCommand,
            messageNum,
            screenfull,
            langSetting,
            availableLocales,
            layoutSize,
            changeLayoutSize,
            headerMenu,
            navType,
            headerBColor,
            headerComColor,
            headerItemHover,
            headerTColor: ref(globalColor.headerTColor),
            headerHColor: ref(globalColor.headerHColor),
        };
    },
    components: {
        Collapse,
        Screenfull,
        Breadcrumb,
        Search,
        HeaderMenu,
        Aside,
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.header {
    width: 100%;
    height: 100%;
    background-color: v-bind(headerBColor);
    user-select: none;
    color: v-bind(headerComColor) !important;
    a,
    span {
        color: v-bind(headerComColor) !important;
    }
    box-shadow: 0 1px 5px #d6d3d3;
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
        background-color: v-bind(headerItemHover) !important;
    }
}
.fullscreen {
    font-size: 22px;
    color: v-bind(headerComColor) !important;
}
.layout-size {
    font-size: 22px;
    color: v-bind(headerComColor) !important;
}
.lang-icon {
    font-size: 16px;
    color: v-bind(headerComColor) !important;
}
.user-header {
    width: 100%;
    // height: 100%;
}
.user-header i {
    font-size: 13px;
    margin-left: 5px;
    position: relative;
    top: -15px;
    color: v-bind(headerComColor) !important;
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
:deep(.header-dropdown) {
    height: 100%;
}
:deep(.el-badge__content) {
    border: none;
}
</style>
