## Typescript

ts编译器是基于Node.js写的  tsc  xxx.ts  默认编译成ES3

###### 无法重新声明块范围变量“a”   没有模块化概念，全局作用域方法1：关闭js代码。 方法二，底部添加 export（）

声明变量可以指定类型 

```tsx
let a  : number 
```

给函数添加**参数**和**返回值**类型声明 

```tsx
function sum( a:number , b:number )  : number{}
```

如果变量的**声明和赋值**是同时进行的，TS可以自动对变量进行类型检测 

```tsx
let a = true
```

可以直接使用**字面量**进行类型声明

```tsx
let a : 10 //声明之后不能再修改
```

可以使用**竖线**来连接多个类型（联合类型）

```tsx
let b: "male" | "female" 

let c: boolean | string
```

使用 & 来连接类型 

```tsx
let a: {name:string} & {age:number} //两个对象都要满足
```

**any** 任意类型，相当于对该变量**关闭了TS的类型检测**

```tsx
let d : any //(显式的any) 

let d //（隐式的any) 只声明不赋值，会自动判定为any
```

（**可以把any类型的变量赋值给其他任何有类型声明的变量 ** a = d 报错）

**类型断言**    告诉解析器变量的实际类型

```tsx
a = d as  string

a = <string> d
```

```tsx
let d : unknown  // 效果与any一样  是类型安全的any
```

**不可以把unknown类型的赋值给其他类型的变量**

**void** 设置返回值类型  给没有返回值的函数作为没有返回值类型声明

```tsx
function fn(num): void{}
```

**never **表示永远不会返回结果   有一种函数用来报错，不会产生返回值，可以设置never

```tsx
function fn(num): never{}
```

**object** 表示一个js对象 

```tsx
let a : object //意义不大
let b : {name:string,age:number,garde?:string} //可以指定属性 b是一个对象且带有name的属性和 age的数字类型，必须属性必须一模一样.如果在属性后面加 ? 就表示是可选的
let c : {name:string , [propName:string]:any} //表示至少要有name 其他的随意

let d : (a:number,b:number)=>number //函数类型的声明，并且定义了函数的结构
let d : (a:number,b?:number)=>number //函数类型的声明，并且定义了函数的结构
```

**array** 数组

```tsx
let a: string[] //表示字符串数组
let b: Array<number>
```

**tuple** 元组， 固定长度的数组  

```tsx
let h: [string,string] // 定义的就是两个string类型的长度的数组
```

**enum** 枚举 把所有可能的情况列出来

```tsx
enum Gender {
    Male,
    Female 
}  //定义枚举的类 用来显示 所有可能的情况 会自动转换为 0 或 1 ...
let i: {name:string,gender:Gender} //定义为枚举类 只能赋值枚举类中的值
i = {
    name: '哓筱',
    gender: Gender.Male
}
```

类型别名

```tsx
type myType = string  // 创建了类型别名
type oneSix = 1 | 2 | 3 | 4 | 5 | 6  // 创建了类型别名
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





