const path = require('path') //node.js的核心模块，专门处理路径问题的
const ESLintPlugin = require('eslint-webpack-plugin') //引入eslint插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 入口
    entry: "./src/main.js", //相对路径
    // 输出
    output: {
        // 文件的输出路径
        // 开发环境没有输出，可以是undefined
        path: undefined,
        // 入口文件打包输出文件名
        filename: "static/js/main.js"
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/, //只检测.css 文件
                use: [
                    // 执行顺序，先从左到右，再从下到上
                    "style-loader", //将js中css通过创建style标签添加到html文件中生效
                    "css-loader" //将css资源编译成commonjs的模块到js中
                ],
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader', // 将 JS 字符串生成为 style 节点
                    'css-loader',  // 将 CSS 转化成 CommonJS 模块
                    'sass-loader', // 将 Sass 编译成 CSS
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader', // 将 JS 字符串生成为 style 节点
                    'css-loader',  // 将 CSS 转化成 CommonJS 模块
                    "stylus-loader",// 将 Stylus 文件编译为 CSS
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",//会转换成 base64 格式
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图片转base64
                        // 优点：减少请求次数  缺点，体积会增大
                        maxSize: 4 * 1024,//4kb
                    },
                },
                generator: {
                    filename: "static/images/[hash:10][ext][query]",
                    // hash: 10 代表hash值只取十位 ext 是文件扩展名 query是携带的其他参数
                }
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                type: "asset/resource", //只会对文件原格式进行输出
                generator: {
                    filename: "static/media/[hash:10][ext][query]",
                    // hash: 10 代表hash值只取十位 ext 是文件扩展名 query是携带的其他参数
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //排除node_modules中的js文件不处理
                loader: 'babel-loader',
                // options: { //可以在外面配置babel.config.js
                //     presets: ['@babel/preset-env']
                // }
            },
        ],
    },
    // 插件
    plugins: [
        //plugins的配置
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src"), // 检测哪些文件
        }),
        new HtmlWebpackPlugin({
            //模板： 以 public/index.html 文件为模板创建新的html文件
            // 新的html文件特点： 1、结构和原来一致。2、自动引入打包输出资源
            template: path.resolve(__dirname, '../public/index.html')
        }),
    ],
    devServer: {
        host: 'localhost', //启动服务器域名
        port: '3000', //启动服务器端口号
        open: true //是否自动打开浏览器
    },
    // 模式
    mode: "development",
    devtool: 'cheap-module-source-map',
}