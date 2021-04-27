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
};

// 控制 main 是否显示白底
const mainStyleList = ["/dashboard", "/personCenter", "/setting/system"];

export { nprogress, setting, mainStyleList };
