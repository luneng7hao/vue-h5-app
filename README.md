# vue3.0-h5-app

# 基于 vue3.0+vant 搭建 H5 框架

# 包含了 vue3.0 的初学知识

### 一、Vue 3 项目，安装 Vant 3.x 版本：

npm i vant@next -S

### 二、配置 vant 自动按需引入：

npm i -D ts-import-plugin
然后在 vue.config.js 中加入

```
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: name => `${name}/style/less`//按需引入样式文件
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  }
};
```

在 main.js 中就可以直接使用了
import { Button } from 'vant';
Vue.use(Button);

### 三、移动端布局之 postcss-px-to-viewport（兼容 vant）：

npm i postcss-px-to-viewport -D
1、在项目根目录下添加.postcssrc.js 文件
2、添加如下配置：

```
module.exports = {
 plugins: {
   autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
   "postcss-px-to-viewport": {
     unitToConvert: "px", // 要转化的单位
     viewportWidth: 750, // UI设计稿的宽度
     unitPrecision: 6, // 转换后的精度，即小数点位数
     propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
     viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
     fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
     selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
     minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
     mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
     replace: true, // 是否转换后直接更换属性值
     exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
     landscape: false // 是否处理横屏情况
   }
 }
};

```

3、 Vant 关于 viewport 的适配方案，在 vue.config.js 添加配置

```
const pxtoviewport = require("postcss-px-to-viewport");
const autoprefixer = require("autoprefixer");
 css: {
    loaderOptions: {
      //配置路vw vm适配
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  }
```

3、 vant 团队的是根据 375px 的设计稿去做的，理想视口宽度为 375px。但是在开发 H5-APP 时，UI 稿可能是按照 750px 去做的。

改写.postcssrc.js 文件配置如下：

```
const path = require('path');

module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;

  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: designWidth,
        unitPrecision: 6,
        propList: ["*"],
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  }

}

```

### 四、配置 vant 定制主题样式：

在 vue.config.js 添加如下代码

```
 css: {
    loaderOptions: {
      //配置less主题
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#111",
            "border-color": "#eee",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/theme/var.less";`
          }
        }
      },

```

### 五、项目中 registerServiceWorker 的说明

registerServiceWorker 就是为 vue 项目注册了一个 service worker，用来做资源的缓存，这样你下次访问时，就可以更快的获取资源。而且因为资源被缓存，所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。
但有一点要注意，registerServiceWorker 注册的 service worker 只在生产环境中生效（process.env.NODE_ENV === 'production'），所以开发的时候，可以注释掉。
或者，在生产环境中，也可以选择使用或者不适用这个功能

### 六、Tree-shaking，用于消除项目中一些不必要的代码（打包时生效）

1、可能出现问题
打包后自动去除.css 文件
2、配置 package.json
"sideEffects": ["*.css"] 这样配置就会忽略 css 文件的处理

### 七、对 element-ui 等第三方组件，生成独立的 js 文件；对 components 中组件生成独立的 js 文件；以及构建的其他组件生成独立的 js 文件

此方法，避免打包生成的 chunk-vendors.d6278167.js 文件过大
在 vue.config.js 中配置

```
config.when(process.env.NODE_ENV !== 'development', config => {
     config.optimization.splitChunks({
       chunks: 'all',
       cacheGroups: {
         libs: {
           name: 'chunk-libs',
           test: /[\\/]node_modules[\\/]/,
           priority: 10,
           chunks: 'initial'
         },
         elementUI: {
           name: 'chunk-elementUI',
           priority: 20,
           test: /[\\/]node_modules[\\/]_?element-ui(.*)/
         },
         commons: {
           name: 'chunk-commons',
           test: path.resolve(__dirname, 'src/components'),
           minChunks: 3,
           priority: 5,
           reuseExistingChunk: true
         }
       }
     })
     config.optimization.runtimeChunk('single')
   })

```

### 八、查看打包文件的目录结构，生成 report 报告

在 package.json 添加配置
"scripts": {
"report": "vue-cli-service build --report"
}
执行脚本命令 npm run report
然后打开打包文件目录下的 report.html 页面，查看打包的文件，并根据报告进行优化

### 九、eslint + prettier 代码格式化

1、使用单引号，代码段末尾不加分号
2、项目根目录新建.prettierrc 文件
3、在文件中填写一下代码

```
{
  "semi":false,
  "singleQuote":true
}
```

4、执行 npm run lint ，对各文件格式化处理

### 十、使用 require()函数，会提示格式化错误警告

1、可在.eslintrc.js 文件中配置，忽略此错误警告
rules: {
'@typescript-eslint/no-var-requires': 0
}
2、如果有其他的警告，想忽略掉，可仿照上述配置进行添加。

### 十一、Vue3 的钩子函数

vue3 生命周期函数与 vue2 做了比较
vue3 也新增了部分钩子函数
参照 LifeCycle.vue

### 十二、ref 与 reactive

两者只是使用方式上不同
参照 LifeCycle.vue

### 十三、hooks 函数

与 vue2 中的 mixins 类似，但是 vue3 做了升级，使用起来更方便。
本例中，我们封装了一个函数，在函数中我们可以使 vue3 的钩子函数。这在 vue2 时是做不到的。
参照 Hooks.vue

### 十四、vue3 新增的特性 Teleport

Teleport 方法，可以把 Dialog 组件渲染到你任意想渲染的外部 Dom 上，不必嵌套再#app 里了，这样的话样式不会发生冲突了
1、在/public/index.html 中，新建一个与 app 同级的 div
...

 <div id="app"></div>
  <div id="modal"></div>
  ....
2、参照Teleport.vue 编写

### 十五、首屏动画,解决白屏现象

作为单页面应用，初次加载应用时，一般会出现白屏的现象。
本次，我们在/public/index.html 中，使用 css3 添加一个加载中的动画，来解决白屏现象.

```
<style>
    html,
    body,
    #app {
      height: 100%;
      margin: 0px;
      padding: 0px;
    }

    .chromeframe {
      margin: 0.2em 0;
      background: #ccc;
      color: #000;
      padding: 0.2em 0;
    }

    #loader-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
    }

    #loader {
      display: block;
      position: relative;
      left: 50%;
      top: 50%;
      width: 150px;
      height: 150px;
      margin: -75px 0 0 -75px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #FFF;
      -webkit-animation: spin 2s linear infinite;
      -ms-animation: spin 2s linear infinite;
      -moz-animation: spin 2s linear infinite;
      -o-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
      z-index: 1001;
    }

    #loader:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #FFF;
      -webkit-animation: spin 3s linear infinite;
      -moz-animation: spin 3s linear infinite;
      -o-animation: spin 3s linear infinite;
      -ms-animation: spin 3s linear infinite;
      animation: spin 3s linear infinite;
    }

    #loader:after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #FFF;
      -moz-animation: spin 1.5s linear infinite;
      -o-animation: spin 1.5s linear infinite;
      -ms-animation: spin 1.5s linear infinite;
      -webkit-animation: spin 1.5s linear infinite;
      animation: spin 1.5s linear infinite;
    }


    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }


    #loader-wrapper .loader-section {
      position: fixed;
      top: 0;
      width: 51%;
      height: 100%;
      background: #7171C6;
      z-index: 1000;
      -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
      transform: translateX(0);
    }

    #loader-wrapper .loader-section.section-left {
      left: 0;
    }

    #loader-wrapper .loader-section.section-right {
      right: 0;
    }


    .loaded #loader-wrapper .loader-section.section-left {
      -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
      -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
      transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
    }

    .loaded #loader-wrapper .loader-section.section-right {
      -webkit-transform: translateX(100%);
      -ms-transform: translateX(100%);
      transform: translateX(100%);
      -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
      transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
    }

    .loaded #loader {
      opacity: 0;
      -webkit-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
    }

    .loaded #loader-wrapper {
      visibility: hidden;
      -webkit-transform: translateY(-100%);
      -ms-transform: translateY(-100%);
      transform: translateY(-100%);
      -webkit-transition: all 0.3s 1s ease-out;
      transition: all 0.3s 1s ease-out;
    }

    .no-js #loader-wrapper {
      display: none;
    }

    .no-js h1 {
      color: #222222;
    }

    #loader-wrapper .load_title {
      font-family: 'Open Sans';
      color: #FFF;
      font-size: 19px;
      width: 100%;
      text-align: center;
      z-index: 9999999999999;
      position: absolute;
      top: 62%;
      opacity: 1;
      line-height: 30px;
    }

    #loader-wrapper .load_title span {
      font-weight: normal;
      font-style: italic;
      font-size: 13px;
      color: #FFF;
      opacity: 0.5;
    }
  </style>
  ... ...
  <div id="app">
   <div id="loader-wrapper">
      <div id="loader"></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
      <div class="load_title">正在加载,请耐心等待</div>
    </div>
  </div>

```

### 十六、keep-alive 的使用

1、include 数组中的值，为组件的 name 值。可参见 Store.vue 或 About 组件
2、如果不使用 include，则所有组件都缓存
3、使用方式在 APP.vue 页面中

```
<router-view v-slot="{ Component }">
    <!-- 缓存页面 -->
    <keep-alive :include="['Store', 'About', 'Suspense']">
      <component :is="Component" />
    </keep-alive>
  </router-view>

```

### 十七、 Suspense 异步请求组件

1、在前端开发中，异步请求组件必不可少。比如读取远程图片，比如调用后台接口，这些都需要异步请求。
Vue3.x 中给我们提供了 Supense 组件。
2、使用方式参见 components/Suspense
可以看到 Suspense 是有两个 template 插槽的，第一个 default 代表异步请求完成后，显示的模板内容。fallback 代表在加载中时，显示的模板内容。
3、在该例中，我们结合了 keep-alive
4、如果不使用 keep-alive，则会发现，每次打开 Suspense,页面都会重新加载一次。

### 十八、computed、methods、watch 说明

本节插入 vue2 的知识点(vue2 的钩子函数，在 vue3 中同样可用)
1、watch 中监听对象
监听对象时，只要对象的任一属性发生变化，都会被监听损耗性能。
里面的 deep 设为了 true，这样的话，如果修改了这个 blog 中的任何一个属性，都会执行 handler 这个方法。不过这样会造成更多的性能开销，尤其是对象里面属性过多，结构嵌套过深的时候。

```
watch: {
 blog:{
   handler(newVal,oldVal){
     console.log(`new: ${newVal}, old: ${oldVal}`);
   },
   deep:true
 }

```

2、watch 监听对象的属性
可根据现实场景监听对象的特定属性，这样不造成过多的性能消耗。方法如下：

```
 watch: {
    'project.currentStage'(val) {
      //todo something
    }
  }

```

3、computed 与 methods 比较
某些场景下，computed 如果频繁执行，则使用 methods 函数更优，具体情况具体分析。
区别：
计算属性有缓存，计算属性会把函数执行一次，把结果存起来，依赖的值改变，会重新赋值；
函数是每次模板编译都会执行。只要有响应式属性值改变，视图刷新，函数就执行。

### 十九、 provide 与 inject

1、组件之间的通信可以通过 props 和\$emit 的方式进行通信，但是如果组件之间的关系非常复杂的话，父子组件之间嵌套层数太多，通过以上的方式会很麻烦，代码的可阅读性会很差
2、父组件通过 provide 提供数据，其他组价可以使用 inject 注入数据。
3、provide 与 inject 需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
4、使用案例参见 components/ProvideInject
