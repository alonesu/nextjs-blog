  // 定义食物类
export default class Food {
    element: HTMLElement;
    food: object;
    constructor(food:HTMLElement) {
      this.element = food;
    }

    get X() {
      return this.element.offsetLeft;
    }
    get Y() {
      return this.element.offsetTop;
    }

    change() {
      // 生成一个随机位置
      // 最小是0，最大是290
      // 蛇移动一次就是10，食物坐标是整10
      const left = Math.round(Math.random() * 29) * 10;
      const top = Math.round(Math.random() * 29) * 10;
      this.element.style.left = left + 'px';
      this.element.style.top = top + 'px';
    }
  }
