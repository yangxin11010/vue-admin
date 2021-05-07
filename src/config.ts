// 页面跳转进度条
const nprogress = {
    easing: "ease", // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
};

// 全局设置
const setting = {
    title: "vue", //title
    showSetting: true, //是否显示setting
    openLogo: true, // 侧边栏 Logo
    openTabs: true, // tabs-view
    logo: require("@imgs/logo.png"),
    logoText: "vue-admin",
};

const globalColor = {
    headerBColor: "#304156", //header 背景色
    headerTColor: "#FFFFFF", //header 文字颜色
    headerHColor: "#263445", //header 鼠标移入颜色
    asideBColor: "#304156", //左导航 背景色
    asideTColor: "#BFCBD9", //左导航 文字颜色
    asideATColor: "#1890ff", //左导航 选中文字颜色
    asideNextBColor: "#1f2f3f", //左导航 选中文字颜色
    asideNextAColor: "#001528", //左导航 选中文字颜色
    tabsBColor: "#FFFFFF", //tabs 默认背景色
    tabsTColor: "#495060", //tabs 默认文字颜色
    tabsAColor: "#304156", //tabs 选中背景色
    tabsATColor: "#FFFFFF", //tabs 选中文字颜色
    tabsBeforKColor: "#FFFFFF", //tabs 固定圆圈背景色
    tabsBeforAColor: "#FFFFFF", //tabs 选中圆圈背景色
};

// 控制 main 是否显示白底
const mainStyleList = ["/dashboard", "/personCenter", "/setting/system"];

export { nprogress, setting, mainStyleList, globalColor };
