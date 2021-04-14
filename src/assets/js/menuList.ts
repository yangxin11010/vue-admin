export default [
    {
        menuId: 1,
        title: "首页",
        path: "/dashboard",
        icon: "el-icon-s-home",
        parentMenuId: null,
        isEdit: false,
        status: 1,
        children: [],
    },
    {
        menuId: 2,
        title: "图标",
        path: "/svg",
        icon: "np-icon-icon",
        parentMenuId: null,
        isEdit: false,
        status: 1,
        children: [],
    },

    {
        menuId: 3,
        title: "Clipboard",
        path: "/clipboard",
        icon: "np-icon-fuzhi",
        parentMenuId: null,
        isEdit: false,
        status: 1,
        children: [],
    },
    {
        menuId: 4,
        title: "导出 File",
        path: "/exportFile",
        icon: "np-icon-file",
        parentMenuId: null,
        isEdit: false,
        status: 1,
        children: [],
    },
    {
        menuId: 11,
        title: "组件",
        path: "/components",
        icon: "el-icon-menu",
        parentMenuId: null,
        isEdit: false,
        status: 1,
        children: [
            {
                menuId: 9,
                title: "富文本编辑器",
                path: "/tinymce",
                icon: "",
                parentMenuId: 11,
                isEdit: false,
                status: 1,
                children: [],
            },
        ],
    },
    {
        menuId: 5,
        title: "错误页面",
        path: "/error",
        icon: "el-icon-warning-outline",
        parentMenuId: null,
        isEdit: false,
        status: 1,
        children: [
            {
                menuId: 7,
                title: "404",
                path: "/notFound",
                icon: "",
                parentMenuId: 5,
                isEdit: false,
                status: 1,
                children: [],
            },
            {
                menuId: 8,
                title: "401",
                path: "/notPermission",
                icon: "",
                parentMenuId: 5,
                isEdit: false,
                status: 1,
                children: [],
            },
        ],
    },
    {
        menuId: 6,
        title: "设置",
        path: "/setting",
        icon: "el-icon-s-tools",
        parentMenuId: null,
        isEdit: false,
        status: 1,
        children: [
            {
                menuId: 9,
                title: "系统设置",
                path: "/system",
                icon: "",
                parentMenuId: 6,
                isEdit: false,
                status: 1,
                children: [],
            },
            {
                menuId: 10,
                title: "菜单管理",
                path: "/menu",
                icon: "",
                parentMenuId: 6,
                isEdit: false,
                status: 1,
                children: [],
            },
        ],
    },
];
