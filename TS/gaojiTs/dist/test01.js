"use strict";
//使用 class 定义类
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
class Person {
    // 构造函数
    constructor(xin, age) {
        // 实例属性  需要通过实例才能访问
        this.name = "xiaoxiao";
        this.age = 18; //readonly 表示只读的属性  不可更改
        this.gender = Gender.Female;
        this.xin = xin;
        this.age = age;
    }
    // 方法
    eat() {
        console.log('吃东西啦！');
        return "吃过啦！";
    }
    static xizao() {
        console.log('洗澡啦！');
        return "洗过澡啦！";
    }
}
// 在属性前使用static关键字可以定义类属性（静态属性） 使用类就能访问
Person.avg = "美貌";
const gx = new Person('晴', 12);
const xinx = new Person('阴', 18);
const xingx = new Person('云', 22);
console.log(gx.xin);
console.log(xinx.xin);
console.log(xingx.xin);
