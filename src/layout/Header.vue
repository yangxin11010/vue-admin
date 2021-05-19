<template>
    <div class="header disflex ju_bt align-it-cen">
        <div class="header-l disflex align-it-cen">
            <Collapse class="header-color"></Collapse>
            <template v-if="!headerMenu">
                <Breadcrumb></Breadcrumb>
            </template>
            <template v-else>
                <HeaderMenu style="margin-left: -10px;"></HeaderMenu>
                <!-- <Aside mode="horizontal"></Aside> -->
            </template>
        </div>
        <div class="header-r disflex ju_bt align-it-cen">
            <!-- 搜索 -->
            <div class="" style="padding: 0;">
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
                        <el-dropdown-item :command="4" icon="el-icon-eleme" divided>Element Plus</el-dropdown-item>
                        <el-dropdown-item :command="3" icon="np-icon-tuichudenglu1" divided>
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
// import Aside from "./Aside.vue";
import Search from "./components/Search.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { openWindow } from "@/util";
import { useI18n } from "vue-i18n";
import { availableLocales, langSetting } from "@/lang";
import mitter from "@/plugins/mitt";
import { successMessage } from "@/util/message";
import { globalColor } from "@/config";
import { session } from "@/util/storage";

export default defineComponent({
    setup() {
        const store = useStore(),
            // route = useRoute(),
            router = useRouter(),
            app = getCurrentInstance() as ComponentInternalInstance;

        const { locale } = useI18n();

        const langIndex = computed<string>(() => store.getters.lang),
            layoutSize = computed<string>(() => store.getters.layoutSize),
            headerMenu = ref(false);

        const changeLayoutSize = (e: string) => {
            app.appContext.config.globalProperties.$ELEMENT.size = e;
            successMessage("Switch Size Success");
            store.dispatch("SET_LAYOUTSIZE", e);
            window.location.reload();
            // 3.0 replace 失效
            // router.replace({
            //     path: "/redirect" + route.fullPath,
            // });
        };

        const changeLang = (e: string) => {
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
                case 4:
                    openWindow("https://element-plus.gitee.io/#/zh-CN/component/installation");
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
            const headerMenuValue: boolean = session.getItem("global-setting-headerMenu");
            headerMenuValue && (headerMenu.value = headerMenuValue);
            mitter.$on("changeHeaderMenu", (value) => {
                headerMenu.value = value;
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
            headerBColor: globalColor.headerBColor,
            headerTColor: globalColor.headerTColor,
            headerHColor: globalColor.headerHColor,
        };
    },
    components: {
        Collapse,
        Screenfull,
        Breadcrumb,
        Search,
        HeaderMenu,
        // Aside
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
    color: rgba(0, 0, 0, 0.65) !important;
    a {
        color: rgba(0, 0, 0, 0.65) !important;
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
        background-color: rgba(0, 0, 0, 0.025) !important;
    }
}
.fullscreen {
    font-size: 22px;
}
.layout-size {
    font-size: 22px;
}
.lang-icon {
    font-size: 16px;
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
