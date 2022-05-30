## Typescript

ts 编译器是基于 Node.js 写的 tsc xxx.ts 默认编译成 ES3

无法重新声明块范围变量“a” 没有模块化概念，全局作用域方法 1：关闭 js 代码。 方法二，底部添加 export（）

#### 声明变量可以指定类型

```tsx
let a: number
```

#### 给函数添加**参数**和**返回值**类型声明

```tsx
function sum (a: number, b: number): number {}
```

#### 如果变量的**声明和赋值**是同时进行的，TS 可以自动对变量进行类型检测

```tsx
let a = true
```

#### 可以直接使用**字面量**进行类型声明

```tsx
let a: 10 //声明之后不能再修改
```

#### 可以使用**竖线**来连接多个类型（联合类型）

```tsx
let b: 'male' | 'female'

let c: boolean | string
```

#### 使用 & 来连接类型

```tsx
let a: { name: string } & { age: number } //两个对象都要满足
```

#### **any** 任意类型，相当于对该变量**关闭了 TS 的类型检测**

```tsx
let d: any //(显式的any)

let d //（隐式的any) 只声明不赋值，会自动判定为any
```

（**可以把 any 类型的变量赋值给其他任何有类型声明的变量 ** a = d 报错）

#### **类型断言** 告诉解析器变量的实际类型

```tsx
a = d as string

a = <string>d
```

```tsx
let d: unknown // 效果与any一样  是类型安全的any
```

**不可以把 unknown 类型的赋值给其他类型的变量**

#### **void**

设置返回值类型 给没有返回值的函数作为没有返回值类型声明

```tsx
function fn (num): void {}
```

#### **never **

表示永远不会返回结果 有一种函数用来报错，不会产生返回值，可以设置 never

```tsx
function fn (num): never {}
```

#### **object** 表示一个 js 对象

```tsx
let a: object //意义不大
let b: { name: string; age: number; garde?: string } //可以指定属性 b是一个对象且带有name的属性和 age的数字类型，必须属性必须一模一样.如果在属性后面加 ? 就表示是可选的
let c: { name: string; [propName: string]: any } //表示至少要有name 其他的随意

let d: (a: number, b: number) => number //函数类型的声明，并且定义了函数的结构
let d: (a: number, b?: number) => number //函数类型的声明，并且定义了函数的结构
```

#### **array** 数组

```tsx
let a: string[] //表示字符串数组
let b: Array<number>
```

#### **tuple** 元组， 固定长度的数组

```tsx
let h: [string, string] // 定义的就是两个string类型的长度的数组
```

#### **enum** 枚举 把所有可能的情况列出来

```tsx
enum Gender {
  Male,
  Female
} //定义枚举的类 用来显示 所有可能的情况 会自动转换为 0 或 1 ...
let i: { name: string; gender: Gender } //定义为枚举类 只能赋值枚举类中的值
i = {
  name: '哓筱',
  gender: Gender.Male
}
```

#### 类型别名

```tsx
type myType = string // 创建了类型别名
type oneSix = 1 | 2 | 3 | 4 | 5 | 6 // 创建了类型别名
let k: oneSix
let j: oneSix
```

|  类型   |
| :-----: |
| string  |
| number  |
| boolean |
| 字面量  |
|   any   |
| unknown |
|  void   |
|  never  |
| object  |
|  array  |
|  tuple  |
|  enum   |

#### 编译选项 Ts 的配置

-w 会自动监视这个 ts

```powershell
tsc xxx.ts -w
```

监视所有的 ts 文件

添加 tsconfig.json 文件

```json
{
  /* 
    tsconfig.json 是 ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
    include  用来指令那些ts文件需要被编译 
        **代表任意目录  *代表任意文件
    exclude  表示不包含的ts文件
    extends  定义被继承的配置文件
    files 指定被编译文件的列表，只要需要编译的文件少时才会用到

    compilerOptions 编译器的选项 
        项目选项：  target 指定编译的ES版本
                    lib
                    module

*/

  "include": ["./src/**/*"],
  "exclude": [""],
  //  编译器的选项
  "compilerOptions": {
    // 编译的ES的版本
    // "ES3", "ES5", "ES6", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ES2021", "ES2022", "ESNext"
    "target": "ES6",
    // 模块化的规范   推荐ES2015  === ES6
    // 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext'。
    "module": "none",
    // 表示项目中要使用的库
    // "lib": ["DOM"],
    // outDir 用来指定编译后文件的目录
    "outDir": "./dist",
    // outFile 所有全局作用域内的代码合并为 一 个文件
    /* 
        如果被指定，所有 全局 （非模块） 文件将被合并到指定的单个输出文件中。
        如果 module 为 system 或 amd，所有模块文件也将在所有全局内容之后被合并到这个文件中。
        注：除非 module 是 none ,system 或 amd， 否则不能使用 outFile。
        这个选项 不能 用来打包 CommonJS 或 ES6 模块。
    */
    // "outFile": "./app/index.js",
    // allowJs  是否编译目录中的js文件 默认是false
    "allowJs": true,
    // checkJS  是否检查js代码是否符合语法规范，默认是false
    "checkJs": true,
    // removeComments 是否 移除注释 默认是false
    "removeComments": false,
    // noEmit 不生成编译后的文件
    "noEmit": false,
    // noEmitOnError 当有错误时  不生成编译后的文件
    "noEmitOnError": false,
    // strict 严格模式的总开关 一般 true
    "strict": false,
    // alwaysStrict 设置编译后的文件是否开启严格模式
    // 代码里导入 模块代码  会自动进入严格模式，不会在头部 生成 "use strict"
    "alwaysStrict": false,
    //  noImplicitAny 是否 设置 不允许隐式的any类型
    "noImplicitAny": false,
    // noImplicitThis 是否 设置 不允许不明确类型的this
    "noImplicitThis": false,
    // strictNullChecks 严格检查空值 检测可能存在空值的变量
    "strictNullChecks": false
  }
}
```

输入

```tsx
tsc //一键解析所有ts文件
tsc - w //一键监视所有ts文件
```

### 使用 webpack 打包 ts 代码

**安装**依赖

```powershell
tyarn add -D webpack webpack-cli typescript ts-loader
```

配置`webpakc.config.js`

```js
const path = require('path')

module.exports = {
  // 入口
  entry: './src/index.js',
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.ts$/, //规则生效的文件
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  // 插件
  plugins: [],
  // 模式
  mode: 'development'
}
```

配置`tsconfig.json`

```json
{
  "include": ["./src/**/*"],
  "exclude": [""],
  "compilerOptions": {
    "module": "ES2015",
    "target": "ES2015",
    "strict": true
  }
}
```

运行 `npx webpack` 或者在 `package.json`中添加指令运行

### 面向对象 oop 思想

**一切都是对象**

#### 类

```ts
class 类名 {
  属性名：类型；
  constructor(参数:类型){
    this.属性名 = 参数
  }
}
```

#### 面向对象的特点

**封装**
属性：
**只读属性** readonly
**修饰符**
public（默认值），可以在类、子类和对象中修改
protected ，可以在类，子类中进行修改
private ，可以在类中修改 通过`getter`,`setter`方法来修改获取属性
static ，静态属性，类属性，使用静态属性无需创建实例，通过类可直接使用

#### 继承

`extends`
通过继承可以在不修改类的情况下完成对类的扩展或重写
在子类中可以使用`super`来完成对父类的引用
**抽象类** abstract class
抽象类是专门用来呗其他类所继承的类，它只能被其他类所继承不能用来创建实例
使用 abstract 开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现

```ts
abstract class Animal {
  abstract run (): void
  bark () {
    console.log('动物在叫~')
  }
}

class Dog extends Animals {
  run () {
    console.log('狗在跑~')
  }
}
```

#### 接口 interface

接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。
可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。
**关键字** `implements`

```ts
interface Person {
  name: string
  sayHello(): void
}

class Student implements Person {
  constructor (public name: string) {}

  sayHello () {
    console.log('大家好，我是' + this.name)
  }
}
```

#### 泛型

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

```ts
function test<T, K> (a: T, b: K): K {
  return b
}

test<number, string>(10, 'hello')
```

类使用泛型

```ts
class MyClass<T> {
  prop: T

  constructor (prop: T) {
    this.prop = prop
  }
}
```

除此之外，也可以对泛型的范围进行约束

```ts
interface MyInter {
  length: number
}

function test<T extends MyInter> (arg: T): number {
  return arg.length
}
```

使用 T extends MyInter 表示泛型 T 必须是 MyInter 的子类，不一定非要使用接口类和抽象类同样适用。
