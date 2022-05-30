const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    // 入口
    entry: './src/index.ts',
    // 输出
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/bundle.js',
        // 环境
        environment: {
            // 禁止使用箭头函数
            arrowFunction: false,
            // 禁止使用const
            const: false,
        }
    },
    // 加载器
    module: {
        rules: [
            {
                test: /\.ts$/, //规则生效的文件
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方式 "usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env", // 能解决大多数样式兼容性问题
                                ],
                            },
                        },
                    },
                    'less-loader'
                ]
            },
        ]
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    },
    // 模式
    mode: 'production',
    // //开发服务器： 不会输出资源（不会在dish生成文件），是在内存中编译打包的
    // devServer: {
    //     host: 'localhost', //启动服务器域名
    //     port: '3000', //启动服务器端口号
    //     open: true //是否自动打开浏览器
    // },
}