class Spel {
  #spelbord;
  start() {
    this.#spelbord = new Spelbord(this, 5, 5);
    this.#spelbord.draw();
  }
  stop(spelBord) {
    let endscreen = new EndScreen(spelBord);
    endscreen.show();
  }
  restart() {}
  toonSamenvatting() {}
}
