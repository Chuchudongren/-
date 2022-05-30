import Snake from './snake'
import Food from './food'
import ScorePanel from './scorepanel'
// 游戏的控制器
class GameControl{
    // 定义三个属性
    // 蛇
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;

    // 创建一个属性 存储蛇的移动方向
    direction:string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive = true;
    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }
    // 游戏的初始化方法
    init(){
        console.log('初始化');
        
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        // 调用run方法
        this.run();
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent){
        if(event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Up' || event.key === 'Down' || event.key === 'Left' || event.key === 'Right'){
            this.direction = event.key;
        } 
    }
    // 创建一个控制蛇移动的方法
    run(){
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 根据按键的方向来修改坐标
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                Y -= 10
                break;
            case "ArrowDown":
            case "Down":
                Y += 10
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10
                break;
            case "ArrowRight":
            case "Right":
                X += 10
                break;
        }
        // 检查蛇是否吃到了食物
        this.checkEat(X, Y);
        // 设置蛇的坐标
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error) {
            alert(error instanceof Error && error.message);
            this.isLive = false
        }
        // 开启定时调用
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);
    }
    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){
            // 食物的位置要进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }
}
export default GameControl