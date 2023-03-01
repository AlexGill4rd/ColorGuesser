class Spelbord {
  #bord = document.createElement("div");
  #difficultyFactor = 50;
  #round = 0;
  flikkingID;
  #changedColor = false;

  constructor(spel, leaderboard, width, height) {
    this.spel = spel;
    this.leaderboard = leaderboard;
    this.width = width;
    this.height = height;
  }
  get round() {
    return this.#round;
  }
  draw() {
    this.#bord.classList.add("spelbord");

    const clock = document.createElement("div");
    clock.classList.add("clock");
    this.startClock(clock);
    this.#bord.appendChild(clock);

    const blocks = document.createElement("div");
    blocks.classList.add("spelbord-blocks");

    const header = document.createElement("div");
    header.classList.add("header");

    const score = document.createElement("h2");
    score.classList.add("score");
    score.innerHTML = `Score: ${this.#round}`;

    header.appendChild(score);

    const tip = document.createElement("button");
    tip.classList.add("tip-button");
    tip.innerHTML = `Verander Kleur`;
    tip.addEventListener("click", () => {
      if (!this.#changedColor) {
        this.#changedColor = true;
        this.#nextRound();
      }
    });

    header.appendChild(tip);
    this.#bord.appendChild(header);

    const blockAmount = this.width * this.height;
    let incorrectBlock = Math.floor(Math.random() * blockAmount);

    let randomR = Math.floor(Math.random() * 255);
    let randomG = Math.floor(Math.random() * 255);
    let randomB = Math.floor(Math.random() * 255);

    if (this.#difficultyFactor <= 0) this.#difficultyFactor = 1;

    for (let i = 0; i < blockAmount; i++) {
      const block = document.createElement("div");
      block.classList.add("spelbord-block");
      block.id = i;

      let size = 400.0 / this.width - 4;

      block.style.width = `${size}px`;
      block.style.height = `${size}px`;

      if (i === incorrectBlock)
        block.style.backgroundColor = `rgb(${
          randomR + this.#difficultyFactor
        },${randomG + this.#difficultyFactor},${
          randomB + this.#difficultyFactor
        })`;
      else
        block.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;

      block.addEventListener("click", () =>
        this.#onBlockClick(incorrectBlock === i, incorrectBlock)
      );

      blocks.appendChild(block);
    }
    this.#bord.appendChild(blocks);

    document.body.appendChild(this.#bord);
  }
  #nextRound() {
    document.querySelector(".spelbord").innerHTML = "";
    this.draw();
  }

  remove() {
    this.#bord.remove();
    clearInterval(this.flikkingID);
    this.spel.start();
  }
  #onBlockClick(incorrect, correctIndex) {
    if (!incorrect) {
      if (parseInt(this.#round) > Leaderboard.highscore) {
        Leaderboard.endTime = new Date();
        this.stopClock();

        this.#updateHighscore(Leaderboard.username);
      }
      this.spel.stop(this);

      let correctElement = document.getElementById(correctIndex);
      const previousColor = correctElement.style.backgroundColor;
      let counter = 0;
      this.flikkingID = setInterval(function () {
        correctElement = document.getElementById(correctIndex);
        if (counter >= 10) {
          correctElement.style.backgroundColor = previousColor;
          clearInterval(this.flikkingID);
          return;
        }
        let backgroundColor = correctElement.style.backgroundColor;
        if (backgroundColor === previousColor) {
          correctElement.style.backgroundColor = "red";
        } else {
          correctElement.style.backgroundColor = previousColor;
        }
        counter++;
      }, 200);
    } else {
      this.#round++;

      if (this.#round % 2 === 0) {
        this.width++;
        this.height++;
      }

      this.#difficultyFactor -= this.#difficultyFactor / 20;
      this.#nextRound();
    }
  }
  #updateHighscore(username) {
    const begin = Leaderboard.startTime;
    const now = Leaderboard.endTime;
    const duration = now.getTime() - begin.getTime();

    Socket.get().emit("highscore:update", {
      username: username,
      score: this.#round,
      duration: duration,
    });
  }
  #clockId;
  startClock(clock) {
    this.#updateClock(clock);
    this.#clockId = setInterval(() => this.#updateClock(clock), 1000);
  }
  #updateClock(clock) {
    const begin = Leaderboard.startTime;
    const now = new Date();
    const durarion = new Date(now.getTime() - begin.getTime());
    durarion.setHours(durarion.getHours() - 1);
    clock.innerHTML = durarion.toLocaleTimeString();
  }
  stopClock() {
    clearInterval(this.#clockId);
  }
}
