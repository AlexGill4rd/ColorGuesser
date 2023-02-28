class Leaderboard {
  #leaderboard = document.createElement("div");

  constructor() {
    this.#init();
  }
  async #init() {
    if (!this.#leaderboard.classList.contains("leaderboard"))
      this.#leaderboard.classList.add("leaderboard");
    this.#leaderboard.appendChild(this.#getLoginForm());

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

    playerDiv.appendChild(playerName);
    playerDiv.appendChild(playerScore);

    return playerDiv;
  }
  #getLoginForm() {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("leaderboard-login");

    const playerInput = document.createElement("input");
    playerInput.placeholder = "Jouw naam...";
    playerInput.id = "playername";

    playerDiv.appendChild(playerInput);
    return playerDiv;
  }
  async update() {
    const response = await fetch("https://colourfinder.onrender.com/");
    const players = await response.json();

    for (let player of players) {
      const score = document.getElementById(player.user + "-score");
      if (score === null)
        this.#leaderboard.appendChild(this.#getPlayerElement(player));
      else score.innerHTML = player.highscore;
    }
  }
  show() {
    this.#leaderboard.style.display = "block";
  }
  hide() {
    this.#leaderboard.style.display = "none";
  }
}
