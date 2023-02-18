class EndScreen {
  #screen = document.createElement("div");
  #description = document.createElement("p");
  constructor(spelBord) {
    this.spelBord = spelBord;
    this.#initialise();
  }
  #initialise() {
    this.#screen.classList.add("endscreen");
    const backdrop = document.createElement("div");
    backdrop.classList.add("endscreen-backdrop");
    backdrop.addEventListener("click", () => this.#close());

    const title = document.createElement("h2");
    title.classList.add("endscreen-title");
    title.innerHTML = "Game Ended!";

    this.#description.classList.add("endscreen-description");

    this.#screen.appendChild(backdrop);
    this.#screen.appendChild(title);
  }
  show() {
    this.#description.innerHTML = `Je score was ${this.spelBord.round}`;

    let highscore = localStorage.getItem("highscore");
    let highscoreBeaten = false;

    if (highscore < this.spelBord.round) {
      localStorage.setItem("highscore", this.spelBord.round);
      highscore = this.spelBord.round;
      highscoreBeaten = true;
    }

    const currentHighScore = document.createElement("h4");
    currentHighScore.classList.add("endscreen-highscore");
    currentHighScore.innerHTML = `Jouw highscore: ${highscore}`;

    this.#screen.appendChild(this.#description);
    this.#screen.appendChild(currentHighScore);

    if (highscoreBeaten) {
      const highscoreBeated = document.createElement("h3");
      highscoreBeated.classList.add("endscreen-highscore-message");
      highscoreBeated.innerHTML = "New Highscore!";

      this.#screen.appendChild(highscoreBeated);
    }

    document.body.appendChild(this.#screen);
  }
  #close() {
    this.#screen.remove();
    this.spelBord.remove();
  }
}
