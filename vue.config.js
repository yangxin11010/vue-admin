"use strict";
const path = require("path");

// 获取绝对路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "",
    indexPath: "index.html",
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/css/variables.scss";`,
            },
        },
    },
    devServer: {
        open: false,
    },
    // 链式webpack配置
    chainWebpack: (config) => {
        // svg规则配置，排除icons目录
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
        // 新增icons规则，设置svg-sprite-loader
        config.module
            .rule("icons") // 创建规则 ‘icons’
            .test(/\.svg$/) // 检测的具体目录
            .include.add(resolve("src/icons")) // 只考虑‘src/assets/icons’目录下
            .end()
            .use("svg-sprite-loader") // 运用
            .loader("svg-sprite-loader") // 指定loader
            .options({ symbolId: "icon-[name]" }); // 选项配置，将来使用图标的名称, 例：icon-qq
        // 路径配置
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@imgs", resolve("src/assets/images"))
    },
};
