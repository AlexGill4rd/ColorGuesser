class Leaderboard {
  #leaderboard = document.createElement("div");

  constructor() {
    this.#init();
  }
  async #init() {
    this.#leaderboard.classList.add("leaderboard");

    const response = await fetch("https://colourfinder.onrender.com/");
    const players = await response.json();

    for (let player of players) {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("leaderboard-player");

      const playerName = document.createElement("h2");
      playerName.classList.add("leaderboard-player-name");
      playerName.innerHTML = player.user;
      const playerScore = document.createElement("p");
      playerScore.classList.add("leaderboard-player-score");
      playerScore.innerHTML = player.highscore;

      playerDiv.appendChild(playerName);
      playerDiv.appendChild(playerScore);

      this.#leaderboard.appendChild(playerDiv);
    }

    document.body.appendChild(this.#leaderboard);
  }
  show() {
    this.#leaderboard.style.display = "block";
  }
  hide() {
    this.#leaderboard.style.display = "none";
  }
}
