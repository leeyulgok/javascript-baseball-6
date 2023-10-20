import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    let gameOver = true;

    console.log("숫자 야구 게임을 시작합니다.");
    while (gameOver) {
      const COM_NUMBER = this.createNumber();
      while (true) {
        let userNumber = await this.userNumber();
        let { strikes, balls } = this.checkNumber(COM_NUMBER, userNumber);

        if (strikes === 3) {
          console.log("3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료");
          let answer = await this.restart();
          if (answer === "1") {
            break;
          } else {
            gameOver = false;
            break;
          }
        } else if (strikes === 0 && balls === 0) {
          console.log("낫싱");
        } else if (strikes === 0 && balls > 0) {
          console.log(`${balls}볼`);
        } else if (strikes > 0 && balls === 0) {
          console.log(`${strikes}스트라이크`);
        } else {
          console.log(`${balls}볼 ${strikes}스트라이크`);
        }
      }
    }
  }

  createNumber() {
    const COMPUTER = [];
    while (COMPUTER.length < 3) {
      const NUMBER = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!COMPUTER.includes(NUMBER)) {
        COMPUTER.push(NUMBER);
      }
    }
    return COMPUTER.join("");
  }

  async userNumber() {
    try {
      const USERINPUT = await MissionUtils.Console.readLineAsync("숫자를 입력해주세요 : ");
      if (isNaN(Number(USERINPUT))) {
        throw new Error("입력값이 숫자가 아닙니다. 애플리케이션을 종료합니다.");
      }

      return USERINPUT;
    } catch (error) {
      console.log(error);
    }
  }

  checkNumber(com, user) {
    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < 3; i++) {
      if (com[i] === user[i]) {
        strikes++;
      } else if (com.includes(user[i])) {
        balls++;
      }
    }

    return { strikes, balls };
  }

  async restart() {
    try {
      const USERINPUT = await MissionUtils.Console.readLineAsync(
        "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n"
      );
      return USERINPUT;
    } catch (error) {
      console.error("숫자만 입력해주세요 : ", error);
    }
  }
}

const app = new App();
app.play();

export default App;
