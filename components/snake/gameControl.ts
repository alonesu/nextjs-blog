import Snake from "./snake";
import Food from "./food";
import ScorePanel from './scorePanel';

// 游戏控制器
export default class GameControl {
  // 定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: number; // 键盘按下时的keyCode
  isLive = true; // 判断蛇是否撞死

  constructor(snake,snakeHead,food,score,level,maxLevel, upScore) {
    this.snake = new Snake(snake,snakeHead);
    this.food = new Food(food);
    this.scorePanel = new ScorePanel(score,level,maxLevel,upScore);
  }

  // 游戏初始化，调用后游戏开始
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    // 初始化调移动方法
    this.run();
  }

  // 定义监听键盘事件函数
  keydownHandler(event) {
    // console.log(event.keyCode);
    // 需要检查event。key的值是否合法（用户是否按了方向键）
    this.direction = event.keyCode
  }

  // 创建一个控制蛇移动的方法
  run() {
    /**
     * 根据方向（this.direction)来是蛇的位置改变
     * 37 左
     * 38 上
     * 39 右
     * 40 下
     */
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据方向修改x，y的值
    switch (this.direction) {
      case 37:
        X-=10;
        break;
      case 38:
        Y-=10;
        break;
      case 39:
        X+=10;
        break;
      case 40:
        Y+=10;
        break;
      default:
        break;
    }

    // 判断是否吃到食物
    this.checkEat(X, Y)

    // 判断是否撞墙或撞到自身，若是则游戏结束
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      alert(error)
      this.isLive = false;
    }
    // 蛇移动的速度
    this.isLive && setTimeout(() => {
      this.run(); // 开始移动
    }, 200 - (this.scorePanel.level - 1) * 30);
  }

  // 检查吃到食物的方法
  checkEat(x:number, y:number) {
    if(this.food.X === x && this.food.Y === y) {
      // 重置食物位置
      this.food.change();
      // 增加分数
      this.scorePanel.addScore();
      // 增加蛇长度
      this.snake.addBody();
    }
  }
}