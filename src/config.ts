/**
 * 页面跳转进度条
 */
const nprogress = {
    easing: "ease", // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载icon
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
};

/**
 * 全局设置
 */
const setting = {
    title: "vue", //title
    showSetting: true, //是否显示setting
    openLogo: true, // 侧边栏 Logo
    openTabs: true, // tabs-view
    logo: require("@imgs/logo.png"),
    logoText: "vue-admin",
};

/**
 * 全局颜色设置
 */
const globalColor = {
    /**
     * header
     */
    headerBColor: "#fff", // 背景色
    headerTColor: "#333", // 文字颜色
    headerHColor: "#263445", // 鼠标移入颜色
    /**
     * aside
     */
    asideBColor: "#304156", // 背景色
    asideTColor: "#BFCBD9", // 文字颜色
    asideATColor: "#1890ff", // 选中文字颜色
    asideNextBColor: "#1f2f3f", // 下级 选中文字颜色
    asideNextAColor: "#001528", // 下级 选中文字颜色
    /**
     * tabs
     */
    tabsBColor: "#FFFFFF", // 默认背景色
    tabsTColor: "#495060", // 默认文字颜色
    tabsAColor: "#304156", // 选中背景色
    tabsATColor: "#FFFFFF", // 选中文字颜色
    tabsBeforKColor: "#FFFFFF", // 固定圆圈背景色
    tabsBeforAColor: "#FFFFFF", // 选中圆圈背景色
    tabsRotate: "el-icon-refresh", // 转圈图标
    /**
     * backtop
     */
    backTopBColor: "#304156", // 背景色
    backTopTColor: "#FFFFFF", // 文字颜色
};

/**
 * 控制 main 是否显示白底(全路径)
 */
const mainStyleList = ["/dashboard", "/personCenter", "/setting/system"];

export { nprogress, setting, mainStyleList, globalColor };
