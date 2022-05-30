const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 入口
    entry: './src/index.js',
    // 输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/bundle.js',
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            {
                test: /\.ts$/, //规则生效的文件
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
    ],
    // 模式
    mode: 'development',
    //开发服务器： 不会输出资源（不会在dish生成文件），是在内存中编译打包的
    devServer: {
        host: 'localhost', //启动服务器域名
        port: '3000', //启动服务器端口号
        open: true //是否自动打开浏览器
    },
}