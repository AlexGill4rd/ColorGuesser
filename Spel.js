class Spel {
  #spelbord;

  constructor(game) {
    this.game = game;
  }
  start() {
    Leaderboard.startTime = new Date();
    this.#spelbord = new Spelbord(this, this.game, 5, 5);
    this.#spelbord.draw();
  }
  stop(spelBord) {
    let endscreen = new EndScreen(spelBord);
    endscreen.show();
  }
}
