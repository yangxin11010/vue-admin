# vue-admin

## Project setup

```
cd vue-admin

npm install
或
yarn / yarn add
```

### run

```
npm run dev
或
yarn dev
```

### build for development

```
npm run build-dev
```

### build for production

```
npm run build
```

### config.ts

`nprogress`

| attribute    | default | desc                 |
| ------------ | ------- | -------------------- |
| easing       | ease    | 动画方式             |
| speed        | 500     | 递增进度条的速度     |
| showSpinner  | false   | 是否显示加载 icon    |
| trickleSpeed | 200     | 自动递增间隔         |
| minimum      | 0.3     | 初始化时的最小百分比 |

`setting`

| attribute   | default                     | desc             |
| ----------- | --------------------------- | ---------------- |
| title       | vue                         | title            |
| showSetting | true                        | 是否显示 setting |
| openLogo    | true                        | 侧边栏 Logo      |
| openTabs    | true                        | tabs-view        |
| logo        | `require("@imgs/logo.png")` | 图标             |
| logoText    | vue-admin                   | 图标标题         |

`globalColor`

| type    | attribute       | default | desc           |
| ------- | --------------- | ------- | -------------- |
| header  | headerBColor    | #304156 | 背景色         |
| header  | headerTColor    | #FFFFFF | 文字颜色       |
| header  | headerHColor    | #263445 | 鼠标移入颜色   |
| aside   | asideBColor     | #304156 | 背景色         |
| aside   | asideTColor     | #BFCBD9 | 文字颜色       |
| aside   | asideATColor    | #1890ff | 选中文字颜色   |
| aside   | asideNextBColor | #1f2f3f | 选中文字颜色   |
| aside   | asideNextAColor | #001528 | 选中文字颜色   |
| tabs    | tabsBColor      | #FFFFFF | 默认背景色     |
| tabs    | tabsTColor      | #495060 | 默认文字颜色   |
| tabs    | tabsAColor      | #304156 | 选中背景色     |
| tabs    | tabsATColor     | #FFFFFF | 选中文字颜色   |
| tabs    | tabsBeforKColor | #FFFFFF | 固定圆圈背景色 |
| tabs    | tabsBeforAColor | #FFFFFF | 选中圆圈背景色 |
| backtop | backTopBColor   | #304156 | 背景色         |
| backtop | backTopTColor   | #FFFFFF | 文字颜色       |

`mainStyleList`

path(控制 main 是否显示白底(全路径))
