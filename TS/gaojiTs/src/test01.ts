//使用 class 定义类
enum Gender {
    Male,
    Female
}
class Person{
    // 实例属性  需要通过实例才能访问
    name: string = "xiaoxiao"
    readonly age: number = 18 //readonly 表示只读的属性  不可更改
    gender: number = Gender.Female
    // 在属性前使用static关键字可以定义类属性（静态属性） 使用类就能访问
    static avg : string = "美貌"
    xin:string
    // 构造函数
    constructor(xin:string,age:number){
        this.xin = xin
        this.age = age
    }
    // 方法
    eat(){
        console.log('吃东西啦！');
        return "吃过啦！"
    }
    static xizao(){
        console.log('洗澡啦！');
        return "洗过澡啦！"
    }
}
const gx = new Person('晴',12)
const xinx = new Person('阴',18)
const xingx = new Person('云',22)
console.log(gx.xin);
console.log(xinx.xin);
console.log(xingx.xin);
