// 定义蛇的类
export default class Snake {
  snake: HTMLElement;
  snakeHead: HTMLElement;
  bodies: HTMLCollection;

  constructor(snake: HTMLElement, snakeHead: HTMLElement) {
    this.snake = snake;
    this.snakeHead = snakeHead;
    this.bodies = this.snake.children;
    // console.log(this.bodies);

  }
  // 获取蛇的x轴坐标
  get X() {
    return this.snakeHead.offsetLeft;
  }
  // 获取蛇头的y轴坐标
  get Y() {
    return this.snakeHead.offsetTop;
  }
  // 设置蛇的x轴坐标
  set X(value: number) {
    // 如果值不变，不做修改
    if (this.X === value) return;
    if (value < 0 || value > 290) throw new Error("GAME OVER!"); // 撞墙
    // 修改X值时是在修改x轴坐标，蛇在向左移动时，不能向右掉头，反之亦然
    if ((this.bodies[1] as HTMLElement) && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.snakeHead.style.left = value + 'px';
    // 检查是否撞到自己
    this.checkHeadBody();
  }
  // 设置蛇的y轴坐标
  set Y(value: number) {
    if (this.Y === value) return;
    if (value < 0 || value > 290) throw new Error("GAME OVER!"); // 撞墙
    // 修改Y值时是在修改y轴坐标，蛇在向上移动时，不能向下掉头，反之亦然
    if ((this.bodies[1] as HTMLElement) && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.snakeHead.style.top = value + 'px';
    // 检查是否撞到自己
    this.checkHeadBody();
  }

  // 增加蛇的长度
  addBody() {
    this.snake.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 蛇的移动
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 蛇是否撞到自己的方法
  checkHeadBody() {
    for (let i = 4; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 撞到自己了，游戏结束
        throw new Error('撞到自己了，游戏结束~')
      }
    }
  }
}