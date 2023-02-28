class Spel {
  #spelbord;
  start() {
    this.#spelbord = new Spelbord(this, 5, 5);
    this.#spelbord.draw();
  }
  stop(spelBord) {
    let endscreen = new EndScreen(spelBord);
    endscreen.show();

    this.#updateHighscore("alex", spelBord.round);
  }
  async #updateHighscore(user, score) {
    const response = await fetch(
      "https://colourfinder.onrender.com/highscore",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ user: user, score: score }),
      }
    );
  }
  restart() {}
  toonSamenvatting() {}
}
