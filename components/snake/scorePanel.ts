  // 定义记分牌的类
export default class ScorePanel {
    // 记录分数和等级
    score = 0;
    level = 1;
    // 初始化分数和等级所在的元素
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    maxLevel: number; // 设置最高等级
    upScore: number; // 设置满多少分升级


    constructor(score: HTMLElement, level: HTMLElement, maxLevel: number = 10, upScore: number = 20) {
      this.scoreEle = score;
      this.levelEle = level;
      this.maxLevel = maxLevel;
      this.upScore = upScore;
    }

    addScore() {
      // 分数增加
      this.scoreEle.innerHTML = ++this.score + '';
      // 判断分数满多少升级
      if (this.score % this.upScore === 0) {
        this.levelUp();
      }
    }
    // 提升等级的方法
    levelUp() {
      if (this.level < this.maxLevel) {
        this.levelEle.innerHTML = ++this.level + '';
      }
    }
  }