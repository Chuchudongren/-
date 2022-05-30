const path = require('path') //node.js的核心模块，专门处理路径问题的
const ESLintPlugin = require('eslint-webpack-plugin') //引入eslint插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

function getStyleLoader(pre) {
    return [
        // 执行顺序，先从左到右，再从下到上
        MiniCssExtractPlugin.loader, //提取css成单独的文件
        'css-loader', //将css资源编译成commonjs的模块到js中
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre,
    ].filter(Boolean)
}

module.exports = {
    // 入口
    entry: "./src/main.js", //相对路径
    // 输出
    output: {
        // 文件的输出路径
        // __dirname  是node.js的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"), //绝对路径
        // 入口文件打包输出文件名
        filename: "static/js/main.js",
        // 清空上次的结果
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/, //只检测.css 文件
                use: getStyleLoader(),
            },
            {
                test: /\.less$/,
                use: getStyleLoader('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader('sass-loader'),
            },
            {
                test: /\.styl$/,
                use: getStyleLoader('stylus-loader'),
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
        new MiniCssExtractPlugin({
            filename: 'static/css/main.css'
        }),
        new CssMinimizerPlugin(),
    ],
    // 模式
    mode: "production",
    devtool: 'source-map',
}