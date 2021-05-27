module.exports = {
    env: {
        development: {
            plugins: ["dynamic-import-node"],
        },
    },
    presets: ["@vue/cli-plugin-babel/preset"],
    // plugins: [
    //     [
    //         "import",
    //         {
    //             libraryName: "element-plus",
    //             customStyleName: (name) => {
    //                 name = name.slice(3);
    //                 return `element-plus/packages/theme-chalk/src/${name}.scss`;
    //             },
    //         },
    //     ],
    // ],
};
