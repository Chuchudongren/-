### Model

服务器代码的层次结构：`Controller`、`Service`、`Data Access`

`Controller`层负责与用户直接打交道，渲染页面、提供接口等，侧重于展示型逻辑

`Service`层负责处理业务逻辑，供`Controller`层调用

`Data Access`层负责与数据源对接，进行纯粹的数据读写，供`Service`层调用

前端代码层次：`Page`、`Model`、`Service `

`Page`负责与用户直接打交道，渲染页面，接收用户的操作输入，侧重于展示型交互性逻辑

`Model`负责处理业务逻辑，为`Page`做数据、状态的读写、交换、暂存等

`Service`负责与HTTP接口对接，进行纯粹的数据读写

### DVA

dva是基于redux、redux-saga和react-router的轻量级前端框架

#### 引入dva框架

`umi`对`dva`进行了整合

在`config.js`文件中进行配置

```js
export default {
    plugins:[
        ['umi-plugin-react',{
            dva:true//开启dva功能
        }]
    ]
}
```



### Ant Design Pro

初始化脚手架

```
# 使用 npm
npx create-umi myapp
# 使用 yarn
yarn create umi myapp
```

