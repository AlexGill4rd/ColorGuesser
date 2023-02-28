class Leaderboard {
  #leaderboard = document.createElement("div");

  constructor() {
    this.#init();
  }
  async #init() {
    if (!this.#leaderboard.classList.contains("leaderboard"))
      this.#leaderboard.classList.add("leaderboard");

    const response = await fetch("https://colourfinder.onrender.com/");
    const players = await response.json();

    for (let player of players) {
      this.#leaderboard.appendChild(this.#getPlayerElement(player));
    }

    document.body.appendChild(this.#leaderboard);
  }
  #getPlayerElement(player) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("leaderboard-player");

    const playerName = document.createElement("h2");
    playerName.classList.add("leaderboard-player-name");
    playerName.innerHTML = player.user;
    playerName.id = player.user;

    const playerScore = document.createElement("p");
    playerScore.classList.add("leaderboard-player-score");
    playerScore.innerHTML = player.highscore;
    playerScore.id = player.user + "-score";

    this.#playerDiv.appendChild(playerName);
    this.#playerDiv.appendChild(playerScore);

    return playerDiv;
  }
  async update() {
    const response = await fetch("https://colourfinder.onrender.com/");
    const players = await response.json();

    for (let player of players) {
      const score = document.getElementById(player.user + "-score");
      if (score === undefined)
        this.#leaderboard.appendChild(this.#getPlayerElement(player));
      else score.innerHTML = player.score;
    }
  }
  show() {
    this.#leaderboard.style.display = "block";
  }
  hide() {
    this.#leaderboard.style.display = "none";
  }
}
