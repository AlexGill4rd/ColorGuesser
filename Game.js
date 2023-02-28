class Game {
  static spel;
  static leaderboard;

  constructor() {
    this.#init();
  }

  #init() {
    this.startGame();
    this.loadLeaderboard();
  }
  startGame() {
    Game.spel = new Spel();
    Game.spel.start();
  }
  loadLeaderboard() {
    Game.leaderboard = new Leaderboard();
    Game.leaderboard.show();

    setInterval(function () {
      Game.leaderboard.update();
    }, 1000);
  }
}
