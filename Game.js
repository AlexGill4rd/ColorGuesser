class Game {
  constructor() {
    this.spel = new Spel(this);
    this.leaderboard = new Leaderboard(this);
  }
  load() {
    this.spel.start();
    this.leaderboard.show();
  }
}
