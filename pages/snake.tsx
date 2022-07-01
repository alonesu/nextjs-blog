// 引入样式文件
import { useEffect, useRef, useState } from 'react';

// 引入食物类
// import Food from '../components/snake/food';
// 引入记分牌类
// import ScorePanel from '../components/snake/scorePanel';
// 引入蛇类
// import CSnake from '../components/snake/snake';
// 引入控制器
import GameControl from '../components/snake/gameControl';

import styles from './snake.module.scss';
import Link from 'next/link';


export default function Snake() {
  const food = useRef<any>(null);
  const score = useRef<any>(null);
  const level = useRef<any>(null);
  const snake = useRef<any>(null);
  const snakeHead = useRef<any>(null);

  // const [snakes, setSnakes] = useState(null);
  // const [scorePanel, setScorePanel] = useState(null);


  useEffect(() => {

    // 测试用例
    // setSnakes(new CSnake(snake.current,snakeHead.current,))
    // console.log(snakeHead.current.offsetLeft);

    // 初始化游戏
    // 传参 蛇容器 蛇头 食物 计分板 等级板 最高等级 满多少分升一级
    new GameControl(snake.current, snakeHead.current, food.current, score.current, level.current, 10, 10).init();

    // 测试用例
    // const food1 = new Food(food.current)
    // food1.change()
    // setScorePanel(new ScorePanel(score.current, level.current,20,10))
    // console.log(scorePanel);
  }, [])

  function restart() {
    window.location.reload();
  }



  return (
    <>
      {/* 游戏容器 */}
      <div id={styles.main} className="main">
        <div className={styles.stage}>
          <div className={styles.snake} ref={snake}>
            <div ref={snakeHead}></div>
          </div>
          <div className={styles.food} id='food' ref={food}></div>
        </div>
        {/* 设置游戏记分牌 */}
        <div className={styles['score-panel']}>
          <div>
            SCORE:<span className={styles['score']} ref={score}>0</span>
          </div>
          <div>
            level:<span className={styles['level']} ref={level}>1</span>
          </div>
        </div>
        <button onClick={() => restart()}>重新开始</button>
      </div>
      <Link href="/">
        <div style={{ margin: '10px auto', width: '200px', cursor: 'pointer' }}><a>Back to home</a></div>
      </Link>
    </>
  )
}