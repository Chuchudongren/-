# Webpack 静态资源打包工具

打包工具能压缩代码，做兼容性处理，提升代码性能

**开发模式 **只能编译 JS 中的 ES Module 语法

**生产模式** 能编译 JS 中的 ES Module 语法，还能压缩 JS 代码

初始化一个包描述文件

```powershell
npm init -y
```

查看 npm 源地址

```powershell
config get registry
```

打包为开发模式

npx webpack 指的是 运行本地的 webpack

```powershell
npx webpack ./src/main.js --mode=development
```

开发模式下，仅能编译 ES 的模块化语法，不能编译其他语法

打包为生产环境

```powershell
npx webpack ./src/main.js --mode=production
```

### 配置

#### 1、entry 入口

指示 Webpack 从哪个文件开始打包

#### 2、output 输出

指示 Webpack 打包完的文件输出到哪里去，如何命名

#### 3、loader 加载器

webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader 才能解析

#### 4、plugins 插件

扩展 Webpack 的功能

#### 5、mode 模式

两种模式：

开发模式：development

生产模式：production

### webpack 配置文件

所有的配置文件最终都是在 Node.js 中运行的，所以采用的模块化都是 CommonJS

```js
const path = require('path') //node.js的核心模块，专门处理路径问题的
module.eports = {
  // 入口
  entry: './src/main.js', //相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname  是node.js的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, 'dist'), //绝对路径
    // 文件名
    filename: 'main.js'
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
    ]
  },
  // 插件
  plugins: [
    //plugins的配置
  ],
  // 模式
  mode: 'development'
}
```

这是基本配置 直接运行 npx webpack ，会从目录中寻找 webpack.config.js 配置文件，加载配置

```powershell
npx webpack
```

### 开发模式

在这个模式下我们主要做两件事：

1、编译代码，使浏览器能识别运行

webpack 默认不能处理 样式资源、字体图标、图片资源、html 资源等，需要加载配置

2、代码质量检测，树立代码规范

提前检查代码的一些隐患，让代码运行时更加健壮

提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观

#### 处理样式资源

Css、Less、Sass、Scss、Stylus

##### 处理 css

如果要使用 css-loader，你需要安装 webpack@5

首先，你需要先安装 `css-loader`：

```console
npm install --save-dev css-loader
npm install --save-dev style-loader
```

然后把 loader 引用到你 `webpack` 的配置中

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

然后运行 `webpack`。

##### 处理 less

首先，你需要先安装 `less` 和 `less-loader`：

```console
npm install less less-loader --save-dev
css-loader  //这两个包也得引入
style-loader
```

然后将该 loader 添加到 `webpack` 的配置中去

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}
```

运行 `webpack`

##### 处理 Sass 和 Scss 资源

首先需要安装 `sass-loader`：

```console
npm install sass-loader sass --save-dev
style-loader  //需要这两个包
css-loader
```

> 将 `sass-loader` 、css-loader 与 style-loader 进行链式调用，可以将样式以 style 标签的形式插入 DOM 中，或者使用 mini-css-extract-plugin 将样式输出到独立的文件中。

然后将本 loader 添加到你的 Webpack 配置中。例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader' // 将 Sass 编译成 CSS
        ]
      }
    ]
  }
}
```

运行 `webpack`

##### 处理 Styl Stylus

首先，你需要安装 `stylus` 和 `stylus-loader`：

```console
$ npm install stylus stylus-loader --save-dev
```

然后将该 loader 添加到 `webpack` 配置中。例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'stylus-loader' // 将 Stylus 文件编译为 CSS
        ]
      }
    ]
  }
}
```

运行 `webpack`

##### 处理图片

在过去的 Webpack4 时，处理图片资源通过 file-loader 和 url-loader 进行处理

现在 Webpack5 已经将两个 loader 功能内置到 webpack 里

```js
{
    test: /\.(png|jpe?g|gif|webp|svg)$/,
    type: "asset",
    parser: {
        dataUrlCondition: {
            // 小于10kb的图片转base64
            // 优点：减少请求次数  缺点，体积会增大
            maxSize: 4 * 1024,//4kb
        },
    }
},
```

##### 调整输出位置

filename: "js/main.js" 这个是入口文件的打包输出文件名

```js
 output: {
        // 文件的输出路径
        // __dirname  是node.js的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"), //绝对路径
        // 开发环境没有输出，可以是undefined
        // path: undefined,
        // 入口文件打包输出文件名
        filename: "static/js/main.js"
}
```

设置图片的输出位置

generator 属性添加一个 filename

```js
{
    test: /\.(png|jpe?g|gif|webp|svg)$/,
    type: "asset",
    parser: {
        dataUrlCondition: {
            // 小于10kb的图片转base64
            // 优点：减少请求次数  缺点，体积会增大
            maxSize: 4 * 1024,//4kb
        },
    },
    generator: {
        filename: "static/images/[hash:10][ext][query]",
            // hash: 10 代表hash值只取前十位 ext 是文件扩展名 query是携带的其他参数
    }
},
```

##### 设置清空上次打包的内容
clean:true,

```js
 output: {
        // 文件的输出路径
        // __dirname  是node.js的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"), //绝对路径
        // 入口文件打包输出文件名
        filename: "static/js/main.js"
        // 自动清空上次打包的内容
        // 原理： 在打包前，将path整个清空再进行打包
        clean:true, //后面配置开发服务器，没有输出，所以这里写不写没有意义
    },
```

##### 处理字体图标

```js
 {
    test: /\.(ttf|woff2?)$/,
    type: "asset/resource", //只会对文件原格式进行输出
    generator: {
        filename: "static/media/[hash:10][ext][query]",
        // hash: 10 代表hash值只取十位 ext 是文件扩展名 query是携带的其他参数
    }
},
```

##### 处理音视频资源

加到字体图标的类型里面，不需要转换格式
test: /\.(ttf|woff2?|mp3|mp4|avi )\$/,

##### 处理 js 资源

webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能再 IE 等浏览器运行，需要做一些兼容性处理

开发中，团队对代码格式是有严格要求的，我们不能用肉眼去检测代码格式，需要使用专业的工具来检测

**针对 js 兼容性，我们使用 Babel 来完成**
**针对代码格式，我们使用 Eslint 来完成**
先完成 Eslint，检测代码格式无误之后，再由 Babel 做代码兼容性处理

##### Eslint

可组装的**JavaScript**和**JSX**检查工具，可以配置各项功能
我们使用 Eslint，关键是 Eslint 配置文件，里面写了各种 rules 规则， 将来运行 Eslint 时就会以写的规则对代码进行检查
**配置文件**
1、 `.eslintrc.*`: 新建文件，位于项目根目录
`.eslintrc`
`.eslintrc.js`
`.eslintrs.json`
区别在于配置格式不一样
2、 `package.json` 中 `eslintConfig` : 不需要创建文件，在原有文件基础上写

`.eslintrc.js`

```js
module.exports = {
  //解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: 'module', //ES模块化
    ecmaFeatures: {
      // ES 其他特性
      jsx: true //如果是 React 项目，需要开启 jsx 语法
    }
  },
  // 继承其他规则
  extends: []
  // ...
}
```

**rules**具体规则
`"off"` 或 `0` 关闭规则
`"warn"` 或 `1` 开启规则，使用警告级别的错误：`warn`不会导致程序退出
`"error"` 或 `2` 开启规则，使用错误级别的错误：`error` 当触发的时候，程序会退出
**例子**

```js
rules:{
  semi:"error", //禁止使用分号
  'array-callback-return':'warn', //强制数组方法的回调函数中有 return 语句，否则警告
  'default-case': [
    'warn', //要求 switch 语句中 default分支，否则警告
    {commentPattern:'^no default$'} //允许在最后注释 no default，就不会有警告了
  ],
  eqeqeq:[
    'warn', //强制使用 === 和 !== ，否则警告
    'smart' //https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
  ],
}
```

规则文档 https://eslint.bootcss.com/docs/rules/

**extends** 继承
使用`"extends":"eslint:recommended"`来启用推荐的规则

```js
module.exports = {
  extends: ['react-app'], //继承一个规则
  rules: {
    //我们的规则会覆盖掉react-app的规则
    eqeqeq: ['warn', 'smart']
  }
}
```

##### 使用 Eslint

eslint-webpack-plugin 3.0 仅支持 webpack 5。对于 webpack 4 请查看 2.x 分支
该插件使用 eslint 来查找和修复 JavaScript 代码中的问题。

安装 eslint-webpack-plugin

```powershell
npm install eslint-webpack-plugin --save-dev
```

注意: 如果未安装 eslint >= 7 ，你还需先通过 npm 安装：

```powershell
npm install eslint --save-dev
```

然后把插件添加到你的 webpack 配置。例如：

```js
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)]
  // ...
}
```

**.eslintrc.js**

```js
module.exports = {
  // 继承 Eslint 规则
  extend: ['eslint:recommended'],
  env: {
    node: true, // 启用node中全局变量
    browser: true //启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6, //es6
    sourceType: 'module' //es module
  },
  rules: {
    'no-var': 2 //不能使用var定义变量
  }
}
```

**.eslintignore** eslint 忽略文件

##### Babel

主要将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
**配置文件**
1、 `babel.config.*`
`babel.config.js` (Y)
`babel.config.json`
2、 `.babelrc.*`
`.babelrc`
`.babelrc.js`
`.babelrc.json`
3、 `package.json`中的`babel`
**具体配置**
`babel.config.js`

```js
module.exports = {
  // 预设
  presets: []
}
```

**persets**预设 就是一组 Babel 插件，扩展 Babel 功能
`@babel/preset-env` 一个智能预设，允许使用最新的 JavaScript
`@babel/preset-react` 一个用来编译 React jsx 语法的预设
`@babel/preset-typescript` 一个用来编译 TypeScript 语法的预设
**在 webpack 中使用**
下载包
webpack 4.x | babel-loader 8.x | babel 7.x

```powershell
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

在 webpack 配置对象中，需要将 babel-loader 添加到 module 列表中

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/, //排除node_modules中的js文件不处理
      loader: 'babel-loader'
      // options: {
      //     presets: ['@babel/preset-env']
      // }
    }
  ]
}
```

设置**babel.config.js**

```js
module.exports = {
  // 智能预设 能够编译ES6语法
  presets: ['@babel/preset-env']
}
```

##### 处理 HTML 资源

**HtmlWebpackPlugin**
HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。这对于那些文件名中包含哈希值，并且哈希值会随着每次编译而改变的 webpack 包特别有用。你可以让该插件为你生成一个 HTML 文件，使用 lodash 模板提供模板，或者使用你自己的 loader。

安装

```powershell
npm install --save-dev html-webpack-plugin
```

该插件将为你生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle。 只需添加该插件到你的 webpack 配置中

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      //模板： 以 public/index.html 文件为模板创建新的html文件
      // 新的html文件特点： 1、结构和原来一致。2、自动引入打包输出资源
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
```

##### 开发服务器&自动化

**下载包**

```powershell
npm i webpack-dev-server -D
```

**配置**

```js
module.exports = {
  //开发服务器： 不会输出资源（不会在dish生成文件），是在内存中编译打包的
  devServer: {
    host: 'localhost', //启动服务器域名
    port: '3000', //启动服务器端口号
    open: true //是否自动打开浏览器
  }
}
```

**启动**

```powershell
npx webpack serve
```

####生产模式
调整了 webpack.config.js 的位置，分成开发模式和生产模式两种配置
对 webpack.dev.js 修改：
output 中的输入 path，由于是开发环境没有输出，可以是 undefined

```js
 output: {
        // 文件的输出路径
        // 开发环境没有输出，可以是undefined
        path: undefined,
        // 入口文件打包输出文件名
        filename: "static/js/main.js"
    },
```

相对路径不需要变化，
需要将所有的绝对路径，退一级`path.resolve(__dirname, "../src")`

**运行**指令

```powershell
npx webpack serve --config ./config/webpack.dev.js
```

**生产模式**
生产模式需要有输出
生产模式不需要`devServer`
生产模式将`mode`改为`mode: "production",`

**设置指令**
开发环境直接 `npm start`，生产环境运行 `npm run build`

```json
"scripts": {
  "start":"npm run dev",
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack serve --config ./config/webpack.dev.js",
  "build": "webpack --config ./config/webpack.prod.js"
},
```

##### 生产模式下 css 处理

Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式，会造成闪屏效果。
单独打包 Css 文件，通过 link 标签加载性能才更好
本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
本插件基于 webpack v5 的新特性构建，并且需要 webpack 5 才能正常工作。
与 extract-text-webpack-plugin 相比：
异步加载
没有重复的编译（性能）
更容易使用
特别针对 CSS 开发
**下载包**

```powershell
npm install --save-dev mini-css-extract-plugin
```

**配置**webpack.config.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 将所有用到"style-loader"的地方改为MiniCssExtractPlugin.loader
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
}
```

##### 生产环境中 css 兼容性处理

安装包

```powershell
npm i postcss-loader postcss postcss-preset-env -D
```

配置
需要在样式的配置中添加
在 css-loader 的后面 其他的前面，位置不能写错

```js
{
    test: /\.css$/, //只检测.css 文件
    use: [
        // 执行顺序，先从左到右，再从下到上
        MiniCssExtractPlugin.loader, //提取css成单独的文件
        "css-loader", //将css资源编译成commonjs的模块到js中
        {
            loader:"postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
    ],
},
```

需要在 `package.json` 中告诉兼容性要做到哪种程度
`last 2 version` 浏览器只取最近两个版本
`> 1%` 覆盖 99%的浏览器
`not dead` 有些浏览器已经死了，不要了

```json
"borwserslist":[
  "last 2 version","> 1%","not dead"
]
```

##### 封装样式 loader 函数

```js
//用来获取处理样式的loader
function getStyleLoader (pre) {
  return [
    // 执行顺序，先从左到右，再从下到上
    MiniCssExtractPlugin.loader, //提取css成单独的文件
    'css-loader', //将css资源编译成commonjs的模块到js中
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          'postcss-preset-env' // 能解决大多数样式的兼容性问题
        ]
      },
      pre
    }
  ].filter(Boolean)
}

/* 
{
    test: /\.less$/,
    use: getStyleLoader("less-loader"),
},
*/
```

##### css 压缩

CssMinimizerWebpackPlugin
这个插件使用 cssnano 优化和压缩 CSS。
**安装**

```powershell
npm install css-minimizer-webpack-plugin --save-dev
```

在 webpack 配置中加入该插件

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin(), new CssMinimizerPlugin()]
}
```

##### html 压缩 js 压缩

默认生产模式已经开启 html 压缩和 js 压缩 不需要进行额外的配置

###webpack5 高级配置
对 webpack 进行优化，让我们在代码编译/运行时性能更好
1、提升开发体验
2、提升打包构建速度
3、减少代码体积
4、优化代码运行性能

#### 提升开发体验

##### SourceMap

开发时代码是经过编译的，所有的 css 和 js 合并成一个文件，多了其他代码，如果运行出错，提示错误在哪里位置容易混乱。
**SourceMap**(源代码映射) 是一个用来生成源代码与构建后代码——映射的文件的方案
它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行，每一列的映射关系，当构建后代码出错了，会通过 xxx.map 文件，从构建后代出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助更快的找到错误根源
**实际开发中只关注两种情况**
**开发模式** `cheap-module-source-map`
打包编译速度快，只包含行映射，没有列映射

```js
module.exports = {
  // 其他省略
  mode: 'development',
  devtool: 'cheap-module-source-map'
}
```

**生产模式** `source-map`
包含行映射、列映射，打包编译速度更慢

```js
module.exports = {
  // 其他省略
  mode: 'development',
  devtool: 'source-map'
}
```
