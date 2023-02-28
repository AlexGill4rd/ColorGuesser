class Spelbord {
  #bord = document.createElement("div");
  #difficultyFactor = 50;
  #round = 0;
  flikkingID;

  constructor(spel, width, height) {
    this.spel = spel;
    this.width = width;
    this.height = height;
  }
  get round() {
    return this.#round;
  }
  draw() {
    const blocks = document.createElement("div");
    blocks.classList.add("spelbord-blocks");

    const score = document.createElement("h2");
    score.classList.add("score");
    score.innerHTML = `Score: ${this.#round}`;

    this.#bord.appendChild(score);

    this.#bord.classList.add("spelbord");
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
      this.spel.stop(this);
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
}
