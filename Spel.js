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
    console.log(user, score);
    const response = await fetch(
      "http://https://colourfinder.onrender.com/highscore",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
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
